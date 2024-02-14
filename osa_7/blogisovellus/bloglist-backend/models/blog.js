const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, minlength: 2, required: true },
  author: String,
  url: { type: String, minlength: 2, required: true },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

blogSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
