import { notify } from "../components/dialog.js";
export function bindAuth(isSignup) {
  document
    .querySelector(".password-toggle")
    .addEventListener("click", (event) => {
      const button = event.currentTarget,
        input = button.previousElementSibling,
        show = input.type === "password";
      input.type = show ? "text" : "password";
      button.setAttribute(
        "aria-label",
        show ? "Hide password" : "Show password",
      );
      button.setAttribute("aria-pressed", String(show));
    });
  document
    .querySelectorAll("[data-provider]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        notify(
          `${button.dataset.provider} sign-in is not connected in this frontend demo.`,
        ),
      ),
    );
  document.querySelector(".auth-form").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector(".auth-feedback").textContent =
      `Your ${isSignup ? "signup" : "sign-in"} details are valid. This is a frontend demo; ${isSignup ? "no account has been created" : "authentication is not connected"}.`;
  });
}
