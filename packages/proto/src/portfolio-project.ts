import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import resetStyles from "./styles/reset.css.js"; 

export class PortfolioProjectElement extends LitElement {
  @property({ type: String, attribute: 'project-title' })
  projectTitle = 'Default Project Title';

  @property({ type: String, attribute: 'project-link' })
  projectLink = '#';
  
  @property({ type: String, attribute: 'img-src' })
  imgSrc = '';

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        gap: var(--spacing-medium, 1rem);
        background-color: var(--color-background-card, white);
        border-radius: var(--size-radius-medium, 8px);
        padding: var(--spacing-medium, 1rem);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
      }

      .project-image-link {
        flex-shrink: 0;
        width: 120px;
        height: 90px;
        display: block;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--size-radius-small, 4px);
      }

      .project-text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
      }

      h3 {
        margin-top: 0;
        margin-bottom: var(--spacing-small, 0.5rem);
        font-size: 1.1rem;
        line-height: 1.3;
        color: var(--color-text-default);
      }

      h3 a {
        color: var(--color-accent-link);
        text-decoration: none;
      }

      h3 a:hover {
        text-decoration: underline;
      }

      .description-content ::slotted(span), 
      .description-content ::slotted(p) {
        font-size: 0.9rem;
        color: var(--color-text-default);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];

  override render() {
    return html`
      ${this.imgSrc ? html`
        <a href="${this.projectLink}" class="project-image-link">
          <img src="${this.imgSrc}" alt="Preview of ${this.projectTitle}">
        </a>
      ` : ''}
      <div class="project-text-content">
        <h3>
          <a href="${this.projectLink}">${this.projectTitle}</a>
        </h3>
        <div class="description-content">
          <slot name="description"></slot>
        </div>
      </div>
    `;
  }
}
