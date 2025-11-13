import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { SessionProvider } from "@/contexts/SessionProvider";

import LandingPage from "@/pages/LandingPage";
import CampgroundsPage from "@/pages/CampgroundsPage";
import LoginPage from "@/pages/LoginPage";
import Layout from "@/pages/Layout";
import RegisterPage from "@/pages/RegisterPage";
import RequireAuth from "@/components/RequireAuth";

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
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="campgrounds">
                <Route index element={<CampgroundsPage />} />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <h1>protected</h1>
                    </RequireAuth>
                  }
                />
                <Route path=":id" element={<h1>dynamic</h1>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
