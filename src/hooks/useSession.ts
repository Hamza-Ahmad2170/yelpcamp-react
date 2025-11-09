import { use } from "react";
import { CurrentUserContext } from "@/contexts/SessionProvider";

const useSession = () => {
  const currentUserContext = use(CurrentUserContext);
  if (!currentUserContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return currentUserContext;
};

export { useSession };
