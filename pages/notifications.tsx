import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Notifications = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!session) {
    router.push("/");
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
