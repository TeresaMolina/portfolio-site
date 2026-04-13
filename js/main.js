document.documentElement.lang = "en";
// fetch("projects.json")

async function loadPartial(targetId, filePath) {
      const target = document.getElementById(targetId);

      if (!target) return;

      try {
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading ${filePath}`);
        }

        const html = await response.text();
        target.outerHTML = html;
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
      document.documentElement.lang = 'en';

      const partials = [
        ['navbar-region', 'components/navbar.html'],
        ['hero-region', 'sections/hero.html'],
        ['about-region', 'sections/about.html'],
        ['experience-region', 'sections/experience.html'],
        ['projects-region', 'sections/projects.html'],
        ['skills-region', 'sections/skills.html'],
        ['education-region', 'sections/education.html'],
        ['contact-region', 'sections/contact.html'],
        ['footer-region', 'components/footer.html']
      ];

      for (const [targetId, filePath] of partials) {
        await loadPartial(targetId, filePath);
      }
    }

    window.addEventListener('DOMContentLoaded', loadSite);

// Load components
loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");

// Load sections
loadComponent("hero", "sections/hero.html");
loadComponent("about", "sections/about.html");
loadComponent("projects", "sections/projects.html");
loadComponent("skills", "sections/skills.html");
loadComponent("contact", "sections/contact.html");