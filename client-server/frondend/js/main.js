const SERVER_URL = 'http://localhost:3000'


async function serverAddSudent(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })

  let data = await response.json()

  return data
}

async function serverFilteredSudents(id) {
  let response = await fetch(SERVER_URL + '/api/students' + id, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })

  let data = await response.json()

  return data
}

async function serverGetSudents() {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })

  let data = await response.json()

  return data
}

async function serverDeleteSudent(id) {
  let response = await fetch(SERVER_URL + '/api/students/' + id, {
    method: "DELETE",
  })

  let data = await response.json()

  return data
}




async function initialize() {
  let serverData = await serverGetSudents()

  if (serverData) {
    listStudents = serverData
  }

  redner(listStudents)
}

initialize()

function formatDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

function $getNewStudentTR(studObj) {
  const $tr = document.createElement("tr")
  const $tdFIO = document.createElement("td")
  const $tdBirthday = document.createElement("td")
  const $tdfaculty = document.createElement("td")
  const $tdStudyStart = document.createElement("td")
  const $tdDelete = document.createElement("td")
  const $btnDelete = document.createElement("button")

  $btnDelete.classList.add("btn", "btn-danger", "w-100")
  $btnDelete.textContent = "Удалить"

  $tdFIO.textContent = `${studObj.lastname} ${studObj.name} ${studObj.surname}`
  $tdBirthday.textContent = formatDate(new Date(studObj.birthday))
  $tdfaculty.textContent = studObj.faculty
  $tdStudyStart.textContent = studObj.studyStart

  $btnDelete.addEventListener("click", async function () {
    await serverDeleteSudent(studObj.id)
    $tr.remove()
  })

  $tdDelete.append($btnDelete)
  $tr.append($tdFIO, $tdBirthday, $tdfaculty, $tdStudyStart, $tdDelete)
  return $tr
}

function redner(arr) {
  let copyArr = [...arr]

  const $studTable = document.getElementById("stud-table")


  $studTable.innerHTML = ''
  for (const studObj of copyArr) {
    const $newTr = $getNewStudentTR(studObj)
    $studTable.append($newTr)
  }
}



document.getElementById("add-form").addEventListener("submit", async function (event) {
  event.preventDefault()

  let newStudentObj = {
    name: document.getElementById("name-inp").value,
    lastname: document.getElementById("lastname-inp").value,
    surname: document.getElementById("surname-inp").value,
    birthday: new Date(document.getElementById("birthday-inp").value),
    faculty: document.getElementById("faculty-inp").value,
    studyStart: document.getElementById("studyStart-inp").value,
  }

  let serverDataObj = await serverAddSudent(newStudentObj)

  serverDataObj.birthday = new Date(serverDataObj.birthday)

  listStudents.push(serverDataObj)

  console.log(listStudents);
  redner(listStudents)
})

function render(arr) {
  const $studTable = document.getElementById("stud-table");
  $studTable.innerHTML = '';  // Clear the table first

  for (const studObj of arr) {
    const $newTr = $getNewStudentTR(studObj);
    $studTable.append($newTr);
  }
}

function renderFilteredStudents() {
  let filteredStudents = listStudents;

  const name = document.getElementById('inp-name0').value.trim();
  const surname = document.getElementById('inp-middle-name').value.trim();
  const lastName = document.getElementById('inp-name1').value.trim();
  const birthday = document.getElementById('inp-date-of-birth').value;
  const faculty = document.getElementById('inp-faculty').value.trim();
  const studyStart = document.getElementById('inp-start-year').value;


  if (name) {
    filteredStudents = filteredStudents.filter(student =>
      student.name.toLowerCase().includes(name)
    );
  }


  if (lastName) {
    filteredStudents = filteredStudents.filter(student =>
      student.lastname.includes(lastName)
    );
  }


  if (surname) {
    filteredStudents = filteredStudents.filter(student =>
      student.surname.includes(surname)
    );
  }


  if (birthday) {
    filteredStudents = filteredStudents.filter(student =>
      formatDate(new Date(student.birthday)) === birthday
    );
  }


  if (faculty) {
    filteredStudents = filteredStudents.filter(student =>
      student.faculty.includes(faculty)
    );
  }


  if (studyStart) {
    filteredStudents = filteredStudents.filter(student =>
      student.studyStart.toString() === studyStart
    );
  }

  render(filteredStudents);
}

document.getElementById('filterform').addEventListener('submit', async function (event) {
  event.preventDefault();
  renderFilteredStudents();
});

