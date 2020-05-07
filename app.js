//a command line node application that saves notes to a notes.json file, using "node app.js command". It uses chalk to format console output. It uses Yargs to setup commands and options to use with the app.js. All functions are currently stored in notes.js
const chalk = require(`chalk`);
const yargs = require(`yargs`);
const notesUtils = require(`./notes`);

//customize yargs version
yargs.version(`1.1.0`);

//create add command
yargs.command({
  command: `add`,
  describe: `Add a New Note`,
  builder: {
    title: {
      describe: `Note Title`,
      demandOption: true,
      type: `string`,
    },
    body: {
      describe: `Note Body`,
      demandOption: true,
      type: `string`,
    },
  },
  handler(argv) {
    notesUtils.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: `remove`,
  describe: `Remove a New Note`,
  builder: {
    title: {
      describe: `Note Title`,
      demandOption: true,
      type: `string`,
    },
  },
  handler(argv) {
    notesUtils.removeNote(argv.title);
  },
});

//create list command
yargs.command({
  command: `list`,
  describe: `List All Notes`,
  handler() {
    notesUtils.listNotes();
  },
});

//create read command
yargs.command({
  command: `read`,
  describe: `Read a note`,
  builder: {
    title: {
      describe: `Note Title`,
      demandOption: true,
      type: `string`,
    },
  },
  handler(argv) {
    notesUtils.readNote(argv.title);
  },
});

//add, remove, read, list notes

yargs.parse();
