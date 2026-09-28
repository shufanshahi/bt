import { landing } from "../pages/home.js";
import { auth } from "../pages/auth.js";

export function renderRoute() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const isSignup = ["/signup", "/register"].includes(path);
  document.querySelector("#app").innerHTML =
    isSignup || path === "/login" ? auth(isSignup) : landing();
  return { isSignup };
}
