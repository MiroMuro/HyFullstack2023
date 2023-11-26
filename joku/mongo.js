const mongoose = require("mongoose");

if (process.argv < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://mssl2000:${password}@miro.oyuedl2.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({ important: false }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

/*note.save().then((result) => {
  console.log("note saved!");
  console.log(result);
  mongoose.connection.close();
});*/
