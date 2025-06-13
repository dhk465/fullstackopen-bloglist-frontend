import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyWith('wrong username or password', true);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    );
  };

  const logoutForm = () => {
    return (
      <div>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <Togglable showButtonLabel="create new blog" hideButtonLabel="cancel">
        <BlogForm createBlog={createBlog} />
      </Togglable>
    );
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      notifyWith(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
    } catch (exception) {
      notifyWith('Error creating blog', true);
    }
  };

  const increaseLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id || blog.user,
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (error) {
      notifyWith('Error updating likes', true);
    }
  };

  return (
    <div>
      <h2>blogs</h2>

      <Notification
        message={notification?.message}
        isError={notification?.isError}
      />

      {user === null && loginForm()}
      {user !== null && logoutForm()}

      {user !== null && blogForm()}

      {user !== null &&
        blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} />
        ))}
    </div>
  );
};

export default App;
