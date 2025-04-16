// Main JavaScript file with animations

// Text scramble effect for the title and role
class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#_____';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // Wait for DOM to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
  
    // Animation for the hero text (name)
    const nameElement = document.querySelector('.hero-text h2 span');
    if (nameElement) {
      const nameScramble = new TextScramble(nameElement);
      nameScramble.setText('ALWIN JOSHY');
    }
  
    // Animation for the role text with cycling roles
    const roleElement = document.querySelector('.hero-text h3 span');
    if (roleElement) {
      const roles = [
        'Ethical hacker',
        'Student',
        'Bug hunter',
        'Security researcher',
        'CTF player',
        'Cybersecurity enthusiast'
      ];
      
      const roleScramble = new TextScramble(roleElement);
      let counter = 0;
      
      const cycleRoles = () => {
        roleScramble.setText(roles[counter]).then(() => {
          setTimeout(() => {
            counter = (counter + 1) % roles.length;
            cycleRoles();
          }, 2000);
        });
      };
      
      cycleRoles();
    }
  
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });