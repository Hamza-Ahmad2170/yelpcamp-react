import { Link } from "react-router";
import Logo from "@/assets/icon/logo.svg?react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/form/LoginForm";
import { Skeleton } from "./ui/skeleton";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 min-h-16 content-center bg-white shadow-lg">
      <Container className="flex items-center justify-between">
        <nav>
          <Link to="/" className="flex items-center gap-2">
            <Logo className="text-forest-600 size-6" />
            <span className="text-forest-700 text-2xl font-bold">YelpCamp</span>
          </Link>
          <ul>
            <li>{/* links will be added here */}</li>
          </ul>
        </nav>
        <div className="flex gap-4">
          <LoginForm />
          {/* <Skeleton className="h-10 w-32 bg-gray-200" /> */}
        </div>
      </Container>
    </header>
  );
}

export default Navbar;

{
  /* <div className="space-x-4">
 <a
            className="text-forest-700 hover:text-forest-500 font-medium transition-colors"
            href="#"
          >
            Login
          </a> 
  <LoginForm />

  <Button
    className="h-auto rounded-lg px-4 py-2 text-base font-medium"
    variant="forest"
  >
    Sign Up
  </Button>
</div>; */
}
