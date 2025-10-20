import { App } from "@/app";
import { store } from "@/shared/redux/stores/stores";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import AuthInitializer from "./shared/redux/stores/authInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
