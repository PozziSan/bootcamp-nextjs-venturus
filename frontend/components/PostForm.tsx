import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { Post } from "../types";

interface PostFormProps {
  post?: Post;
  postHandler: (formData: FormData) => void;
}

const PostForm = (props: PostFormProps) => {
  const { post, postHandler } = props;

  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [pictureState, setPictureState] = useState<File | null>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (pictureState) {
      formData.append("picture", pictureState);
    }

    formData.append("title", titleState);
    formData.append("content", contentState);

    postHandler(formData);
  };

  useEffect(() => {
    if (post) {
      setTitleState(post.title);
      setContentState(post.content);
    }
  }, [post]);

  return (
    <form encType="multipart/form-data" onSubmit={submitHandler}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel htmlFor={"title"}>Title</FormLabel>
          <Input
            id={"title"}
            type={"text"}
            value={titleState}
            placeholder={"Title"}
            size={"lg"}
            isRequired
            data-testid="post-form-title"
            onChange={(event) => setTitleState(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={"picture"}>Picture</FormLabel>
          <Input
            id={"picture"}
            type={"file"}
            placeholder={"Picture"}
            size={"lg"}
            isRequired={!post}
            data-testid="post-form-picture"
            onChange={(event) =>
              setPictureState(event.target.files ? event.target.files[0] : null)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={"content"}>Content</FormLabel>
          <Textarea
            id={"content"}
            value={contentState}
            placeholder={"Content"}
            size={"lg"}
            isRequired
            data-testid="post-form-content"
            rows={20}
            onChange={(event) => setContentState(event.target.value)}
          />
        </FormControl>
        {/* this button could be a component itself... perhaps a atom? */}
        <Button type={"submit"} colorScheme={"purple"} alignSelf={"flex-start"}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default PostForm;
