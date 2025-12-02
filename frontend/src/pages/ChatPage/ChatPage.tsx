import { FC } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { ChatMessages, MessageInput, RoomsSidebar } from "./components";

interface IProps {
  roomName?: string;
}

export const ChatPage: FC<IProps> = () => {
  return (
    <Grid
      height={"100%"}
      templateRows="auto 1fr auto" // Header | Chat | Input
      templateColumns="auto 1fr" // Sidebar | Chat area
      gap={0}
    >
      <Box gridRow="1" gridColumn="1 / -1">
        <Header />
      </Box>

      <Box gridRow="2 / 4" gridColumn="1">
        <RoomsSidebar />
      </Box>

      <Box gridRow="2" gridColumn="2" height={"100%"} overflowY={"auto"}>
        <ChatMessages />
      </Box>

      <Box gridRow="3" gridColumn="2">
        <MessageInput />
      </Box>
    </Grid>
  );
};
