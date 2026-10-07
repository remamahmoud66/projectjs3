import { getStudents, updateStudent, getCourses, getEnrollments } from "./api.js";
import { getSession, updateSession, logout, startAutoLogout } from "./session.js";

const session = getSession();

const navName = document.getElementById("nav-name");
const welcome = document.getElementById("welcome");
const loginTime = document.getElementById("login-time");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileStudentId = document.getElementById("profile-student-id");
const profileForm = document.getElementById("profile-form");
const newNameInput = document.getElementById("new-name");
const newEmailInput = document.getElementById("new-email");
const profileMessage = document.getElementById("profile-message");
const coursesTable = document.getElementById("courses-table");
const coursesMessage = document.getElementById("courses-message");
const logoutBtn = document.getElementById("logout-btn");
const modal = document.getElementById("profile-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");

if (session === null) {
  window.location.href = "index.html";
} else {
  showProfile();
  loadCourses();
  startAutoLogout();
}

function showProfile() {
  const current = getSession();
  navName.textContent = current.name;
  welcome.textContent = "Welcome, " + current.name;
  loginTime.textContent = "Logged in at: " + current.loginTime;
  profileName.textContent = current.name;
  profileEmail.textContent = current.email;
  profileStudentId.textContent = current.studentId;
}

function openModal() {
  const current = getSession();
  newNameInput.value = current.name;
  newEmailInput.value = current.email;
  profileMessage.textContent = "";
  profileMessage.className = "message";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

function showProfileMessage(text, type) {
  profileMessage.textContent = text;
  profileMessage.className = "message " + type;
}

profileForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const newName = newNameInput.value.trim();
  const newEmail = newEmailInput.value.trim().toLowerCase();

  if (newName === "" || newEmail === "") {
    showProfileMessage("Name and email are required", "error");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newEmail)) {
    showProfileMessage("Please enter a valid email", "error");
    return;
  }

  try {
    const students = await getStudents();

    for (const student of students) {
      if (student.email === newEmail && student.id !== session.id) {
        showProfileMessage("This email is used by another student", "error");
        return;
      }
    }

    await updateStudent(session.id, { fullName: newName, email: newEmail });
    updateSession(newName, newEmail);
    showProfile();
    showProfileMessage("Profile updated successfully", "success");
    setTimeout(closeModal, 1000);
  } catch (error) {
    showProfileMessage("Could not update profile. Is json-server running?", "error");
  }
});

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

async function loadCourses() {
  try {
    const courses = await getCourses();
    const enrollments = await getEnrollments();

    coursesTable.innerHTML = "";
    let count = 0;

    for (const enrollment of enrollments) {
      if (enrollment.studentId === session.studentId) {
        let course = null;

        for (const item of courses) {
          if (item.id === enrollment.courseId) {
            course = item;
          }
        }

        if (course !== null) {
          const row = document.createElement("tr");
          row.appendChild(createCell(course.name));
          row.appendChild(createCell(course.teacher));
          row.appendChild(createCell(enrollment.score));
          coursesTable.appendChild(row);
          count++;
        }
      }
    }

    if (count === 0) {
      coursesMessage.textContent = "You are not enrolled in any courses yet.";
      coursesMessage.className = "message";
    }
  } catch (error) {
    coursesMessage.textContent = "Could not load courses. Is json-server running?";
    coursesMessage.className = "message error";
  }
}

logoutBtn.addEventListener("click", logout);
