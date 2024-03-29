import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import getOtherEmail from "../util/getOtherEmail";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  // const [esconderSidebar, setEsconderSidebar] = useState(hidden)
  const [snapshot] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const [snapshot2] = useCollection(collection(db, "groups"));
  const groups = snapshot2?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const redirectGroup = (id) => {
    router.push(`/group/${id}`);
  };

  const chatExists = (email) => {
    if (!chats || chats.length === 0) {
      return false; // O cualquier otro valor apropiado si no hay chats
    }
  
    return chats.find(
      (chat) => chat.users && chat.users.includes(user.email) && chat.users.includes(email)
    );
  };

  const newChat = async () => {
    const input = prompt("Digita el email del chat");
    if (!chatExists(input) && input != user.email)
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
  };

  const chatList = () => {
    if (!chats || chats.length === 0) {
      return null; // O cualquier otro valor apropiado si no hay chats
    }
  
    return chats
      .filter((chat) => chat.users && chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={chat.id}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text> {getOtherEmail(chat.users, user)} </Text>
        </Flex>
      ));
  };

  const groupList = () => {
    return groups
      ?.filter((group) => group.users.includes(user.email))
      .map((group) => (
        <Flex
          key={group.id}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirectGroup(group.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text> {group.name} </Text>
        </Flex>
      ));
  };

  const OcultarOmostrarSidebar = () => {
    setEsconderSidebar(true);
  };

  return (
    <Flex
      // bg='blue.100'
      h="100%"
      w="300px"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
      bg="gray.100"
      // hidden={esconderSidebar}
    >
      <Flex
        // bg="red.100"
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text> {user.displayName ? user.displayName : user.email} </Text>
        </Flex>
        {/* <IconButton size="sm" isRound icon={<ArrowLeftIcon />} onClick={() => signOut(auth)} /> */}
        {/* <IconButton size="sm" isRound icon={<ArrowLeftIcon />} onClick={() => OcultarOmostrarSidebar()} /> */}
      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>
        New chat
      </Button>

      <Flex
        className="chats-container"
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {chatList()}
        <hr />
        <Center> Grupos </Center>
        {groupList()}
        <button className="btn-logout" onClick={() => signOut(auth)}>Logout</button>
      </Flex>
    </Flex>
  );
}
