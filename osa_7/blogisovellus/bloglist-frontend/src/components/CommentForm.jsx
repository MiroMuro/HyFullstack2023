import { useState } from "react";
import { appendCommentToBlog } from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CommentForm = ({ blogId, addCommentMutation }) => {
  const [comment, setComment] = useState();

  const queryClient = useQueryClient();

  const handleChange = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Append this comment:", comment);
    const commentJson = { content: comment };
    addCommentMutation.mutate({ blogId, commentJson });
    //appendCommentToBlog(blogId, commentJson);
  };
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      Add a comment:
      <input name="comment" onChange={(event) => handleChange(event)}></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
