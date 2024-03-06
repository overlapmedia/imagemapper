const mergeFiles = require("merge-files");
const path = require("path");

const outputPath = path.resolve("./readme-apireference.md");
const inputPathList = [
    path.resolve("./readme-apireference-breadcrumb.md"),
    path.resolve("./docs/modules.md"),
];

mergeFiles(inputPathList, outputPath);
