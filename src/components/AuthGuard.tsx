import useSession from "@/hooks/useSession";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

function AuthGuard({ children }: Props) {
  const { loading, user, error } = useSession();
  console.log({ loading });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error || !user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
export default AuthGuard;
