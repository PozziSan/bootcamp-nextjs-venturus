import { useToast } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import DefaultErrorPage from "next/error";
import PostForm from "../../components/PostForm";
import { BACKEND_URL, editPost, getPostById } from "../../services/post";
import { Post } from "../../types";

interface EditPostProps {
  post: Post | null;
}

const EditPost: NextPage<EditPostProps> = (props) => {
  const { post } = props;
  const toast = useToast();

  const editPostHandler = async (postData: FormData) => {
    if (!post) {
      return;
    }

    const result = await editPost(post.id, postData);

    if (!result) {
      toast({
        title: "Could not edit the post :(",
        status: "error",
        position: "top-right",
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Post edited",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <>
      {!post && <DefaultErrorPage statusCode={404} />}
      {post && <PostForm post={post} postHandler={editPostHandler} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  let post: Post | null = null;

  if (id) {
    post = await getPostById(+id);

    if (post) {
      post = {
        ...post,
        picture: `${BACKEND_URL}/${post.picture}`,
      };
    }
  }

  return {
    props: {
      post,
    },
  };
};

export default EditPost;
