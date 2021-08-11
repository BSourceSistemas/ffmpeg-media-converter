"use strict";

const { join } = require("path");
const shell = require("any-shell-escape");
const { exec } = require("child_process");

const argv = process.argv.slice(2);
if (argv.includes("-h") || argv.includes("--help")) {
  console.info(`
This is just a simple CLI wrapper around the powerful ffmpeg CLI tool.
This script just showcases how to use ffmpeg-static; It wouldn't make
sense to hide a flexible tool behind a limited wrapper script.
Usage:
	node ./index.js video-test.avi video-test.mp4
`);
  process.exit(0);
}

const [src, dest] = argv;
const makeMp4 = shell([
  "ffmpeg",
  "-y",
  "-v",
  "error",
  "-i",
  join(process.cwd(), src),
  "-acodec",
  "avi",
  "-format",
  "mp4",
  join(process.cwd(), dest),
]);

exec(makeMp4, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.info("Conversation made successfully!");
  }
});
