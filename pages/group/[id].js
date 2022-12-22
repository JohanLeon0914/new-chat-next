import { Flex, Text } from "@chakra-ui/layout"
import Sidebar from "../../components/Sidebar"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, orderBy, query } from "firebase/firestore"
import { db, auth } from "../../firebaseconfig"
import Topbar from "../../components/Topbar"
import Bottombar from "../../components/Bottombar"
import { useRef, useEffect } from "react";
import getOtherEmail from "../../util/getOtherEmail";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "groups", id));
  console.log(chat)
  const q = query(collection(db, `groups/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const senderFunction = (sender) => {
    if(sender === user.email) return true;
  }


  const getMessages = () =>
    messages?.map(msg => {
      return (
        <Flex key={Math.random()} alignSelf={senderFunction(msg.sender) ? "flex-start" : "flex-end"} direction="column" m={4}>
          <p className="name_sender">{msg.sender}</p>
          <Flex alignSelf={senderFunction(msg.sender) ? "flex-start" : "flex-end"} bg={senderFunction(msg.sender) ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
          <Text>{msg.text}</Text>
        </Flex>
        <Flex  alignSelf={senderFunction(msg.sender) ? "flex-start" : "flex-end"}>
          <p>{msg.sendTime}</p>
          </Flex>
        </Flex>
      )
    })

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
      behavior: "smooth",
      block: 'start',
    }), 100)
  }
  , [messages])

  return (
    <Flex
      h="100vh"
    >
      <Head><title>Boomerland chat</title></Head>

      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email='boomerland' />

        <Flex flex={1} direction="column" pt={4} mx={5} overflowX="scroll" sx={{scrollbarWidth: "none"}} className='chats-container'>
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar id={id} user={user} isGroup={true} />
      </Flex>

    </Flex>

  )
}