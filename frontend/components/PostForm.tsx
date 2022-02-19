import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

interface PostFormProps {
  postHandler: (formData: FormData) => void;
}

const PostForm = (props: PostFormProps) => {
  const { postHandler } = props;

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
            isRequired
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
