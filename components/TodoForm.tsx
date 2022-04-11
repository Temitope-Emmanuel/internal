import React from "react";
import {
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import Input from "../components/Input";

const TodoForm: React.FC<{
  handleClose: () => void;
  handleSubmit: (arg:{title: string; description: string}) => Promise<any>;
}> = ({handleClose, handleSubmit}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleFormSubmit = () => {
    handleSubmit({title, description}).then(() => {
      setDescription('')
      setTitle('')
      handleClose()
    })
  }

  return (
      <VStack
        m="auto"
        bg="whitesmoke"
        boxShadow="md"
        py={4}
        w="30vw"
        borderRadius="md"
      >
        <Input
          value={title}
          setValue={setTitle}
          label="Title"
          placeholder="Input title of todo"
        />
        <Input
          value={description}
          setValue={setDescription}
          label="Description"
          placeholder="Input description of todo"
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
      </VStack>
  );
};

export default TodoForm;
