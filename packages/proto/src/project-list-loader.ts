import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";
import resetStyles from "./styles/reset.css.js";
import "./portfolio-project.js";

interface Project {
  _id?: string;
  projectTitle: string;
  projectLink: string;
  imgSrc?: string;
  description: string;
}

export class ProjectListLoaderElement extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      .loading-message,
      .error-message {
        padding: var(--spacing-medium);
        text-align: center;
      }
    `,
  ];

  @state()
  private _projects: Project[] = [];

  @state()
  private _isLoading = true;

  @state()
  private _error: string | null = null;

  @state()
  private _user: Auth.User | null = null;

  private _authObserver = new Observer<Auth.Model>(this, "portfolio:auth");

  private get authorization() {
    if (this._user && "token" in this._user) {
      return { Authorization: `Bearer ${this._user.token}` };
    }
    return {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      this._user = user || null;

      if (this._user?.authenticated) {
        this._fetchProjects("/api/projects");
      } else {
        this._projects = [];
      }
    });
  }

  async _fetchProjects(apiUrl: string) {
    this._isLoading = true;
    this._error = null;
    try {
      const options: RequestInit = {};
      const authHeaders = this.authorization;
      if (authHeaders.Authorization) {
        options.headers = authHeaders;
      }

      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        let errorText = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();
          errorText += ` - ${errorData}`;
        } catch (e) {}
        throw new Error(errorText);
      }

      const data = await response.json();
      this._projects = data as Project[];
    } catch (e) {
      console.error("Failed to load projects from API:", e);
      this._error = `Failed to load projects from API. ${
        e instanceof Error ? e.message : String(e)
      }`;
    } finally {
      this._isLoading = false;
    }
  }

  renderProject(project: Project) {
    return html`
      <portfolio-project
        project-title="${project.projectTitle}"
        project-link="${project.projectLink}"
        img-src="${project.imgSrc || ''}"
      >
        <span slot="description">${project.description}</span>
      </portfolio-project>
    `;
  }

  override render() {
    if (!this._user) {
      return html`<p class="loading-message">Authenticating...</p>`;
    }

    if (!this._user.authenticated) {
      return html`<p class="loading-message">Please log in to view projects.</p>`;
    }

    if (this._isLoading) {
      return html`<p class="loading-message">Loading projects...</p>`;
    }

    if (this._error) {
      return html`<p class="error-message">${this._error}</p>`;
    }

    if (this._projects.length === 0) {
      return html`<p class="loading-message">No projects found.</p>`;
    }

    return html`${this._projects.map((project) => this.renderProject(project))}`;
  }
}
