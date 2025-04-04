import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

type User = {
  jwt: string;
  username: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loginUser: (
    jwt: string,
    username: string,
    email: string,
    rememberMe: boolean
  ) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const loginUser = useCallback(
    (jwt: string, username: string, email: string, rememberMe: boolean) => {
      const newUser = { jwt, username, email };
      setUser(newUser);
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(newUser));
      }
    },
    []
  );

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }, []);

  const isAuthenticated = !!user?.jwt;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        isAuthenticated,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export const useUserContext = () => useContext(UserContext);
