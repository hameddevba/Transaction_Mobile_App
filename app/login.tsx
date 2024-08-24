import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';

import { useSession } from './authConfig/autContext';
import { router } from 'expo-router';

const LoginScreen = () => {
   
   const { signIn } = useSession();
   
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // TODO: Implement login logic
      console.log('Login with:', name, password);
         router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize = 'none'
      />
      {/* <Button title="Login" onPress={handleLogin} style={styles.button}/> */}
      <TouchableOpacity 
         style={styles.button}
         onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width:'100%',
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
   backgroundColor: "#01a5fc",
   borderRadius: 10,
   padding: 10,
   alignItems: "center",
   marginTop: "2.5%",
   width: '80%',
 },
 buttonText: {
   color: "#fff",
   fontWeight: "bold",
   fontSize: 25,
 }
});

export default LoginScreen;

