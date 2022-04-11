import React from 'react'
import {Text, VStack, Button} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Input from '../components/Input'
import {useRouter} from 'next/router'
import Link from 'next/link'
import useAuthService from '../utils/auth'

const Home: NextPage = () => {
  const router = useRouter()
  const {setUser} = useAuthService()
  const [error, setError] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async () => {
    const response = await fetch('/api/auth/login',{
      body: JSON.stringify({email, password}),
      method: 'POST'
    })
    const data = await response.json()
    if(data.message === 'success login'){
      setUser({
        email: data.data.email,
        id: data.data.id
      })
      setEmail('')
      setPassword('')
      router.push('/todo')
    }else{
        setError(data.message)
    }
  }
  
  return (
    <VStack justifyContent='center' alignItems='center' height='100vh'>
      <Text>Login</Text>
      <VStack m='auto' bg='whitesmoke' boxShadow='md' p={4} w='30vw' borderRadius='md'>
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
        {error.length && <Text color='red'>{error}</Text>}
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
        <Link href='/signup'>Sign up ?</Link>
    </VStack>
  )
}

export default Home
