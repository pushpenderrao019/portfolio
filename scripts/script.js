console.log("Script loaded");

// === DARK MODE ===
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");

  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const icon = document.getElementById("mode-icon");

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (icon) {
      icon.src = "https://img.icons8.com/ios-glyphs/30/sun--v1.png";
      icon.alt = "Light Mode";
    }
  } else {
    body.classList.remove('dark-mode');
    if (icon) {
      icon.src = "https://img.icons8.com/ios-glyphs/30/moon-symbol.png";
      icon.alt = "Dark Mode";
    }
  }

  // === CONTACT FORM ===
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');

  if (form && responseDiv) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      try {
        const res = await fetch('https://portfolio-backend-6lrf.onrender.com/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        if (result.success) {
          responseDiv.innerText = "✅ Message sent successfully!";
          form.reset();
        } else {
          responseDiv.innerText = "❌ Failed to send message. Try again.";
        }
      } catch (error) {
        console.error("Error sending message:", error);
        responseDiv.innerText = "❌ An error occurred. Please try again later.";
      }
    });
  } else {
    console.warn("Form or responseDiv not found");
  }
});

// === DARK MODE TOGGLE ===
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

// === PRELOADER ===
window.addEventListener("load", () => {
  console.log("Window loaded");

  const preloader = document.getElementById("preloader");
  const letters = document.querySelectorAll('#preloader .letter');

  if (letters.length === 0) {
    console.warn("No letters found inside #preloader");
  }

  letters.forEach((letter, index) => {
    letter.style.opacity = 0;
    letter.style.animation = "fade-in 0.5s ease forwards";
    letter.style.animationDelay = `${index * 0.15}s`;
  });

  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
        console.log("Preloader removed");
      }, 500);
    } else {
      console.warn("Preloader not found");
    }
  }, 2500);
});

// === AOS ===
try {
  AOS.init();
} catch (error) {
  console.warn("AOS failed to initialize:", error);
}
