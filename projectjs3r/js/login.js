import { getStudents } from "./api.js";
import { saveSession, getSession } from "./session.js";

if (getSession() !== null) {
  window.location.href = "dashboard.html";
}

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("show-password");
const rememberMe = document.getElementById("remember-me");
const message = document.getElementById("form-message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

showPassword.addEventListener("change", function () {
  if (showPassword.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (email === "" || password === "") {
    showMessage("Please enter your email and password", "error");
    return;
  }

  try {
    const students = await getStudents();
    let foundStudent = null;

    for (const student of students) {
      if (student.email === email && student.password === password) {
        foundStudent = student;
      }
    }

    if (foundStudent === null) {
      showMessage("Wrong email or password", "error");
      return;
    }

    saveSession(foundStudent, rememberMe.checked);
    window.location.href = "dashboard.html";
  } catch (error) {
    showMessage("Cannot connect to the server. Is json-server running?", "error");
  }
});
