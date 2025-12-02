// components/chat/RoomsSidebar.tsx
import React, { useEffect } from "react";
import { Box, VStack, HStack, Text, Badge, Spinner } from "@chakra-ui/react";
import { FiMessageSquare } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useRoomsStore } from "@/state/chat/useRoomsStore";
import { useChatStore } from "@/state/chat";

interface RoomsSidebarProps {
  mobile?: boolean;
}

export const RoomsSidebar: React.FC<RoomsSidebarProps> = () => {
  const { rooms, fetchRooms, selectedRoom, selectRoom, loading } =
    useRoomsStore();
  const {
    connect,
    disconnect,
    fetchRoomMessages,
    currentRoom,
    loading: messagesLoading,
  } = useChatStore();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const roomFromQuery = searchParams.get("room");

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRoomMessages(currentRoom);
    navigate(ROUTES.CHAT + `?room=${currentRoom}`, {
      replace: false,
    });
  }, [currentRoom]);

  useEffect(() => {
    if (rooms.length === 0) return;

    const roomToSelect =
      rooms.find((r) => r.name === roomFromQuery) || rooms[0];
    selectRoom(roomToSelect);
  }, [rooms, roomFromQuery, selectRoom]);

  useEffect(() => {
    if (selectedRoom && !messagesLoading) {
      disconnect();
      connect(String(selectedRoom.name));
    }
  }, [selectedRoom, messagesLoading]);

  const handleSelect = (room: { id: any; name: string }) => {
    selectRoom(room);
  };

  const SidebarContents = (
    <VStack align="stretch" gap={2} p={3}>
      <HStack justify="space-between" px={2}>
        <HStack>
          <FiMessageSquare />
          <Text fontWeight="semibold">Rooms</Text>
        </HStack>
      </HStack>

      <Box>
        {loading && (
          <HStack justify="center" py={4}>
            <Spinner size="sm" />
            <Text>Loading rooms…</Text>
          </HStack>
        )}

        {!loading && rooms.length === 0 && (
          <Box px={3} py={4}>
            <Text color="muted">No rooms yet.</Text>
          </Box>
        )}

        {!loading &&
          rooms.map((room) => {
            const isActive = selectedRoom?.id === room.id;
            return (
              <Box
                key={room.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(room)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(room);
                }}
                px={3}
                py={2}
                rounded="md"
                bg={isActive ? "gray.100" : "transparent"}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
              >
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? "semibold" : "normal"}
                  >
                    {room.name}
                  </Text>
                  {room.unread ? (
                    <Badge colorScheme="red" rounded="full">
                      {room.unread}
                    </Badge>
                  ) : null}
                </HStack>
              </Box>
            );
          })}
      </Box>
    </VStack>
  );

  return (
    <Box
      as="nav"
      w="240px"
      borderRight="1px solid"
      borderColor="gray.100"
      position="sticky"
      top="0"
      bg="white"
      overflowY="auto"
    >
      {SidebarContents}
    </Box>
  );
};

export default RoomsSidebar;
