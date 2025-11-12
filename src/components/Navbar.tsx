import { Link } from "react-router";
import Logo from "@/assets/icon/logo.svg?react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

import { Skeleton } from "./ui/skeleton";
import { useSession } from "@/hooks/useSession";
import type { User } from "@/types";

function Navbar() {
  const { user, isLoading } = useSession();
  return (
    <header className="sticky top-0 z-50 min-h-16 content-center bg-white shadow-lg">
      <Container className="flex items-center justify-between">
        <nav>
          <Link to="/" className="flex items-center gap-2" aria-label="Home">
            <Logo className="text-forest-600 size-6" />
            <span className="text-forest-700 text-2xl font-bold">YelpCamp</span>
          </Link>
          <ul>
            <li>{/* links will be added here */}</li>
          </ul>
        </nav>
        {isLoading ? (
          <Loading />
        ) : user ? (
          <UserInfo user={user} />
        ) : (
          <AuthButtons />
        )}
      </Container>
    </header>
  );
}

export default Navbar;

function UserInfo({ user }: { user: User }) {
  return (
    <div className="space-x-4">
      <span>
        {user?.firstName} {user?.lastName}
      </span>
      <Button
        className="h-auto rounded-lg px-4 py-2 text-base font-medium"
        variant="forest"
      >
        Logout
      </Button>
    </div>
  );
}

function AuthButtons() {
  return (
    <div className="space-x-4">
      <Link
        className="text-forest-700 hover:text-forest-500 font-medium transition-colors"
        to="/login"
      >
        Login
      </Link>

      <Button
        className="h-auto rounded-lg px-4 py-2 text-base font-medium"
        variant="forest"
        asChild
      >
        <Link to="/register">Sign Up</Link>
      </Button>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-16 bg-gray-200/70" />
      <Skeleton className="h-10 w-24 rounded-lg bg-gray-200/70" />
    </div>
  );
}
