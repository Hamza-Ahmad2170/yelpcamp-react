import { SessionContext } from "@/contexts/AuthProvider";
import { use } from "react";

function useSession() {
  const context = use(SessionContext);
  if (!context) {
    throw Error("useSession must be used within an SessionProvider");
  }
  return context;
}

export default useSession;
