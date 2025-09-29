import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "@/layout/Layout";

import { TailwindIndicator } from "@/components/tailwind-indicator";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import { SessionProvider } from "@/contexts/AuthProvider";
import { queryClient } from "@/config/queryClient";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route
              path="protected"
              element={
                <AuthGuard>
                  <div>Protected</div>
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
        <TailwindIndicator />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
export default App;
