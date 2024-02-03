import { useUser } from "../reducers/notificationreducer";
import CommentForm from "./CommentForm";
const Blog = ({ blog, updateBlog, deleteBlog, addCommentMutation }) => {
  const user = useUser();
  const creatorOfBlog = blog.user.id === user.id ? true : false;
  console.log(creatorOfBlog);
  console.log(blog);
  return (
    <div>
      {!blog && <h1>Loading blog...</h1>}
      <h1>{blog.title}</h1>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button
          onClick={() =>
            updateBlog({
              id: blog.id,
              title: blog.title,
              author: blog.author,
              url: blog.url,
              likes: blog.likes + 1,
            })
          }
        >
          like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>

      {creatorOfBlog && (
        <button style={{ color: "red" }} onClick={() => deleteBlog(blog)}>
          Delete
        </button>
      )}
      <CommentForm blogId={blog.id} addCommentMutation={addCommentMutation} />
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
