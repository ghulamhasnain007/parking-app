import { useState, createContext, ReactNode , useEffect} from "react";

// import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    isAdmin: boolean;
    isAuthenticated: boolean;
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: number;
    username: string;
    isAdmin: boolean;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log("from Context: ", parsedUser);

            setIsAuthenticated(true);
            setIsAdmin(parsedUser.isAdmin);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false); // Set loading to false once authentication check is done
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, setUser, setIsAdmin, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};