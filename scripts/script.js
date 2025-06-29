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

//AOS init
AOS.init();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Dynamically set animation delays for each letter
  const letters = document.querySelectorAll('#preloader .letter');
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.15}s`;
  });

  // Delay before removing the preloader
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); // Wait for fade-out transition
  }, 2500); // Preloader visible for at least 2.5 seconds
});

  // Contact form submission (Prevent redirect)
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('https://portfolio-backend-6lrf.onrender.com/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          showPopup("✅ Message sent successfully!");
          form.reset();
        } else {
          showPopup("❌ Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error(error);
        showPopup("❌ Server error. Please try again later.");
      }
    });
  }
});

// Custom popup (non-alert)
function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#222";
  popup.style.color = "#fff";
  popup.style.padding = "12px 20px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  popup.style.zIndex = "9999";
  popup.style.fontFamily = "Poppins, sans-serif";
  popup.style.transition = "opacity 0.3s ease";

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 300);
  }, 4000);
}
