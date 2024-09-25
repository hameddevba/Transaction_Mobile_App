import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../app/authConfig/useStorageState';
import { Alert } from 'react-native';
import fetchData from '../utils/data_fetching';

interface SignInResponse {
   tokenType: string;
   accessToken: string;
}

const AuthContext = createContext<{
  signIn: (username:any,password:any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{

         signIn : async (username: string, password: string): Promise<void> => {

            const url = 'http://192.168.100.100:9999/api/auth/signin';
            const data = { username, password };
            const headers = {
               'Authorization': '', // You can add your token here if needed
               'Content-Type': 'application/json'
            };
      
            try {

               const result = await fetchData<SignInResponse>({ url, headers, body: data });
               
               setSession(`${result.tokenType} ${result.accessToken}`);
               
               // if (result) {
               //    console.log("login success")
               // } else {
               //    setSession(null);
               // }
               
               // console.log(`${result.tokenType} ${result.accessToken}`);
      
            } catch (error) {
               console.error('Error:', error);
               Alert.alert('Invalid credentials');
            }
         },

         signOut : () => {
            setSession(null);
         },

         session,
         isLoading,

      }}>

      {children}

    </AuthContext.Provider>
  );
}
