import { useState, createContext, ReactNode , useEffect} from "react";

// import { useNavigate } from 'react-router-dom';

interface UserContextProps {
    user ?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

interface UserProviderProps {
    children: ReactNode;
}

interface User {
    username: string;
    password: string | null;
    email: string;
    phoneNum: string;
    state: string;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | undefined>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

