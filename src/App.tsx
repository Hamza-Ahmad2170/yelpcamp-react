import { BrowserRouter, Route, Routes } from "react-router";
import { CampgroundsPage, LandingPage, Layout, LoginPage } from "@/pages";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { SessionProvider } from "@/contexts/SessionProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindIndicator />
      <ReactQueryDevtools />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route index element={<CampgroundsPage />} />
              <Route path=":id" element={<h1>dynamic</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
