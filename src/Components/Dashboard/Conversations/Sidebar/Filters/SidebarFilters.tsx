import React, { useState, useContext } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Menu, MenuItem } from "@mui/material";
import {
  SocketContext,
  TSocketContext,
} from "../../../../../Contexts/SocketContext";
import {
  DashboardContext,
  TDashbaordContext,
} from "../../../../../Contexts/DashbaordContext";

const SidebarFilters = ({
  sortBy,
  setSortBy,
  chatListLength,
}: {
  sortBy: string;
  setSortBy: (sory: string) => void;
  chatListLength?: number;
}) => {
  const [filter, setfilter] = useState("Open");
  const [filterAnchorEl, setFilterAnchorEl] = useState<
    HTMLElement | undefined
  >();
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | undefined>();

  const { darkMode } = useContext(DashboardContext) as TDashbaordContext;
  const { setFilteredChatList } = useContext(SocketContext) as TSocketContext;

  const filterOpen = Boolean(filterAnchorEl);
  const sortOpen = Boolean(sortAnchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === "filter")
      return setFilterAnchorEl(e.currentTarget);
    setSortAnchorEl(e.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(undefined);
    setSortAnchorEl(undefined);

    const { value, type } = e.currentTarget.dataset;
    if (!value) return;

    if (type === "sort") return setSortBy(value);
    setfilter(value);
    setFilteredChatList(value);
  };

  return (
    <section className="flex w-full justify-between px-4 py-2">
      <div className="flex cursor-pointer items-center gap-1 text-sm font-bold">
        <button
          id="filter"
          aria-controls={filterOpen ? "filter-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={filterOpen ? "true" : undefined}
          onClick={handleClick}
          className="flex items-center gap-1 text-sm font-bold capitalize"
        >
          <p className="">{chatListLength}</p>
          <p>{filter}</p>
          <ExpandMoreOutlinedIcon fontSize="small" />
        </button>
        <Menu
          id="filter-menu"
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "filter",
          }}
        >
          <MenuItem onClick={handleClose} data-value={"open"}>
            Open
          </MenuItem>
          <MenuItem onClick={handleClose} data-value={"close"}>
            Closed
          </MenuItem>
          {/* <MenuItem onClick={handleClose} data-value={"snooze"}>
            Snoozed
          </MenuItem> */}
        </Menu>
        {/* <p>Open</p>
        <TuneOutlinedIcon fontSize="small" /> */}
      </div>
      <div className="flex cursor-pointer items-center gap-1 text-sm font-bold">
        <button
          id="sort"
          aria-controls={sortOpen ? "sort-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={sortOpen ? "true" : undefined}
          onClick={handleClick}
          className="flex items-center gap-1 text-sm font-bold capitalize"
        >
          <p>{sortBy}</p>
          <ExpandMoreOutlinedIcon fontSize="small" />
        </button>
        <Menu
          id="sort-menu"
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "sort",
          }}
        >
          <MenuItem onClick={handleClose} data-type="sort" data-value={"new"}>
            New
          </MenuItem>
          <MenuItem onClick={handleClose} data-type="sort" data-value={"old"}>
            Old
          </MenuItem>
          {/* <MenuItem
            onClick={handleClose}
            data-type="sort"
            data-value={"waiting"}
          >
            Waiting
          </MenuItem> */}
        </Menu>
        {/* <p>Open</p>
        <TuneOutlinedIcon fontSize="small" /> */}
      </div>
    </section>
  );
};

export default SidebarFilters;
