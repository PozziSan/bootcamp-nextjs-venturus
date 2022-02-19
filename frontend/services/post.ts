import { Post } from "../types";

interface AddPostProps {
  (post: FormData): Promise<Post | null>;
}

interface GetPostsProps {
  (): Promise<Post[]>;
}

interface GetPostByIdProps {
  (id: number): Promise<Post | null>;
}

interface EditPostProps {
  (id: number, post: FormData): Promise<boolean>;
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addPost: AddPostProps = async (postData) => {
  let post: Post | null = null;

  try {
    const response = await fetch(`${BACKEND_URL}/post`, {
      method: "POST",
      body: postData,
    });

    if (response.ok && response.status === 201) {
      const data = await response.json();
      post = {
        ...data,
      };
    }
  } catch (e) {
    console.error(e);
  }

  return post;
};

export const getPostById: GetPostByIdProps = async (id) => {
  let post: Post | null = null;
  console.log(id);

  try {
    const response = await fetch(`${BACKEND_URL}/post/${id}`);

    if (response.ok && response.status === 200) {
      const data = await response.json();
      post = {
        ...data,
      };
    }
  } catch (e) {
    console.error(e);
  }

  return post;
};

export const getPosts: GetPostsProps = async () => {
  let posts: Post[] = [];

  try {
    const response = await fetch(`${BACKEND_URL}/post`);

    if (response.ok && response.status === 200) {
      const data = await response.json();
      posts = [...data];
    }
  } catch (e) {
    console.error(e);
  }

  return posts;
};

export const editPost: EditPostProps = async (id, postData) => {
  let result = false;

  try {
    const response = await fetch(`${BACKEND_URL}/post/${id}`, {
      method: "PUT",
      body: postData,
    });

    if (response.ok && response.status === 200) {
      result = true;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
};
