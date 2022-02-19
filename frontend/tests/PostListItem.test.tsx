import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import PostListItem from '../components/PostListItem';
import { useRouter } from "next/router";

jest.mock("next/router", () => ({ useRouter: jest.fn() }))

describe('PostListItem', () => {
    const post = {
    id: 1,
    title: 'Test post title',
    picture: '::test_url::',
    content: 'Test post content',
  };

  it('renders title', () => {
    render(<PostListItem post={post} />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      post.title
    );
  });

  it('renders picture', () => {
    render(<PostListItem post={post} />);

    const image: HTMLImageElement = screen.getByAltText(post.title);
    expect(image.src).toContain(post.picture);
  });

  it('is clickable', async () => {
    const pushSpy = jest.fn();
    const spy = jest.fn(() => ({push: pushSpy}) );
    useRouter.mockImplementation(() => spy());
    
    render(<PostListItem post={post} />);
    const testItem = screen.getByTestId("PostListItem");    
    userEvent.click(testItem);
    
    expect(pushSpy).toHaveBeenCalled();
  });
});
