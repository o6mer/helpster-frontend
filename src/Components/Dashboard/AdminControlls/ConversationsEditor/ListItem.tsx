import { useContext, useRef, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import { TConversation, TFollowUp } from "../../../../Types/Types";
import {
  SocketContext,
  TSocketContext,
} from "../../../../Contexts/SocketContext";
import ListItemEditMode from "./ListItemEditMode";
import Draggable, { ControlPosition } from "react-draggable";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import {
  DashboardContext,
  TDashbaordContext,
} from "../../../../Contexts/DashbaordContext";
const ListItem = ({
  conversation,
  conversations,
}: {
  conversation: TConversation;
  conversations: Array<TConversation>;
}) => {
  const [isHover, setIsHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { darkMode } = useContext(DashboardContext) as TDashbaordContext;
  const { updateConversation, deleteConversation } = useContext(
    SocketContext
  ) as TSocketContext;

  const nodeRef = useRef(null);

  const onEditClicked = () => {
    setEditMode(true);
  };

  const onDeleteClicked = () => {
    deleteConversation(conversation.id);
  };

  const savePosition = (e: any, position: any) => {
    const { x, y } = position;

    const updated = conversation;
    updated.position = { x, y };
    updateConversation(updated);
  };

  return (
    <Draggable
      bounds="parent"
      onStop={savePosition}
      defaultPosition={conversation.position}
      handle="strong"
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className={`absolute flex h-min max-w-md flex-col flex-wrap rounded-lg p-8 shadow-lg  transition-all  ${
          darkMode ? "bg-darkSecondary text-white" : "bg-secondary text-black"
        }  w-fit ${
          conversation.id === "main" && "border  border-solid border-secondary"
        }`}
        onMouseEnter={() => !editMode && setIsHover(true)}
        onMouseLeave={() => !editMode && setIsHover(false)}
      >
        <strong
          className="absolute top-0 left-[50%] rotate-90 cursor-move"
          ref={nodeRef}
        >
          <DragIndicatorOutlinedIcon />
        </strong>

        {editMode ? (
          <ListItemEditMode
            conversation={conversation}
            conversations={conversations}
            setEditMode={setEditMode}
            updateConversation={updateConversation}
          />
        ) : (
          <>
            <div>
              <p>Question: {conversation.question}</p>
              <p>Response: {conversation.response}</p>
              <ul className="flex list-disc flex-col ">
                {conversation.followUp.length ? (
                  conversation.followUp.map((followUp, index) => {
                    return (
                      <li
                        key={"edit_follow-up" + conversation.id + index}
                        className={`${
                          followUp.conversation === "defualt" && "text-red-500"
                        }`}
                      >
                        <p>
                          {followUp.input || "No title"}{" "}
                          {followUp.conversation === "defualt" &&
                            "No follow-up selected"}
                        </p>
                      </li>
                    );
                  })
                ) : (
                  <p>No follow-up questions</p>
                )}
              </ul>
            </div>

            {isHover && (
              <div
                className={`${
                  isHover ? "opacity-100" : "opacity-0"
                } absolute top-2 right-2 h-max justify-end  transition-all `}
              >
                <Tooltip title="Edit" arrow>
                  <button
                    className="fill-white transition-all hover:text-gray-700"
                    onClick={onEditClicked}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                  <button
                    className="fill-white transition-all hover:text-gray-700"
                    onClick={onDeleteClicked}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </Tooltip>
              </div>
            )}
          </>
        )}
      </div>
    </Draggable>
  );
};

export default ListItem;
