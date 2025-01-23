// Server entry point for Temelio take home app:
const app = require('./app');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});