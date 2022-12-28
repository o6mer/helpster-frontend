import React, { useContext, useState } from "react";
import {
  SocketContext,
  TSocketContext,
} from "../../../../Contexts/SocketContext";
import { TConversation, TFollowUp } from "../../../../Types/Types";
import Controlls from "./Controlls";
import List from "./List";

const ConversationEditor = () => {
  const { conversations, createConversation, deleteConversation } = useContext(
    SocketContext
  ) as TSocketContext;

  return (
    <div className="w-full grow m-12 p-4 flex flex-col justify-between bg-white shadow-[0px_0px_25px_3px_rgba(0,0,0,0.07)] rounded-lg">
      <List
        conversations={conversations}
        deleteConversation={deleteConversation}
      />
      <Controlls
        conversations={conversations}
        createConversation={createConversation}
      />
    </div>
  );
};

export default ConversationEditor;
