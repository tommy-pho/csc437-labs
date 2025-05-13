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
