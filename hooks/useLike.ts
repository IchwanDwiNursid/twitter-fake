import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const loginModal = useLoginModal();

  const hasLike = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLike) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }, [
    currentUser,
    hasLike,
    loginModal,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
  ]);

  return {
    hasLike,
    toggleLike,
  };
};

export default useLike;
