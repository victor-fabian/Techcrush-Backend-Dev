const profile = {
    name: "Victor Fabian",
    role: "Backend Developer",
    age: 24,
    city: "Lagos"
};
console.log(profile);

//adding props to the object
let phone = {
    brand: "Samsung",
    model: "Galaxy S22",
    price: 350000
};

phone.color = "Black";
console.log(phone);

let student = {
    name: "Victor Fabian",
    regNo: "C8/VICTOR/001",
    course: "JavaScript",
    year: 2024,
    friends : ["David", "Amaka", "Samuel"]
}
console.log(student);
student.gender = "Male";
console.log(student);
student.course = "Node.js";
console.log(student);
delete student.year;
console.log(student);

let employee = {
    name: "Victor Fabian",
    role: "Backend Developer",
    salary: 450000,
    city: "Lagos"
};

let hisName = employee.name;
let hisRole = employee.role;
let hisSalary = employee.salary;
let hisCity = employee.city;

const { name:userName, role:job, salary, city } = employee;

let DNA = {
    gender : "XY",
    complexion : "Dark"
}

let developerProfile = {
    ...DNA,
    name : "Victor Fabian",
    age : 24
}
console.log(developerProfile);

console.log(Object.keys(developerProfile));
console.log(Object.values(developerProfile));
console.log(Object.entries(developerProfile));
