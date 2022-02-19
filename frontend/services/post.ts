import { Post } from "../types";

interface AddPostProps {
  (post: FormData): Promise<Post | null>;
}

export const addPost: AddPostProps = async (postData) => {
  let post = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
      {
        method: "POST",
        body: postData,
      }
    );

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
