import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { FormEvent } from "react";

const PostForm = () => {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form encType="multipart/form-data" onSubmit={submitHandler}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel htmlFor={"title"}>Title</FormLabel>
          <Input
            id={"title"}
            type={"text"}
            value=""
            placeholder={"Title"}
            size={"lg"}
            isRequired
            data-testid="post-form-title"
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
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={"content"}>Content</FormLabel>
          <Textarea
            id={"content"}
            value=""
            placeholder={"Content"}
            size={"lg"}
            isRequired
            data-testid="post-form-content"
            rows={20}
          />
        </FormControl>
        {/* this button could be a component itself... perhaps a atom? */}
        <Button type={"submit"} colorScheme={"purple"} alignSelf={"flex-start"}>Submit</Button>
      </Stack>
    </form>
  );
};

export default PostForm;
