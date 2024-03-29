import { useEffect, useState } from "react";
import { TChat } from "../../../../../Types/Types";
import SidebarChatListItem from "./SidebarChatListItem";
import date from "date-and-time";

const SidebarChatsList = ({
  chatList,
  sortBy,
}: {
  chatList?: Array<TChat>;
  sortBy: string;
}) => {
  const [sortedList, setSortedList] = useState(sortList(chatList, sortBy));

  useEffect(() => {
    setSortedList(sortList(chatList, sortBy));
  }, [sortBy, chatList]);

  function sortList(
    list?: Array<TChat>,
    sortBy?: string
  ): Array<TChat> | undefined {
    if (sortBy === "new") {
      list?.sort((a, b) => {
        return (
          date
            .parse(b?.creationTime.toString(), "DD MM YYYY HH:mm:ss")
            .getTime() -
          date
            .parse(a?.creationTime.toString(), "DD MM YYYY HH:mm:ss")
            .getTime()
        );
      });
      return list;
    }
    if (sortBy === "old") {
      list?.sort((a, b) => {
        return (
          date
            .parse(a?.creationTime.toString(), "DD MM YYYY HH:mm:ss")
            .getTime() -
          date
            .parse(b?.creationTime.toString(), "DD MM YYYY HH:mm:ss")
            .getTime()
        );
      });
      return list;
    }
    return list;
  }

  return (
    <section className={`dashboard-scrollbar h-full w-full overflow-y-scroll `}>
      <ul className="flex h-full flex-col ">
        {sortedList?.length ? (
          sortedList?.map((chat, index) => {
            return <SidebarChatListItem {...chat} key={chat.id || index} />;
          })
        ) : (
          <p className="flex h-full w-full items-center justify-center">
            No new chats
          </p>
        )}
      </ul>
    </section>
  );
};

export default SidebarChatsList;
