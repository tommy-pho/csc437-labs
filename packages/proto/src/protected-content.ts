// packages/proto/src/protected-content.ts
import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

export class ProtectedContentElement extends LitElement {
  @state() private user: Auth.User | null = null;
  private _authObserver = new Observer<Auth.Model>(this, "portfolio:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      this.user = user || null;
      if (!this.user?.authenticated &&
          window.location.pathname !== "/login.html" &&
          window.location.pathname !== "/register.html") {
        window.location.href = "/login.html";
      }
    });
  }

  override render() {
    // Only render the slotted content if the user is authenticated
    if (this.user?.authenticated) {
      return html`
        <button @click=${this.handleLogout} style="position: fixed; top: 1rem; right: 1rem; z-index: 1000;">Logout</button>
        <slot></slot>
      `;
    } else {
      return html`<h1>Redirecting to login...</h1>`;
    }
  }

  private handleLogout = () => {
    // Dispatch the signout event to the Auth provider
    this.dispatchEvent(new CustomEvent("auth:signout", {
      bubbles: true,
      composed: true
    }));
    window.location.href = "/login.html";
  }
}