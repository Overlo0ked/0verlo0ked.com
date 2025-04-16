

  const writeups = [
    {
      title: "n0s4n1ty-1 Pico CTF",
      link: "https://medium.com/@mysticraganork66/n0s4n1ty-1-pico-ctf-13f26a68f9bf",
      tags: ["web"],
      description: "n0s4n1ty 1 Pico CTF",
      difficulty: "Beginner",
      date: "April 16, 2025",
      detailedDescription: "File upload sanity issue",
      featured: true
    },
    {
      title: "What CTFs Taught Me That College Didn’t",
      link: "https://medium.com/@mysticraganork66/what-ctfs-taught-me-that-college-didnt-93dd9ee86919",
      tags: ["Misc"],
      description: "What CTFs Taught Me That College Didn’t",
      difficulty: "Beginner",
      date: "April 10, 2025",
      detailedDescription: "and why I actually started getting it after leaving the syllabus behind",
      featured: true
    },
    {
      title: "Why Misconfigured Sudo Is a Hacker’s Playground",
      link: "https://medium.com/@mysticraganork66/why-misconfigured-sudo-is-a-hackers-playground-3e23ab15c889",
      tags: ["Linux"],
      description: "Exploiting & access.",
      difficulty: "Beginner",
      date: "March 28, 2025",
      detailedDescription: "goldmine of privilege escalation."
    },
    {
      title: "Embedding JavaScript in PDF Files: script2PDF",
      link: "https://medium.com/system-weakness/embedding-javascript-in-pdf-files-script2pdf-efba04cdf9be",
      tags: ["Exploit"],
      description: "script2PDF",
      difficulty: "Intermediate",
      date: "March 15, 2025",
      detailedDescription: "PDF files are widely used for document sharing, but did you know they can also execute JavaScript? "
    },
    {
      title: "Next.js: CVE-2025–29927 Tryhackme Write-up",
      link: "https://medium.com/@mysticraganork66/next-js-cve-2025-29927-tryhackme-write-up-8796a2cced24",
      tags: ["TryHackMe"],
      description: "CVE-2025–29927",
      difficulty: "Advanced",
      date: "February 22, 2025",
      detailedDescription: "Explore an authorisation bypass vulnerability in Next.js."
    }
  ];
  
  function renderWriteups(filtered = writeups) {
    const container = document.getElementById("writeupsList");
    container.innerHTML = "";
  
    filtered.forEach(writeup => {
      const card = document.createElement("article");
      card.className = "writeup-card";
      
      // Create HTML for tags
      const tagsHTML = writeup.tags.map(tag => 
        `<span class="tag">${tag}</span>`
      ).join('');
      
      card.innerHTML = `
        <h3><a href="${writeup.link}">${writeup.title}</a></h3>
        <p>${writeup.description}</p>
        <div class="writeup-tags">
          ${tagsHTML}
        </div>
        <a href="${writeup.link}" class="read-more">Read More →</a>
      `;
      
      container.appendChild(card);
    });
    
    // Render featured writeup if available
    renderFeaturedWriteup(filtered);
  }
  
  function renderFeaturedWriteup(filtered) {
    const featuredContainer = document.getElementById("featuredWriteup");
    
    // Find featured writeup or use the first one if none is marked as featured
    const featured = filtered.find(w => w.featured) || filtered[0];
    
    if (featured && filtered.length > 0) {
      // Create HTML for tags
      const tagsHTML = featured.tags.map(tag => 
        `<span class="tag">${tag}</span>`
      ).join('');
      
      featuredContainer.innerHTML = `
        <div class="featured-content">
          <h2>Latest Writeup: ${featured.title}</h2>
          <p>${featured.description}</p>
          <p>${featured.detailedDescription || ''}</p>
          <a href="${featured.link}" class="btn">Read Writeup</a>
        </div>
        <div class="featured-meta">
          <div class="writeup-tags">
            ${tagsHTML}
          </div>
          <p class="date">Published: ${featured.date}</p>
          <p class="difficulty">Difficulty: ${featured.difficulty}</p>
        </div>
      `;
      featuredContainer.style.display = "grid";
    } else {
      featuredContainer.style.display = "none";
    }
  }
  
  function filterWriteups() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filtered = writeups.filter(writeup => 
      writeup.title.toLowerCase().includes(searchValue) ||
      writeup.description.toLowerCase().includes(searchValue) ||
      writeup.tags.some(tag => tag.toLowerCase().includes(searchValue))
    );
    renderWriteups(filtered);
  }
  
  function filterByTag(tag) {
    const filtered = tag === "All" 
      ? writeups 
      : writeups.filter(writeup => writeup.tags.includes(tag));
    renderWriteups(filtered);
  }
  
  function setActiveButton(button) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
  }
  
  // Initialize the page when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    renderWriteups();
  });
