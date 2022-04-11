import React from 'react';
import {Box, HStack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import useAuthService from '../utils/auth';
import { useRouter } from 'next/router';

const AuthLayout: React.FC<{
    children: any
}> = (props) => {
    const router = useRouter()
    const {user} = useAuthService();
    
    React.useEffect(() => {
        if(!user.id){
            router.push('/')
        }
    },[user])

    return(
        <Box p={3}>
            {
                user.email ? 
                <Text>Hi, {user.email}</Text> : 
                undefined
            }
            <HStack justifyContent='space-around'>
                <Link href='/todo'>Todo</Link>
                <Link href='/'>Home</Link>
                <Link href='/user/edit'>User</Link>
            </HStack>
            {props.children}
        </Box>
    )
}

export default AuthLayout