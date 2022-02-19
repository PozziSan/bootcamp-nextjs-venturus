import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Post } from "../types";
import PostListItem from "./PostListItem";

interface PostListProps {
  posts: Post[];
}

const PostList = (props: PostListProps) => {
  const { posts } = props;

  const listPosts = () => {
    if (posts.length === 0) {
      return (
        <Alert status={"info"}>
          <AlertIcon />
          No Posts Found
        </Alert>
      );
    }

    return posts.map((post) => <PostListItem post={post} key={post.id} />);
  };

  return (
    <Flex data-testid="PostList" direction={"column"} align={"center"}>
      {listPosts()}
    </Flex>
  );
};

export default PostList;
