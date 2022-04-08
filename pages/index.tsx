import React from 'react'
import {Text, VStack, Button} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Input from '../components/Input'
// import {authService} from '../services'

const Home: NextPage = () => {
  const [email,setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async () => {
    const response = await fetch('/api/signup',{
      body: JSON.stringify({email, password}),
      method: 'POST'
    })
    console.log('this is the response', {response})
  }
  
  return (
    <VStack justifyContent='center' alignItems='center' height='100vh'>
      <Text>Sign Up</Text>
      <VStack m='auto' bg='whitesmoke' boxShadow='md' py={4} w='30vw' borderRadius='md'>
        <Input
          type='email'
          value={email}
          setValue={setEmail}
          label='Email'
          placeholder='Input your email'
        />
        <Input
          type='password'
          value={password}
          setValue={setPassword}
          label='Password'
          placeholder='Input your password'
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </VStack>
  )
}

export default Home
