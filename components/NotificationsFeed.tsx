import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotifications";
import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotification = [] } = useNotification(currentUser.id);

  //TODO : add notification after user like & user comment etc

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotification.length == 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notification
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {" "}
      {fetchedNotification.map((notification: Record<string, any>) => (
        <div
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
          key={notification.id}
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
