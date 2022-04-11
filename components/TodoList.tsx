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
import { ITodo } from "../services/db.service";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TodoList: React.FC<{
  todo: ITodo[];
  deleteTodo: (id: string) => () => void;
  updateTodo: (id: string, status: "completed" | "todo") => void;
}> = ({ todo, updateTodo, deleteTodo }) => {
  return (
    <Accordion allowToggle>
      {todo.map((item, idx) => (
        <AccordionItem key={idx}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text textDecoration={item.type === 'completed' ? 'line-through' : undefined}>
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>{item.description}</Text>
            <HStack>
              <IconButton
                onClick={() => updateTodo(item.id, item.type === 'completed' ? 'todo' : 'completed')}
                aria-label="Search database"
                icon={<EditIcon />}
              />
              <IconButton
                onClick={deleteTodo(item.id)}
                aria-label="Search database"
                icon={<DeleteIcon />}
              />
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TodoList;
