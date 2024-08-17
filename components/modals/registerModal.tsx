import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, isLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (loading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      isLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });

      toast.success("Account created");

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      isLoading(false);
    }
  }, [email, name, password, registerModal, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
        Already have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
