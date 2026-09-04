const { randomUUID } = require('node:crypto');

class StudentStore {
  constructor() {
    this.students = new Map();
  }

  create({ name, registrationNumber, email }) {
    const student = {
      id: randomUUID(),
      name,
      registrationNumber,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const token = randomUUID();

    this.students.set(student.id, { student, token });
    return { student: { ...student }, token };
  }

  findById(id) {
    const record = this.students.get(id);
    return record ? { ...record.student } : null;
  }

  findRecordById(id) {
    return this.students.get(id) || null;
  }

  registrationNumberExists(registrationNumber) {
    return [...this.students.values()].some(
      ({ student }) => student.registrationNumber.toLowerCase() === registrationNumber.toLowerCase(),
    );
  }

  emailExists(email) {
    return [...this.students.values()].some(
      ({ student }) => student.email.toLowerCase() === email.toLowerCase(),
    );
  }

  updateName(id, name) {
    const record = this.students.get(id);
    if (!record) return null;

    record.student.name = name;
    record.student.updatedAt = new Date().toISOString();
    return { ...record.student };
  }

  delete(id) {
    return this.students.delete(id);
  }

  clear() {
    this.students.clear();
  }
}

module.exports = new StudentStore();
