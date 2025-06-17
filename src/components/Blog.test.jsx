import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders only title and author by default, not url or likes', () => {
  const blog = {
    title: 'Component testing by React Testing Library',
    author: 'Tester Testerman',
    url: 'https://test.com',
    likes: 3,
    user: {
      name: 'User Userman',
    },
  };

  const mockHandler = vi.fn();

  render(
    <Blog blog={blog} increaseLikes={mockHandler} removeBlog={() => {}} />
  );

  expect(screen.queryByText('Component testing by React Testing Library')).toBeDefined();
  expect(screen.queryByText('Tester Testerman')).toBeDefined();

  expect(screen.queryByTestId('url')).not.toBeInTheDocument();
  expect(screen.queryByTestId('likes')).not.toBeInTheDocument();
  expect(screen.queryByTestId('username')).not.toBeInTheDocument();
});

test('renders url and likes when view button is clicked', async () => {
  const blog = {
    title: 'Component testing by React Testing Library',
    author: 'Tester Testerman',
    url: 'https://test.com',
    likes: 3,
    user: {
      name: 'User Userman',
    },
  };
  const mockHandler = vi.fn();
  const { container } = render(
    <Blog blog={blog} increaseLikes={mockHandler} removeBlog={() => {}} />
  );
  const viewButton = screen.getByText('view');
  viewButton.click();
  expect(screen.queryByTestId('url')).toBeDefined();
  expect(screen.queryByTestId('likes')).toBeDefined();
  expect(screen.queryByTestId('username')).toBeDefined();
  expect(container.querySelector('.blog')).toHaveTextContent('https://test.com');
  expect(container.querySelector('.blog')).toHaveTextContent('3 likes');
  expect(container.querySelector('.blog')).toHaveTextContent('added by User Userman');
});

test('clicking like button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing by React Testing Library',
    author: 'Tester Testerman',
    url: 'https://test.com',
    likes: 3,
    user: {
      name: 'User Userman',
    },
  };
  const mockHandler = vi.fn();
  render(
    <Blog blog={blog} increaseLikes={mockHandler} removeBlog={() => {}} />
  );
  const viewButton = screen.getByText('view');
  viewButton.click();
  const likeButton = screen.getByText('like');
  likeButton.click();
  likeButton.click();
  expect(mockHandler).toHaveBeenCalledTimes(2);
});
