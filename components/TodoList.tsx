import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ITodo } from "../types";
import useAuthService from "../utils/auth";

const TodoList: React.FC<{
  todo: ITodo[];
  deleteTodo: (id: string) => () => void;
  updateTodo: (id: string, status: "completed" | "todo") => void;
}> = ({ todo, updateTodo, deleteTodo }) => {
  const { user } = useAuthService();
  return (
    <Accordion w="100%" allowToggle>
      {todo.map((item, idx) => (
        <AccordionItem key={idx}>
          <h2>
            <AccordionButton>
              <HStack flex="1" textAlign="left">
                <Text bg="blue.100" w='min-content' p={1} borderRadius='full'>
                  {item.author.email
                    .substring(0, 10)
                    .concat(item.author.email.length > 10 ? "..." : "")}
                </Text>
                <Text
                  textDecoration={
                    item.type === "completed" ? "line-through" : undefined
                  }
                >
                  {item.title}
                </Text>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>{item.description}</Text>
            {user.id === item.author.id ? (
              <HStack>
                <IconButton
                  onClick={() =>
                    updateTodo(
                      item.id,
                      item.type === "completed" ? "todo" : "completed"
                    )
                  }
                  aria-label="Search database"
                  icon={<EditIcon />}
                />
                <IconButton
                  onClick={deleteTodo(item.id)}
                  aria-label="Search database"
                  icon={<DeleteIcon />}
                />
              </HStack>
            ) : undefined}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TodoList;
