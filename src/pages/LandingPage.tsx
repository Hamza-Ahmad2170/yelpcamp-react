import { Link } from "react-router";

function LandingPage() {
  return (
    <main className="h-dvh content-center space-y-8 bg-[url('./images/bg.png')] bg-cover bg-no-repeat text-center text-white">
      <h1 className="text-5xl font-bold md:text-7xl">
        Discover Your Next Adventure
      </h1>
      <p className="text-lg font-light md:text-2xl">
        Explore the best campgrounds recommended by fellow adventurers.
      </p>
      <Link
        to="/campgrounds"
        className="rounded-md bg-green-700 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-600"
      >
        View All Campgrounds
      </Link>
    </main>
  );
}
export default LandingPage;
