import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="border-b border-b-gray-300 bg-white shadow-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyApp
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
