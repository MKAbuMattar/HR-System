'use strict';

const addEmployeeForm = document.getElementById('addEmployeeForm');
const departmentSelect = document.getElementById('departmentSelect');
const tableBox = document.getElementById('tableBox');
const employeeList = document.getElementById('employeeList');
const total = document.getElementById('total');

let totalOfSalary = 0;

const departmentLsit = ['Call-Center', 'Information-Technology', 'Human-Resources'];

function optDepartment() {
  for (let i = 0; i < departmentLsit.length; i++) {
    let opt = document.createElement('option');
    opt.textContent = departmentLsit[i];
    opt.value = departmentLsit[i];
    departmentSelect.appendChild(opt);
  }
}
optDepartment();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function tableHeaderRender() {
  let trEl = document.createElement('tr');
  employeeList.append(trEl);

  let thEl = document.createElement('th');
  thEl.textContent = 'Name';
  trEl.append(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Email';
  trEl.append(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Department';
  trEl.append(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Salary';
  trEl.append(thEl);
}

function tableCreateRender(name, email, department, salary) {
  let trEl = document.createElement('tr');
  employeeList.append(trEl);

  let tdEl = document.createElement('td');
  tdEl.textContent = name;
  trEl.append(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = email;
  trEl.append(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = department;
  trEl.append(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = salary;
  trEl.append(tdEl);
}

function Employees(employee) {
  this.employee = employee;
}

Employees.prototype.addEmployee = function (name, email, department, salary) {
  this.employee.push({ name, email, department, salary });
};

Employees.prototype.saveToLocalStorage = function () {
  localStorage.setItem('Employees', JSON.stringify(this.employee));
};

let employees = new Employees([]);

function loadLocalStorage() {
  const myLocalStorage = JSON.parse(localStorage.getItem('Employees')) || [];
  employees = new Employees(myLocalStorage);
}
loadLocalStorage();

addEmployeeForm.addEventListener('submit', addNewEmployee);

function addNewEmployee(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let email = event.target.email.value;
  let departmentSelect = event.target.departmentSelect.value;
  let salary = getRandomNumber(100, 500);

  employees.addEmployee(name, email, departmentSelect, salary);
  employees.saveToLocalStorage();

  renderemployeeList();

  addEmployeeForm.reset();
}

function renderemployeeList() {

  employeeList.textContent = '';
  tableBox.classList.add('displayNone');
  if (!employees.employee.length - 1) {
    tableBox.classList.remove('displayNone');
    tableHeaderRender();
    totalOfSalary = 0;
    for (let i = 0; i < employees.employee.length; i++) {
      let name = employees.employee[i].name;
      let email = employees.employee[i].email;
      let department = employees.employee[i].department;
      let salary = employees.employee[i].salary;
      tableCreateRender(name, email, department, salary);
      totalOfSalary += salary;
    }
    total.textContent = `Total = ${totalOfSalary}`;
  }
}

renderemployeeList();

