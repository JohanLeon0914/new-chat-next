import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Stack,
} from "@chakra-ui/react";
import { auth } from "../firebaseconfig";
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  
  const [input, setInput] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(input, pass)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Center h="100vh">
        <Stack
          align="center"
          bgColor="gray.600"
          p={16}
          rounded="lg"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="lg"
            boxShadow="md"
          >
            <Center>
            <FormControl p={3} onSubmit={handleSubmit} as="form">
              <Input
                bg='gray.200'
                textColor='black'
                placeholder="Email"
                onChange={(e) => setInput(e.target.value)}
                type='email'
                m={3}
              />
              <Input
                bg='gray.200'
                textColor='black'
                placeholder="Password"
                type="password"
                m={3}
                onChange={(e) => setPass(e.target.value)}
              />
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
            </FormControl>
            </Center>
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign in With Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}
