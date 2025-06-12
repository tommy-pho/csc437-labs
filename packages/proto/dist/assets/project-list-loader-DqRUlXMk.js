import{r as p,i as g,O as b,x as i,b as _,c as k,n as h}from"./reset.css-DXFb3TfP.js";var j=Object.defineProperty,x=(a,t,r,c)=>{for(var e=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=o(t,r,e)||e);return e&&j(t,r,e),e};class y extends g{constructor(){super(...arguments),this.user=null,this._authObserver=new b(this,"portfolio:auth"),this.handleLogout=()=>{this.dispatchEvent(new CustomEvent("auth:signout",{bubbles:!0,composed:!0})),window.location.href="/login.html"}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{var r;this.user=t||null,!((r=this.user)!=null&&r.authenticated)&&window.location.pathname!=="/login.html"&&window.location.pathname!=="/register.html"&&(window.location.href="/login.html")})}render(){var t;return(t=this.user)!=null&&t.authenticated?i`
        <button @click=${this.handleLogout} style="position: fixed; top: 1rem; right: 1rem; z-index: 1000;">Logout</button>
        <slot></slot>
      `:i`<h1>Redirecting to login...</h1>`}}x([p()],y.prototype,"user");var $=Object.defineProperty,d=(a,t,r,c)=>{for(var e=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=o(t,r,e)||e);return e&&$(t,r,e),e};const f=class f extends g{constructor(){super(...arguments),this.projectTitle="Default Project Title",this.projectLink="#",this.imgSrc="",this.skills=[],this.artifacts=[]}render(){return i`
      ${this.imgSrc?i`
        <a href="${this.projectLink}" class="project-image-link">
          <img src="${this.imgSrc}" alt="Preview of ${this.projectTitle}">
        </a>
      `:""}
      <div class="project-text-content">
        <h3>
          <a href="${this.projectLink}">${this.projectTitle}</a>
        </h3>
        <div class="description-content">
          <slot name="description"></slot>
        </div>
        ${this.skills.length>0?i`
          <div class="skills-list">
            ${this.skills.map(t=>i`<span>${t}</span>`)}
          </div>
        `:""}
        ${this.artifacts.length>0?i`
          <div class="artifacts-list">
            ${this.artifacts.map(t=>i`<a href="${t.url}" target="_blank">${t.label}</a>`)}
          </div>
        `:""}
      </div>
    `}};f.styles=[_,k`
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

      .skills-list, .artifacts-list {
        margin-top: var(--spacing-small, 0.5rem);
        font-size: 0.8rem;
        color: var(--color-text-secondary);
      }

      .skills-list span, .artifacts-list a {
        display: inline-block;
        margin-right: var(--spacing-small, 0.5rem);
      }

      .artifacts-list a {
        color: var(--color-accent-link);
        text-decoration: none;
      }

      .artifacts-list a:hover {
        text-decoration: underline;
      }
    `];let n=f;d([h({type:String,attribute:"project-title"})],n.prototype,"projectTitle");d([h({type:String,attribute:"project-link"})],n.prototype,"projectLink");d([h({type:String,attribute:"img-src"})],n.prototype,"imgSrc");d([h({type:Array,attribute:"skills"})],n.prototype,"skills");d([h({type:Array,attribute:"artifacts"})],n.prototype,"artifacts");customElements.define("portfolio-project",n);var w=Object.defineProperty,u=(a,t,r,c)=>{for(var e=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=o(t,r,e)||e);return e&&w(t,r,e),e};const m=class m extends g{constructor(){super(...arguments),this._projects=[],this._isLoading=!0,this._error=null,this._user=null,this._authObserver=new b(this,"portfolio:auth")}get authorization(){return this._user&&"token"in this._user?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{var r;this._user=t||null,(r=this._user)!=null&&r.authenticated?this._fetchProjects("/api/projects"):this._projects=[]})}async _fetchProjects(t){this._isLoading=!0,this._error=null;try{const r={},c=this.authorization;c.Authorization&&(r.headers=c);const e=await fetch(t,r);if(!e.ok){let o=`HTTP error! status: ${e.status}`;try{const v=await e.text();o+=` - ${v}`}catch{}throw new Error(o)}const s=await e.json();this._projects=s}catch(r){console.error("Failed to load projects from API:",r),this._error=`Failed to load projects from API. ${r instanceof Error?r.message:String(r)}`}finally{this._isLoading=!1}}renderProject(t){const r=t._id?`project-detail.html?id=${t._id}`:"project-detail.html";return i`
      <portfolio-project
        project-title="${t.projectTitle}"
        project-link="${r}"
        img-src="${t.imgSrc||""}"
        .skills="${t.skills||[]}"
        .artifacts="${t.artifacts||[]}"
      >
        <span slot="description">${t.description}</span>
      </portfolio-project>
    `}render(){return this._user?this._user.authenticated?this._isLoading?i`<p class="loading-message">Loading projects...</p>`:this._error?i`<p class="error-message">${this._error}</p>`:this._projects.length===0?i`<p class="loading-message">No projects found.</p>`:i`${this._projects.map(t=>this.renderProject(t))}`:i`<p class="loading-message">Please log in to view projects.</p>`:i`<p class="loading-message">Authenticating...</p>`}};m.styles=[_,k`
      :host {
        display: block;
      }
      .loading-message,
      .error-message {
        padding: var(--spacing-medium);
        text-align: center;
      }
    `];let l=m;u([p()],l.prototype,"_projects");u([p()],l.prototype,"_isLoading");u([p()],l.prototype,"_error");u([p()],l.prototype,"_user");export{l as P,y as a,n as b};
