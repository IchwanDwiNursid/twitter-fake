import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Header showBackArrow={true} label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
