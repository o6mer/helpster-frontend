import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CustomerContext, TCustomerContext } from "../Contexts/CustomerContext";
import { TFollowUp, TMessage } from "../Types/Types";

export const useSocketUser = (socket: Socket) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messagesList, setMessagesList] = useState<TMessage[]>([]);

  const { chatId, setChatId } = useContext(CustomerContext) as TCustomerContext;

  useEffect(() => {
    socket?.on("connect", () => {
      setIsConnected(true);
      socket.emit("newUserConnection", onNewUserConnection);
    });
    socket?.on(
      "receiveMessage",
      ({ message, id }: { message: TMessage; id: string }) => {
        console.log(message);

        addMessage(message);
      }
    );
    socket?.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("disconnect");
    };
  }, []);

  const onNewUserConnection = (chatId: string) => {
    setChatId(chatId);
    console.log("connected");
  };

  const chooseFollowUp = (followUp: TFollowUp) => {
    sendMessage(followUp.input);
    getResponse(followUp.conversation);
  };

  const getResponse = (conversationId: string) => {
    socket.emit("getResponse", { conversationId, chatId });
  };

  const sendMessage = (messageContent: string) => {
    if (!isConnected) return;
    socket.emit(
      "sendMessage",
      {
        id: chatId,
        messageContent,
      },
      addMessage
    );
  };

  const addMessage = (message: TMessage): void => {
    setMessagesList((prev) => [...prev, message]);
  };

  return {
    socket,
    isConnected,
    messagesList,
    sendMessage,
    chooseFollowUp,
  };
};
