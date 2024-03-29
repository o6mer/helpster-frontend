import { Menu } from "@mui/material";
import React, { useContext, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "../../Chat/Chat";
import {
  SocketContextUser,
  TSocketContextUser,
} from "../../../Contexts/SocketContextUser";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const ChatButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { startNewChat } = useContext(SocketContextUser) as TSocketContextUser;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    startNewChat();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        type="button"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="fixed bottom-4 right-4 rounded-xl bg-darkPrimary p-2 text-white transition-all hover:scale-[1.04]"
      >
        {open ? (
          <KeyboardArrowDownOutlinedIcon fontSize="large" />
        ) : (
          <ChatIcon fontSize="large" />
        )}
      </button>
      <Menu
        sx={{
          translate: "-2rem -2rem",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Chat handleClose={handleClose} />
      </Menu>
    </>
  );
};

export default ChatButton;
