import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div className="blogForm">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
            placeholder='title of the blog'
          />
        </div>
        <div>
          author:
          <input
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
            placeholder='author of the blog'
          />
        </div>
        <div>
          url:
          <input
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
            placeholder='url of the blog'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
