import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="354670740477-d6rrnuggs59qoskuuaja2r8nbpdtf068.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
