import Aos from "aos";
import "aos/dist/aos.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ResumeProvider } from "./pages/dashboard/rusumebuilder/resumeContext";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

Aos.init({
  duration: 1500,
  once: true,
});
const GOOGLE_CLIENT_ID =
  "60562972328-8kpco9n7i6eupnpjin578jtafb3jgdms.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {" "}
      <Provider store={store}>
        <ResumeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </ResumeProvider>
      </Provider>{" "}
    </GoogleOAuthProvider>
  </StrictMode>
);
