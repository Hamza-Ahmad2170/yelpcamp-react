import { useSession } from "@/hooks/useSession";
import { Navigate, useLocation } from "react-router";

function RequireAuth({ children }: React.PropsWithChildren) {
  const { isLoading, user, error } = useSession();
  const location = useLocation();
  console.log({ location });

  if (isLoading) return null; // or a spinner
  if (!user || error)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}
export default RequireAuth;
