import { asset } from "../lib/assets.js";
import { icon } from "../components/icons.js";
import { brand } from "../components/brand.js";
export function auth(signup) {
  document.title = `${signup ? "Create an account" : "Sign In"} — ByteSpace`;
  return `<main id="main" class="auth-page blue-grid">
    <div class="auth-layout container">
      <section class="auth-intro">
        ${brand(true, true)}
        <h2>${signup ? "Sign up and come in" : "Sign in with ease"}</h2>
        <p>${signup ? "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost." : "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."}</p>
        <img class="auth-art" src="${asset("auth-art.svg")}" width="565" height="610" alt="ByteSpace courses and a community of happy students"/>
      </section>
      <section class="auth-panel ${signup ? "signup-panel" : ""}" aria-labelledby="auth-title">
        <p class="auth-eyebrow">${signup ? "Create an Account" : "Sign In"}</p>
        <h1 id="auth-title">${signup ? "Welcome to<br/>ByteSpace" : "Welcome Back"}</h1>
        <form class="auth-form" data-signup="${signup}">
          ${signup ? '<label>Full Name<input name="name" autocomplete="name" placeholder="Jamie Davis" required minlength="2"/></label>' : ""}
          <label>Email<input name="email" type="email" autocomplete="email" placeholder="designer@example.com" required/></label>
          <label>Password<span class="password-input"><input name="password" type="password" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="********" required minlength="8" title="Use at least 8 characters"/><button class="password-toggle icon-button" type="button" aria-label="Show password" aria-pressed="false">${icon("eye")}</button></span></label>
          <div class="auth-submit"><button class="button" type="submit">${signup ? "Continue" : "Sign In"}</button></div>
          <p class="auth-feedback" role="status"></p>
        </form>
        ${signup ? "" : '<div class="auth-divider"><span>or</span></div><div class="social-buttons"><button aria-label="Continue with Facebook" data-provider="Facebook"><span class="facebook">f</span></button><button aria-label="Continue with Google" data-provider="Google"><span>G</span></button></div>'}
        <p class="auth-switch">${signup ? 'Already have an account? <a href="/login">Login</a>' : 'New user? <a href="/signup">Create an account</a>'}</p>
      </section>
    </div>
  </main>`;
}
