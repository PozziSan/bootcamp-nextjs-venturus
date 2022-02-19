import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Post from '../components/Post';

describe('Post', () => {
  const post = {
    id: 1,
    title: 'Test post title',
    picture: '::test_url::',
    content: 'Test post content',
  };
  const updatePostHandler = jest.fn();
  const deletePostHandler = jest.fn();
  const UPDATE_LABEL = 'Update';
  const DELETE_LABEL = 'Delete';

  it('renders title', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      post.title
    );
  });

  it('renders content', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );

    expect(screen.getByText(post.content)).toBeInTheDocument();
  });

  it('renders buttons', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );

    expect(
      screen.getByRole('button', {
        name: UPDATE_LABEL,
      })
    ).toBeDefined();

    expect(
      screen.getByRole('button', {
        name: DELETE_LABEL,
      })
    ).toBeDefined();
  });

  it('renders picture', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );
    const image: HTMLImageElement = screen.getByAltText(post.title);
    expect(image.src).toContain(post.picture);
  });

  it('calls update function when button is clicked', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );

    userEvent.click(
      screen.getByRole('button', {
        name: UPDATE_LABEL,
      })
    );

    expect(updatePostHandler).toHaveBeenCalled();
  });

  it('calls delete function when button is clicked', () => {
    render(
      <Post
        post={post}
        updatePostHandler={updatePostHandler}
        deletePostHandler={deletePostHandler}
      />
    );

    userEvent.click(
      screen.getByRole('button', {
        name: DELETE_LABEL,
      })
    );

    expect(deletePostHandler).toHaveBeenCalled();
  });
});
