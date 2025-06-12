import{i as l,x as h,b as c,c as b,r as d,n as m}from"./reset.css-DXFb3TfP.js";var f=Object.defineProperty,a=(o,r,t,u)=>{for(var e=void 0,i=o.length-1,p;i>=0;i--)(p=o[i])&&(e=p(r,t,e)||e);return e&&f(r,t,e),e};const n=class n extends l{constructor(){super(...arguments),this.api="",this.redirect="",this.formData={username:"",password:""}}get canSubmit(){return this.formData.username&&this.formData.password}handleChange(r){const t=r.target;this.formData={...this.formData,[t.name]:t.value}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch(this.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status===200||t.status===201)return t.json();throw this.error=`Login/Register failed: ${t.statusText}`,new Error(this.error)}).then(({token:t})=>{const u={token:t,redirect:this.redirect},e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",u]});this.dispatchEvent(e)}).catch(t=>console.error("Submit error:",t))}render(){return h`
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
        ${this.error?h`<p class="error">${this.error}</p>`:""}
      </form>
    `}};n.styles=[c,b`/* Add form styles */`];let s=n;a([m({type:String})],s.prototype,"api");a([m({type:String})],s.prototype,"redirect");a([d()],s.prototype,"formData");a([d()],s.prototype,"error");export{s as L};
