import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface IProps {
  content: string;
  username: string;
  timestamp: string;
  isUserMessage: boolean;
}

export const ChatMessage: FC<IProps> = ({
  content,
  username,
  timestamp,
  isUserMessage,
}) => {
  const bubbleBg = useColorModeValue("gray.100", "gray.700");
  const bubbleText = useColorModeValue("gray.800", "gray.200");

  const userBg = useColorModeValue("blue.500", "blue.400");
  const userText = useColorModeValue("white", "white");

  const tsColor = useColorModeValue("gray.500", "gray.400");
  const tsColorUser = useColorModeValue("white", "white");

  const formatted = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Flex
      direction="column"
      align={isUserMessage ? "flex-end" : "flex-start"}
      width={"80%"}
      mb={4}
    >
      {!isUserMessage && (
        <Text fontSize="sm" fontWeight="bold" mb={1}>
          {username}
        </Text>
      )}

      <Box
        bg={isUserMessage ? userBg : bubbleBg}
        color={isUserMessage ? userText : bubbleText}
        px={4}
        py={2}
        borderRadius="md"
        boxShadow="sm"
        wordBreak="break-word"
      >
        {content}

        <Text
          mt={1}
          fontSize="xs"
          color={isUserMessage ? tsColorUser : tsColor}
          textAlign={isUserMessage ? "right" : "left"}
        >
          {formatted}
        </Text>
      </Box>
    </Flex>
  );
};
