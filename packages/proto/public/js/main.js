const themeCheckbox = document.getElementById('theme-checkbox');

function applyTheme() {
    if (themeCheckbox.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', applyTheme);
    applyTheme(); 
}

console.log('Theme switcher script loaded.'); 