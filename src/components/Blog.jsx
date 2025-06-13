import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, increaseLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Togglable showButtonLabel="view" hideButtonLabel="hide" childrenBelowButton>
          <div>
            <p>{blog.url}</p>
            <p>
              {blog.likes} likes
              <button onClick={() => increaseLikes(blog)}>like</button>
            </p>
            <p>added by {blog.user.name}</p>
          </div>
        </Togglable>
      </div>
    </div>
  );

};

export default Blog;
