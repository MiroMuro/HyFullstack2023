const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: { type: String, minlength: 2, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
});

commentSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
