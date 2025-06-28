// Apply saved theme on load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const icon = document.getElementById("mode-icon");

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.src = "https://img.icons8.com/ios-glyphs/30/sun--v1.png";
        icon.alt = "Light Mode";
    } else {
        body.classList.remove('dark-mode');
        icon.src = "https://img.icons8.com/ios-glyphs/30/moon-symbol.png";
        icon.alt = "Dark Mode";
    }
});

// Toggle theme and save preference
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById("mode-icon");

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.src = "https://img.icons8.com/ios-glyphs/30/sun--v1.png";
        icon.alt = "Light Mode";
        localStorage.setItem('theme', 'dark');
    } else {
        icon.src = "https://img.icons8.com/ios-glyphs/30/moon-symbol.png";
        icon.alt = "Dark Mode";
        localStorage.setItem('theme', 'light');
    }
}
