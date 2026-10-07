import { getStudents, addStudent } from "./api.js";
import { getSession } from "./session.js";

if (getSession() !== null) {
  window.location.href = "dashboard.html";
}

const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const studentIdInput = document.getElementById("student-id");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const message = document.getElementById("form-message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

showPassword.addEventListener("change", function () {
  if (showPassword.checked) {
    passwordInput.type = "text";
    confirmInput.type = "text";
  } else {
    passwordInput.type = "password";
    confirmInput.type = "password";
  }
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const studentId = studentIdInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (fullName === "" || email === "" || studentId === "" || password === "" || confirmPassword === "") {
    showMessage("All fields are required", "error");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage("Please enter a valid email", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match", "error");
    return;
  }

  try {
    const students = await getStudents();

    for (const student of students) {
      if (student.email === email) {
        showMessage("This email is already registered", "error");
        return;
      }
      if (student.studentId === studentId) {
        showMessage("This Student ID is already registered", "error");
        return;
      }
    }

    const newStudent = {
      fullName: fullName,
      email: email,
      studentId: studentId,
      password: password
    };

    await addStudent(newStudent);

    showMessage("Account created! Redirecting to login...", "success");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    showMessage("Cannot connect to the server. Is json-server running?", "error");
  }
});
