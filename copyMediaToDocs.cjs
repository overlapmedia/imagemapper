const fs = require("fs");
fs.mkdirSync("./docs/media");
fs.copyFile("./media/header.png", "./docs/media/header.png", () => {});
