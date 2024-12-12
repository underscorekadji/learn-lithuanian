import { createBrowserRouter } from "react-router";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: null,
  },
]);

export default router;
