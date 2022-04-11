import React from 'react'
import {Text, VStack, Button, HStack} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Input from '../components/Input'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home: NextPage = () => {
  const router = useRouter()
  const [email,setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async () => {
    const response = await fetch('/api/signup',{
      body: JSON.stringify({email, password}),
      method: 'POST'
    })
    const data = await response.json()
    if(data.message === 'success'){
      setEmail('')
      setPassword('')
      router.push('/todo')
    }
  }
  
  return (
    <VStack justifyContent='center' alignItems='center' height='100vh'>
      <Text>Welcome to internal</Text>
      <HStack pt='5'>
        <Link href='/login'>Login</Link>
        <Link href='/signup'>Sign up</Link>
      </HStack>
    </VStack>
  )
}

export default Home
