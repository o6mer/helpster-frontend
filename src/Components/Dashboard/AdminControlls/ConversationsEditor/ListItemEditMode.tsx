import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { TConversation, TFollowUp } from "../../../../Types/Types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DashboardContext,
  TDashbaordContext,
} from "../../../../Contexts/DashbaordContext";

const ListItemEditMode = ({
  conversation,
  conversations,
  setEditMode,
  updateConversation,
}: {
  conversation: TConversation;
  conversations: Array<TConversation>;
  setEditMode: (mode: boolean) => void;
  updateConversation: (conversation: TConversation) => void;
}) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(conversation.question);
  const [updatedResponse, setUpdatedResponse] = useState(conversation.response);
  const [updatedFollowUps, setUpdatedFollowUps] = useState<Array<TFollowUp>>(
    conversation.followUp
  );

  const { darkMode } = useContext(DashboardContext) as TDashbaordContext;

  const onSaveClicked = () => {
    const updatedConversation: TConversation = {
      id: conversation.id,
      question: updatedQuestion,
      response: updatedResponse,
      followUp: updatedFollowUps,
    };
    updateConversation(updatedConversation);
    setEditMode(false);
  };

  const onCancelClicked = () => {
    setUpdatedQuestion("");
    setUpdatedResponse("");
    setUpdatedFollowUps([]);
    setEditMode(false);
  };

  const onAddFollowUpClicked = () => {
    setUpdatedFollowUps((prev) => {
      return [...prev, { input: "", conversation: "defualt" }];
    });
  };

  const onFollowUpDeleteClicked = (index: number) => {
    setUpdatedFollowUps((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  return (
    <>
      <div
        className={`flex flex-col w-min gap-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <input
          placeholder="Question..."
          type="text"
          value={updatedQuestion}
          className=" border-secondary border border-solid"
          onChange={(e) => setUpdatedQuestion(e.currentTarget.value)}
        />
        <input
          placeholder="Response..."
          type="text"
          value={updatedResponse}
          className="border-secondary border border-solid"
          onChange={(e) => setUpdatedResponse(e.currentTarget.value)}
        />
        {updatedFollowUps.map((followUp, index) => (
          <div
            className="w-full flex gap-2"
            key={"edit_follow-up" + conversation.id + index}
          >
            <input
              placeholder="Follow-up title..."
              type="text"
              value={followUp.input}
              className="border-secondary border border-solid grow"
              onChange={(e) => {
                const value = e.currentTarget.value;
                setUpdatedFollowUps((prev) => {
                  prev[index].input = value;
                  return [...prev];
                });
              }}
            />
            <select
              className="text-black"
              value={followUp.conversation}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setUpdatedFollowUps((prev) => {
                  prev[index].conversation = value;
                  return [...prev];
                });
              }}
            >
              <option value={"defualt"} disabled>
                Select Conversation
              </option>
              {conversations.map((conversation) => {
                if (!conversation.question) return null;
                return (
                  <option
                    className="text-black"
                    value={conversation.id}
                    key={`option-${conversation.id}`}
                  >
                    {conversation.question}
                  </option>
                );
              })}
            </select>
            <Tooltip title="Delete" arrow>
              <button
                onClick={() => onFollowUpDeleteClicked(index)}
                className={`${
                  darkMode ? "hover:text-third" : "hover:text-gray-700"
                } transition-all`}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </button>
            </Tooltip>
          </div>
        ))}
        <div className="flex w-full justify-center items-center ">
          <Tooltip title="Add Follow-up" arrow>
            <button
              onClick={onAddFollowUpClicked}
              className={`border-secondary border border-solid w-max p-1 rounded-lg flex justify-center items-center ${
                darkMode ? "hover:bg-darkThird" : "hover:bg-secondary"
              }  transition-all`}
            >
              <AddOutlinedIcon fontSize="small" />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className={`flex gap-1 absolute bottom-2 right-2 transition-all  `}>
        <Tooltip title="Cancel" arrow>
          <button
            className={`gap-1 flex items-center text-sm transition-all ${
              darkMode
                ? "bg-darkPrimary hover:bg-darkSecondary"
                : "bg-primary hover:bg-third"
            }  border px-1 py-1 rounded-lg`}
            onClick={onCancelClicked}
          >
            <CloseOutlinedIcon fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip title="Save" arrow>
          <button
            onClick={onSaveClicked}
            className="gap-1 flex items-center text-sm transition-all bg-green-600 hover:bg-green-500 px-1 py-1 rounded-lg text-white"
          >
            <SaveAltOutlinedIcon fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default ListItemEditMode;
