// Classwork: create and display a short student profile.
const studentProfile = {
    name: "Victor Fabian",
    cohort: 8,
    track: "Backend Development",
    isActive: true,
};

function introduceStudent(student) {
    return `${student.name} is studying ${student.track} in Cohort ${student.cohort}.`;
}

console.log(introduceStudent(studentProfile));
