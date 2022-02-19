import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import PostForm from '../components/PostForm';

describe('PostForm', () => {
  const post = {
      id: 1,
      title: 'Test post title',
      picture: '::test_url::',
      content: 'Test post content',
    };

  const postHandler = jest.fn(x => {});

  it('call posthandler function with form submit', () => {
    render(<PostForm  postHandler={postHandler} post={post}/>);

    expect(screen.getByTestId('post-form-title')).toBeTruthy();
    expect(screen.getByTestId('post-form-picture')).toBeTruthy();
    expect(screen.getByTestId('post-form-content')).toBeTruthy();

    const button = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(button);
    expect(postHandler).toHaveBeenCalled();
  });
});
