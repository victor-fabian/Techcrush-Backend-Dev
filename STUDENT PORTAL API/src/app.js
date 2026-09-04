const express = require('express');
const studentStore = require('./studentStore');

const app = express();
app.use(express.json());

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicStudent(student) {
  return {
    id: student.id,
    name: student.name,
    registrationNumber: student.registrationNumber,
    email: student.email,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}

function authenticateOwner(req, res, next) {
  const record = studentStore.findRecordById(req.params.id);

  if (!record) {
    return res.status(404).json({ error: 'Student not found.' });
  }

  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token || token !== record.token) {
    return res.status(403).json({ error: 'You can only access your own student account.' });
  }

  req.student = record.student;
  return next();
}

app.get('/', (_req, res) => {
  res.json({ message: 'Student Portal API' });
});

app.post('/students', (req, res) => {
  const { name, registrationNumber, email } = req.body;

  if (![name, registrationNumber, email].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({
      error: 'Name, registrationNumber, and email are required and must be non-empty strings.',
    });
  }

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (studentStore.registrationNumberExists(registrationNumber.trim())) {
    return res.status(409).json({ error: 'Registration number already exists.' });
  }

  if (studentStore.emailExists(email.trim())) {
    return res.status(409).json({ error: 'Email address already exists.' });
  }

  const { student, token } = studentStore.create({
    name: name.trim(),
    registrationNumber: registrationNumber.trim(),
    email: email.trim().toLowerCase(),
  });

  return res.status(201).json({
    message: 'Student account created successfully.',
    student: publicStudent(student),
    token,
  });
});

app.get('/students/:id', authenticateOwner, (req, res) => {
  res.json({ student: publicStudent(req.student) });
});

app.patch('/students/:id', authenticateOwner, (req, res) => {
  const keys = Object.keys(req.body);

  if (keys.length !== 1 || keys[0] !== 'name') {
    return res.status(400).json({ error: 'Only the name field can be updated.' });
  }

  if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
    return res.status(400).json({ error: 'Name must be a non-empty string.' });
  }

  const student = studentStore.updateName(req.params.id, req.body.name.trim());
  return res.json({
    message: 'Student profile updated successfully.',
    student: publicStudent(student),
  });
});

app.delete('/students/:id', authenticateOwner, (req, res) => {
  studentStore.delete(req.params.id);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body contains invalid JSON.' });
  }

  console.error(error);
  return res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
