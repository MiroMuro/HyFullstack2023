const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, minlength: 2, required: true },
  author: String,
  url: { type: String, minlength: 2, required: true },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
