document.documentElement.lang = "en";

async function loadPartial(targetId, filePath) {
  const target = document.getElementById(targetId);

  if (!target) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while loading ${filePath}`);
    }

    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    console.error(error);
    target.innerHTML = `
      <section class="py-5">
        <div class="container">
          <div class="info-card p-4">
            <h2 class="h4">Section unavailable</h2>
            <p>There was a problem loading <code>${filePath}</code>.</p>
          </div>
        </div>
      </section>
    `;
  }
}

async function loadSite() {
  const partials = [
    ['navbar', 'components/navbar.html'],
    ['hero', 'sections/hero.html'],
    ['about', 'sections/about.html'],
    ['experience', 'sections/experience.html'],
    ['projects', 'sections/projects.html'],
    ['skills', 'sections/skills.html'],
    ['education', 'sections/education.html'],
    ['contact', 'sections/contact.html'],
    ['footer', 'components/footer.html']
  ];

  for (const [targetId, filePath] of partials) {
    await loadPartial(targetId, filePath);
  }
}

window.addEventListener('DOMContentLoaded', loadSite);