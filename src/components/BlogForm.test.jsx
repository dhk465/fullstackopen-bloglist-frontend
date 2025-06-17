import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  // const { container } = render(<BlogForm createBlog={createBlog} />);
  render(<BlogForm createBlog={createBlog} />);

  screen.debug();

  // const inputs = screen.getAllByRole('textbox');
  // const inputs = container.querySelectorAll('.blog-input');
  // const titleInput = inputs[0];
  // const authorInput = inputs[1];
  // const urlInput = inputs[2];
  // const titleInput = container.querySelector('#title-input');
  // const authorInput = container.querySelector('#author-input');
  // const urlInput = container.querySelector('#url-input');
  const titleInput = screen.getByPlaceholderText('title of the blog');
  const authorInput = screen.getByPlaceholderText('author of the blog');
  const urlInput = screen.getByPlaceholderText('url of the blog');
  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'testing a form... title');
  await user.type(authorInput, 'testing a form... author');
  await user.type(urlInput, 'testing a form... url');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form... title');
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form... author');
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form... url');
  // console.log(createBlog.mock.calls);
});
