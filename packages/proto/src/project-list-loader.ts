import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import resetStyles from "./styles/reset.css.js";
import "./portfolio-project.js";

interface Project {
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
      .loading-message, .error-message {
        padding: var(--spacing-medium);
        text-align: center;
      }
    `
  ];

  @property({ type: String })
  src?: string;

  @state()
  private _projects: Project[] = [];

  @state()
  private _isLoading = true;

  @state()
  private _error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this._fetchProjects(this.src);
    } else {
      this._error = "No data source specified for project list.";
      this._isLoading = false;
    }
  }

  async _fetchProjects(src: string) {
    this._isLoading = true;
    this._error = null;
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._projects = data as Project[];
    } catch (e) {
      console.error("Failed to load projects:", e);
      this._error = `Failed to load projects. ${e instanceof Error ? e.message : String(e)}`;
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
    if (this._isLoading) {
      return html`<p class="loading-message">Loading projects...</p>`;
    }

    if (this._error) {
      return html`<p class="error-message">${this._error}</p>`;
    }

    if (this._projects.length === 0) {
      return html`<p class="loading-message">No projects found.</p>`;
    }

    return html`
      ${this._projects.map(project => this.renderProject(project))}
    `;
  }
}
