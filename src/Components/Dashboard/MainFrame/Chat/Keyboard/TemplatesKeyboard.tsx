import React, { useState, useEffect } from "react";
import { Menu } from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { TTemplate } from "../../../../../Types/Types";
import TemplateItem from "./TemplateItem";

const templateList = [
  {
    header: "template",
    content: "content content content content content ",
    id: "dasfsafadsdfs",
  },
  {
    header: "template2",
    content: "content2 content2 content2 content2 content2 ",
    id: "bxbzxbxbzx2",
  },
];

const TemplatesKeyboard = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filteredTemplateList, setFilteredTemplateList] =
    useState<Array<TTemplate>>(templateList);
  const [selectedTemplate, setSelectedTemplate] = useState<
    TTemplate | undefined
  >(filteredTemplateList[0]);
  const [search, setSearch] = useState<string>("");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitTemplate = () => {
    setMessage((prev) => `${prev || ""}${selectedTemplate?.content}`);
    handleClose();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget);
    e.stopPropagation();
    setSearch(e.currentTarget.value);
  };

  // useEffect(() => {
  //   //filter template list logic
  // }, [search]);

  return (
    <>
      <button
        type="button"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BookOutlinedIcon fontSize="small" />
      </button>
      <Menu
        sx={{ translate: "0 -2rem" }}
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
        <div className="w-96 flex flex-col p-2 gap-2">
          <input
            type="text"
            placeholder="Search template..."
            onKeyDown={(e: any) => {
              e.stopPropagation();
            }}
            value={search}
            onChange={handleSearch}
          />
          <div className="flex justify-between gap-2 ">
            <ul className="w-max flex flex-col">
              {filteredTemplateList?.map((template, index) => (
                <TemplateItem
                  {...template}
                  setSelectedTemplate={setSelectedTemplate}
                  submitTemplate={submitTemplate}
                  key={index + template.header}
                />
              ))}
            </ul>
            <div className="flex flex-wrap">{selectedTemplate?.content}</div>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default TemplatesKeyboard;
