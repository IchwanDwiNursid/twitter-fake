import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (loading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      isLoading(true);

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  }, [email, loginModal, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        disabled={loading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using twitter?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={loading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;
