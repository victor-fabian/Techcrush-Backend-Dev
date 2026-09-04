const app = require('./src/app');

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Student Portal API is running at http://localhost:${port}`);
});
