const server = require('./api/server');
const port = 2000;


server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});