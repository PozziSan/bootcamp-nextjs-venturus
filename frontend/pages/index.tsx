import type { NextPage } from "next";
import PostList from "../components/PostList";
import { BACKEND_URL, getPosts } from "../services/post";
import { Post } from "../types";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { posts } = props;

  return (
    <>
      <PostList posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  let posts: Post[] = [];

  posts = await getPosts();

  const updatedPosts = posts.map((post) => ({
    ...post,
    picture: `${BACKEND_URL}/${post.picture}`,
  }));

  return {
    props: {
      posts: updatedPosts,
    },
    revalidate: 1,
  };
};

export default Home;
