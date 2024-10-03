import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { Alert } from 'react-native';
import { fetchURL } from '@/constants/fetchUrl';

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
        signIn: async (username:any,password:any) => {
          // Perform sign-in logic here
            const url = `${fetchURL}/api/auth/signin`;
            const data = {
              username: username,
              password: password
            };
          
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Authorization': '', // You can add your token here if needed
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
            
              const result = await response.text();

            //   setSession(result.tokenType +" "+result.accessToken);
              setSession(result);

              // if (result) {
              //    console.log("login success")
              //    } else {
              //       setSession(null);
              //    }

            //   console.log(result.tokenType +" "+result.accessToken);

            } catch (error) {
              console.error('Error :', error);
              Alert.alert('Invalid credentiels')
            }
        },

        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
