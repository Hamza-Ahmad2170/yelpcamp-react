import { CurrentUserContext } from "@/contexts/SessionProvider";
import { useContext } from "react";

const useSession = () => {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return currentUserContext;
};

export { useSession };
