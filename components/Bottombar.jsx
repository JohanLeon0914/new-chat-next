import { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";

export default function Bottombar({id, user, isGroup}) {
  const [input, setInput] = useState("");

  const getTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if(minutes <= 9) {
      minutes = `0${minutes}`;
    }
    
    let dayOrNight = hour <= 12? "am": "pm"
    return (`${hour}:${minutes} ${dayOrNight}`)
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if(!isGroup) {
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp(),
        sendTime: getTime()
      })
    } else {
      await addDoc(collection(db, `groups/${id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp(),
        sendTime: getTime()
      })
    }
    setInput("");
  }

  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
    >
      <Input placeholder="Type a message..." autoComplete="off" onChange={e => setInput(e.target.value)} value={input} />
      <Button type="submit" hidden>Submit</Button>
    </FormControl>
  )
}