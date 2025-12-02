import { FC } from "react";
import { Avatar, Menu, Portal } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

interface UserMenuProps {
  onLogout: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onLogout }) => {
  return (
    <Menu.Root positioning={{ placement: "right-end" }}>
      <Menu.Trigger rounded="full" focusRing="outside">
        <Avatar.Root size="sm">
          <FaUser />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="logout" onClick={onLogout}>
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default UserMenu;
