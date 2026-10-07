const API_URL = "http://localhost:3000";

export async function getStudents() {
  const response = await fetch(API_URL + "/students");
  const students = await response.json();
  return students;
}

export async function addStudent(student) {
  const response = await fetch(API_URL + "/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  const newStudent = await response.json();
  return newStudent;
}

export async function updateStudent(id, changes) {
  const response = await fetch(API_URL + "/students/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes)
  });
  const updatedStudent = await response.json();
  return updatedStudent;
}

export async function getCourses() {
  const response = await fetch(API_URL + "/courses");
  const courses = await response.json();
  return courses;
}

export async function getEnrollments() {
  const response = await fetch(API_URL + "/enrollments");
  const enrollments = await response.json();
  return enrollments;
}
