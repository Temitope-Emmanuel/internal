import {
  Box,
  Button,
  Collapse,
  useDisclosure,
  VStack,
  Text
} from "@chakra-ui/react";
import React from "react";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import AuthLayout from "../../layouts/AuthLayout";

const Todo:React.FC<{
  todos: []
}> = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    if(props.todos?.length){
      setTodo(props.todos)
    }
  },[])

  const updateTodo = async (id: string, type: 'completed' | 'todo') => {
    const res = await fetch(`/api/todo`,{
      method: 'PUT',
      body: JSON.stringify({
        id,
        type
      })
    });
    const data = await res.json();
    setTodo(data.data);
  };

  const deleteTodo = (id: string) => async () => {
    const res = await fetch('/api/todo',{
      method:'DELETE',
      body: JSON.stringify({
        id
      })
    })
    const data = await res.json();
    setTodo(data.data)
  }

  const addTodo = async ({description,title}: {title: string; description: string}) => {
    const response = await fetch('/api/todo',{
      body: JSON.stringify({title, description}),
      method: 'POST'
    })
    const data = await response.json()
    console.log('this is the data',{data})
    if(data.message === 'success'){
      setTodo(data.data)
    }
    return data
  }

  return (
    <AuthLayout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <VStack alignItems="center" justifyContent="center">
          <Button onClick={onToggle}>
            {isOpen ? "Close Todo Form" : "Open Todo Form"}
          </Button>
          <Collapse in={isOpen}>
            <TodoForm
              handleSubmit={addTodo}
              handleClose={onToggle} 
              />
          </Collapse>
        </VStack>
        <VStack my="auto">
          {todo.length ? 
            <TodoList 
              {...{deleteTodo,updateTodo}}
            todo={todo} /> : 
            <Text>No available todo, Create a Todo</Text>
          }
        </VStack>
      </Box>
    </AuthLayout>
  );
};

export default Todo;
