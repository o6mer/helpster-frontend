import { TChat, TMessage } from "../../../../../Types/Types";
import ChatHeader from "./Header/ChatHeader";
import ChatKeyboard from "./Keyboard/ChatKeyboard";
import ChatMain from "./Main/ChatMain";
import Divider from "@mui/material/Divider";

const Chat = ({
  currentChatData,
  sendMessage,
  setChatStatus,
}: {
  currentChatData?: TChat;
  sendMessage: (msg: string) => void;
  setChatStatus: (status: string, id: string) => void;
}) => {
  return (
    <div className="h-full p-2 flex flex-col grow">
      <ChatHeader
        customerName={currentChatData?.customerName}
        chatStatus={currentChatData?.status}
        setChatStatus={setChatStatus}
      />
      <Divider />
      <ChatMain messages={currentChatData?.messages} />
      <ChatKeyboard sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
