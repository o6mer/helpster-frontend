import React from "react";
import { ControlPosition } from "react-draggable";

export type TUser = {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  id?: string;
  status?: string;
};

export type TMessage = {
  writer: string;
  time: Date | string;
  type: string;
  content?: any;
  children?: any;
};

export type TTextMessage = {
  writer: string;
  time: Date | string;
  content?: string;
};

export type TMultipleChoiseMessage = {
  writer: string;
  time: Date | string;
  content?: TConversation;
  [key: string]: any;
};

export type TInputMessage = {
  writer: string;
  time: Date | string;
  content?: any;
};

export type TChat = {
  id: string;
  customerName: string;
  status: string;
  isSeen: boolean;
  messages: Array<TMessage>;
  creationTime: Date | string;
  assignedAdmin: string;
};

export type TTemplate = {
  title: string;
  content?: string;
  id?: string;
};

export type TConversation = {
  id?: string;
  isFirst?: boolean;
  question: string;
  response: string;
  followUp: Array<TFollowUp>;
  position?: ControlPosition;
};

export type TFollowUp = {
  input: string;
  conversation: string;
};
