import { GetStaticProps, NextPage } from "next";
import DefaultErrorPage from "next/error";
import { BACKEND_URL, getPostById, getPosts } from "../../services/post";
import { Post as PostType } from "../../types";
import Post from "../../components/Post";
import { useRouter } from "next/router";

interface PostDetailProps {
  post: PostType;
}

const PostDetail: NextPage<PostDetailProps> = (props) => {
  const { post } = props;
  const router = useRouter();

  const updatePostHandler = (id: number) => {
    router.push(`/edit-post/${id}`);
  };
  const deletePostHandler = (id: number) => {
    router.push(`/delete-post/${id}`);
  };

  return (
    <>
      {!post && <DefaultErrorPage statusCode={404} />}
      {post && (
        <Post
          post={post}
          updatePostHandler={updatePostHandler}
          deletePostHandler={deletePostHandler}
        />
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  let posts: PostType[] = [];

  posts = await getPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let post: PostType | null = null;

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
    revalidate: 1,
  };
};

export default PostDetail;
