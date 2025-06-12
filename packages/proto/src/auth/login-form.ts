// packages/proto/src/auth/login-form.ts
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import resetStyles from "../styles/reset.css.js";

export class LoginFormElement extends LitElement {
  @property({ type: String }) api = "";
  @property({ type: String }) redirect = "";
  @state() private formData = { username: "", password: "" };
  @state() private error?: string;

  private get canSubmit() { return this.formData.username && this.formData.password; }

  private handleChange(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.formData = { ...this.formData, [target.name]: target.value };
  }

  private handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!this.canSubmit) return;

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData)
    })
    .then(res => {
      if (res.status === 200 || res.status === 201) return res.json();
      this.error = `Login/Register failed: ${res.statusText}`;
      throw new Error(this.error);
    })
    .then(({ token }) => {
      const detail = { token, redirect: this.redirect };
      const message = new CustomEvent("auth:message", { bubbles: true, composed: true, detail: ["auth/signin", detail] });
      this.dispatchEvent(message);
    })
    .catch(err => console.error("Submit error:", err));
  }

  override render() {
    return html`
      <form @change=${this.handleChange} @submit=${this.handleSubmit}>
        <label>
          <span>Username:</span>
          <input name="username" autocomplete="username" required>
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" autocomplete="current-password" required>
        </label>
        <button type="submit" ?disabled=${!this.canSubmit}>Submit</button>
        ${this.error ? html`<p class="error">${this.error}</p>` : ""}
      </form>
    `;
  }
  static styles = [resetStyles, css`/* Add form styles */`];
}