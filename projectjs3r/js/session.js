export function saveSession(student, rememberMe) {
  const session = {
    id: student.id,
    name: student.fullName,
    email: student.email,
    studentId: student.studentId,
    loginTime: new Date().toLocaleString()
  };

  const data = JSON.stringify(session);

  if (rememberMe) {
    localStorage.setItem("session", data);
  } else {
    sessionStorage.setItem("session", data);
  }
}

export function getSession() {
  let data = localStorage.getItem("session");

  if (data === null) {
    data = sessionStorage.getItem("session");
  }

  if (data === null) {
    return null;
  }

  return JSON.parse(data);
}

export function updateSession(name, email) {
  const session = getSession();
  session.name = name;
  session.email = email;

  const data = JSON.stringify(session);

  if (localStorage.getItem("session") !== null) {
    localStorage.setItem("session", data);
  } else {
    sessionStorage.setItem("session", data);
  }
}

export function logout() {
  localStorage.removeItem("session");
  sessionStorage.removeItem("session");
  window.location.href = "index.html";
}

let logoutTimer;

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(logout, 30 * 60 * 1000);
}

export function startAutoLogout() {
  resetLogoutTimer();
  document.addEventListener("click", resetLogoutTimer);
  document.addEventListener("keydown", resetLogoutTimer);
}
