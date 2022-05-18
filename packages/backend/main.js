const app = require("./app");
const PORT = process.env.NODE_ENV_PORT || 3000;

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

start(PORT);
