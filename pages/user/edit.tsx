import React from 'react';
import {Text, VStack} from '@chakra-ui/react'
import EditUserForm from '../../components/EditUserForm';
import AuthLayout from '../../layouts/AuthLayout';
import useAuthService from '../../utils/auth';


const EditUser = () => {
    const {user, setUser} = useAuthService()

    const handleFormSubmit = async ({email, password}: {email: string; password: string}) => {
        const res = await fetch(`/api/user`,{
            method: 'PUT',
            body: JSON.stringify({
                email,
                id: user.id,
                password
            })
        });
        const data = await res.json();
        console.log('this is the data', {data})
        setUser({
            ...user,
            ...data.data
        })
    }

    return(
        <AuthLayout>
            <VStack display='flex' h='100vh' alignItems='center' justifyContent='center'>
                <Text>Edit User Information</Text>
                <EditUserForm
                    user={{email: user.email}}
                    handleSubmit={handleFormSubmit}
                />
            </VStack>
        </AuthLayout>
    )
}

export default EditUser