// involves an event listener on the checkbox that dispatches a new, custom event

const themeCheckbox = document.getElementById('theme-checkbox');
const themeSwitchLabel = document.querySelector('.theme-switch');

if (themeSwitchLabel) {
    themeSwitchLabel.addEventListener('change', function(event) {
        event.stopPropagation(); 

        const isChecked = event.target.checked;

        const themeChangeEvent = new CustomEvent('theme:toggle', {
            bubbles: true,
            detail: { isDarkMode: isChecked }
        });
        event.target.dispatchEvent(themeChangeEvent);
        console.log('Dispatched theme:toggle event:', { isDarkMode: isChecked });
    });
}

document.body.addEventListener('theme:toggle', function(event) {
    console.log('Caught theme:toggle event on body, detail:', event.detail);
    if (event.detail && event.detail.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

function loadThemePreference() {
    if (themeCheckbox && themeCheckbox.checked) {
         document.body.classList.add('dark-mode');
    } else {
         document.body.classList.remove('dark-mode');
    }
}

if(themeCheckbox) {
    loadThemePreference(); 
}

console.log('Theme switcher (custom event version) script loaded.');

// Project Detail Dynamic Loader
if (window.location.pathname.endsWith('project-detail.html')) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    fetch(`/api/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('mu:auth:jwt') || ''}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch project');
        return res.json();
      })
      .then(project => {
        if (project) {
          document.querySelector('h1').textContent = `Project: ${project.projectTitle}`;
          document.querySelector('.project-description p').textContent = project.description;
          // Populate skills
          const skillsList = document.getElementById('skills-list');
          if (skillsList) {
            skillsList.innerHTML = '';
            if (Array.isArray(project.skills) && project.skills.length > 0) {
              project.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
              });
            } else {
              const li = document.createElement('li');
              li.textContent = 'No skills listed.';
              skillsList.appendChild(li);
            }
          }
          // Populate artifacts
          const artifactsList = document.getElementById('artifacts-list');
          if (artifactsList) {
            artifactsList.innerHTML = '';
            if (Array.isArray(project.artifacts) && project.artifacts.length > 0) {
              project.artifacts.forEach(artifact => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = artifact.url;
                a.target = '_blank';
                a.textContent = artifact.label;
                li.appendChild(a);
                artifactsList.appendChild(li);
              });
            } else {
              const li = document.createElement('li');
              li.textContent = 'No artifacts listed.';
              artifactsList.appendChild(li);
            }
          }
        }
      })
      .catch(err => {
        document.querySelector('.project-description p').textContent = 'Failed to load project details.';
      });
  } else {
    document.querySelector('.project-description p').textContent = 'No project specified.';
  }
}
