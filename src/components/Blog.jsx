import Togglable from './Togglable';

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}
        <Togglable
          showButtonLabel="view"
          hideButtonLabel="hide"
          childrenBelowButton
        >
          <p id="url">{blog.url}</p>
          <p id="likes">
            {blog.likes} likes
            <button
              onClick={() => increaseLikes(blog)}
              className="like-button"
            >
              like
            </button>
          </p>
          <p id="username">added by {blog.user.name}</p>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
