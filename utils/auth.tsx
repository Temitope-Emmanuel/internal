import React from 'react';
import { IUser } from '../services/db.service';

export const createGenericContext = <T extends unknown>() => {
    const genericContext = React.createContext<T | undefined>(undefined);

    const useGenericContext = () => {
        const contextIsDefined = React.useContext(genericContext);
        if (!contextIsDefined) {
            throw new Error('useGenericContext must be used within a provider');
        }
        return contextIsDefined
    }
    return [useGenericContext, genericContext.Provider] as const;
}

const [useAuthService, AuthServiceContextProvider] = createGenericContext<{
    user:Omit<IUser, 'salt' | 'password'>,
    setUser:(arg: Omit<IUser, 'salt' | 'password'>) => void
}>();


export const AuthServiceProvider = <P extends object>(Component: React.ComponentType<P>) => {
    return function Provider({...props}) {
        const [user, setUser] = React.useState<Omit<IUser, 'salt' | 'password'>>({
            email:'',
            id: ''
        })
        return(
            <AuthServiceContextProvider
                value={{
                    user,
                    setUser
                }}
            >
                <Component {...props as P} />
            </AuthServiceContextProvider>
        )
    }
}
export default useAuthService;