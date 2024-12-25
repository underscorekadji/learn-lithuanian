import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "./layouts/DefaultLayout";
import WordsPage from "./pages/WordsPage/WordsPage.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <WordsPage />,
      },
    ],
  },
]);

export default router;
