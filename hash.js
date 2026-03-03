const bcrypt = require("bcrypt");

async function run() {
  const hash = await bcrypt.hash("faceyoga2025", 10);
  console.log(hash);
}

run();