import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Flex, Heading, Avatar, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import Sidebar from "./Sidebar"

export default function Topbar({email}) {

  const [mostrarSidebar, setMostrarSidebar] = useState(false)

  const desplegarSidebar = () => {
    setMostrarSidebar(!mostrarSidebar)
  }

  return (
    <>

    <Flex 
      className="sideContainer"
      bg="gray.100"
      h="100%"
      hidden={mostrarSidebar}
    >
      <IconButton className="backButton" size="sm" isRound icon={<ArrowLeftIcon />} onClick={() => desplegarSidebar()} />
      <Sidebar />
    </Flex>
    
      <Flex
      bg="gray.100"
      h="81px" w="100%"
      align="center"
      p={5}
    >
      <IconButton size="sm" isRound icon={<ArrowLeftIcon />} onClick={() => desplegarSidebar()} />
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
    </>
    
  )
}