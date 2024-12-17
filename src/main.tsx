import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { Flowbite } from "flowbite-react";

import router from "./routes";
import theme from "./theme/DefaultTheme";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <RouterProvider router={router} />
    </Flowbite>
  </StrictMode>
);
