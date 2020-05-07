const fs = require(`fs`);
const chalk = require(`chalk`);

//function that adds a new note with a title and a body
const addNote = (title, body) => {
  //loads current notes
  const noteList = loadNotes();
  //finds the first note that matches the title argument(returns undefined if there are no matches)
  const duplicateNote = noteList.find((note) => note.title === title);

  debugger; 
  
  //if duplicateNote was undefined, or not there, then add your new note and body argument to the array that contains your notes
  if (duplicateNote === undefined) {
    noteList.push({
      title: title,
      body: body,
    });
    //converts notesList, currently a JSON object to a string, then saves that string to a notes.json file
    saveNotes(noteList);
    console.log(chalk.bgGreen.bold(`${title} added successfully`));
  } else {
    console.log(chalk.bgRed.bold(`${title} Is Taken! Use Another Title`));
  }
  //if the notes.js file does not exist, noteList.push adds attributes to the empty array that was saved to notes above
};

//a function to remove a note from the array of notes, give the name of the note's title as an argument.
const removeNote = (title) => {
  const noteList = loadNotes();
  const matchingNotes = noteList.filter((note) => note.title !== title);
  if (noteList.length > matchingNotes.length) {
    console.log(chalk.bgGreen.bold(`${title} was deleted successfully`));
    saveNotes(matchingNotes);
  } else {
    console.log(
      chalk.bgRed.bold(`${title} does not exist. Nothing was removed`)
    );
  }
};

//a function that lists titles of all current notes
const listNotes = () => {
  //Print Title for the Notes to the console
  console.log(chalk.inverse.bold(`Your Notes:`));
  //use loadNotes() to create a new array out of current notes
  const noteList = loadNotes();
  //iterates over each element in the array of notes, and prints the title of each element
  for (const note of noteList) {
    console.log(note.title);
  }
};

//a function that displays the contents of a note given the title as an argument
const readNote = (title) => {
  //load all current notes
  const noteList = loadNotes();
  //goes through noteList to find the first title that matching the one being input by the user
  const matchingNote = noteList.find((note) => note.title === title);

  //if matchingNote is undefined, then present an error to the user, otherwise display the title and the body
  if (matchingNote === undefined) {
    console.log(chalk.bgRed.bold(`${title} does not exist`));
  } else {
    //saves the note's title and body to variables
    const noteTitle = matchingNote.title;
    const noteBody = matchingNote.body;
    console.log(chalk.magenta.underline(`${title}`));
    console.log(noteBody);
  }
};

//a function that converts a JSON object to a string, then saves that string to a file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(`./notes.json`, dataJSON);
};

//function that attempts to load a notes.json file, then convert that buffered file into a string, and lastly convert that string into a JSON object and if there is an error, an empty object is returned. It returns an array, with objects in it
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(`./notes.json`);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//the functions that I will export from this file, to use in other files
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
