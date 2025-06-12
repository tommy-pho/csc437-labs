import{r as p,i as d,O as _,x as s,b,c as j,n as u}from"./reset.css-DXFb3TfP.js";var x=Object.defineProperty,w=(n,e,r,l)=>{for(var t=void 0,i=n.length-1,o;i>=0;i--)(o=n[i])&&(t=o(e,r,t)||t);return t&&x(e,r,t),t};class k extends d{constructor(){super(...arguments),this.user=null,this._authObserver=new _(this,"portfolio:auth"),this.handleLogout=()=>{this.dispatchEvent(new CustomEvent("auth:signout",{bubbles:!0,composed:!0})),window.location.href="/login.html"}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{var r;this.user=e||null,!((r=this.user)!=null&&r.authenticated)&&window.location.pathname!=="/login.html"&&window.location.pathname!=="/register.html"&&(window.location.href="/login.html")})}render(){var e;return(e=this.user)!=null&&e.authenticated?s`
        <button @click=${this.handleLogout} style="position: fixed; top: 1rem; right: 1rem; z-index: 1000;">Logout</button>
        <slot></slot>
      `:s`<h1>Redirecting to login...</h1>`}}w([p()],k.prototype,"user");var y=Object.defineProperty,g=(n,e,r,l)=>{for(var t=void 0,i=n.length-1,o;i>=0;i--)(o=n[i])&&(t=o(e,r,t)||t);return t&&y(e,r,t),t};const f=class f extends d{constructor(){super(...arguments),this.projectTitle="Default Project Title",this.projectLink="#",this.imgSrc=""}render(){return s`
      ${this.imgSrc?s`
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
      </div>
    `}};f.styles=[b,j`
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
    `];let a=f;g([u({type:String,attribute:"project-title"})],a.prototype,"projectTitle");g([u({type:String,attribute:"project-link"})],a.prototype,"projectLink");g([u({type:String,attribute:"img-src"})],a.prototype,"imgSrc");customElements.define("portfolio-project",a);var $=Object.defineProperty,h=(n,e,r,l)=>{for(var t=void 0,i=n.length-1,o;i>=0;i--)(o=n[i])&&(t=o(e,r,t)||t);return t&&$(e,r,t),t};const m=class m extends d{constructor(){super(...arguments),this._projects=[],this._isLoading=!0,this._error=null,this._user=null,this._authObserver=new _(this,"portfolio:auth")}get authorization(){return this._user&&"token"in this._user?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{var r;this._user=e||null,(r=this._user)!=null&&r.authenticated?this._fetchProjects("/api/projects"):this._projects=[]})}async _fetchProjects(e){this._isLoading=!0,this._error=null;try{const r={},l=this.authorization;l.Authorization&&(r.headers=l);const t=await fetch(e,r);if(!t.ok){let o=`HTTP error! status: ${t.status}`;try{const v=await t.text();o+=` - ${v}`}catch{}throw new Error(o)}const i=await t.json();this._projects=i}catch(r){console.error("Failed to load projects from API:",r),this._error=`Failed to load projects from API. ${r instanceof Error?r.message:String(r)}`}finally{this._isLoading=!1}}renderProject(e){return s`
      <portfolio-project
        project-title="${e.projectTitle}"
        project-link="${e.projectLink}"
        img-src="${e.imgSrc||""}"
      >
        <span slot="description">${e.description}</span>
      </portfolio-project>
    `}render(){return this._user?this._user.authenticated?this._isLoading?s`<p class="loading-message">Loading projects...</p>`:this._error?s`<p class="error-message">${this._error}</p>`:this._projects.length===0?s`<p class="loading-message">No projects found.</p>`:s`${this._projects.map(e=>this.renderProject(e))}`:s`<p class="loading-message">Please log in to view projects.</p>`:s`<p class="loading-message">Authenticating...</p>`}};m.styles=[b,j`
      :host {
        display: block;
      }
      .loading-message,
      .error-message {
        padding: var(--spacing-medium);
        text-align: center;
      }
    `];let c=m;h([p()],c.prototype,"_projects");h([p()],c.prototype,"_isLoading");h([p()],c.prototype,"_error");h([p()],c.prototype,"_user");export{c as P,k as a,a as b};
