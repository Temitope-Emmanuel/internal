import React from "react";
import {
  Button,
  VStack,
} from "@chakra-ui/react";
import Input from "../components/Input";
import { IUser } from "../services/db.service";

const TodoForm: React.FC<{
  user:Pick<IUser, 'email'>,
  handleSubmit: (arg:{email: string; password: string}) => Promise<any>;
}> = ({handleSubmit, user}) => {
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState("");

  const handleFormSubmit = () => {
    handleSubmit({email, password}).then(() => {
      setPassword('')
      setEmail('')
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
          value={email}
          setValue={setEmail}
          label="Email"
          placeholder="Input Email of user"
        />
        <Input
          type='password'
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Input password of user"
        />
        <Button disabled={!password.length} onClick={handleFormSubmit}>Submit</Button>
      </VStack>
  );
};

export default TodoForm;
