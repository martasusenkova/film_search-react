import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./ui/globalStyles";
import { store } from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { MovieHub } from "./MovieHub";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <MovieHub />
    </Provider>
  </>,
);
