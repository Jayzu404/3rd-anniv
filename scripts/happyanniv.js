const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const btn = document.getElementById('startBtn');
  const msg = document.getElementById('message');

  // --- AUDIO SETUP ---
  const bgMusic = new Audio('assets/Enchanted.mp3');
  bgMusic.loop = true; // Makes the song repeat

  let width, height;
  let stars = [], particles = [], rockets = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }

  function initStars() {
    stars = [];
    const count = Math.min(width / 3, 140); 
    for (let i = 0; i < count; i++) {
      stars.push({ 
        x: Math.random() * width, 
        y: Math.random() * height, 
        s: Math.random() * 1.5 + 0.2, 
        phase: Math.random() * Math.PI * 2, 
        speed: 0.008 + Math.random() * 0.01 
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function drawRealisticMoon() {
    const mx = width * 0.82;
    const my = height * 0.15;
    const radius = 35;

    ctx.save();
    const atmosphere = ctx.createRadialGradient(mx, my, radius, mx, my, radius * 1.8);
    atmosphere.addColorStop(0, 'rgba(200, 220, 255, 0.12)');
    atmosphere.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = atmosphere;
    ctx.beginPath(); ctx.arc(mx, my, radius * 1.8, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#e6e6e6";
    ctx.beginPath(); ctx.arc(mx, my, radius, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    [[-8, -10, 8], [10, 5, 6], [-5, 12, 5], [5, -15, 4]].forEach(c => {
        ctx.beginPath();
        ctx.arc(mx + c[0], my + c[1], c[2], 0, Math.PI * 2);
        ctx.fill();
    });

    const shadow = ctx.createRadialGradient(mx - radius*0.3, my - radius*0.3, radius, mx, my, radius * 1.1);
    shadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
    shadow.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = shadow;
    ctx.beginPath(); ctx.arc(mx, my, radius, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  class ShootingStar {
    constructor() { this.active = false; }
    reset() {
        this.len = Math.random() * 100 + 80;
        this.speed = Math.random() * 5 + 5;
        const spawnEdge = Math.random();
        if(spawnEdge > 0.5) {
            this.x = width + this.len;
            this.y = Math.random() * (height * 0.4);
        } else {
            this.x = Math.random() * width + (width * 0.2);
            this.y = -this.len;
        }
    }
    trigger() {
        if (!this.active) {
            this.reset();
            this.active = true;
        }
    }
    update() {
        if (this.active) {
            this.x -= this.speed;
            this.y += this.speed * 0.4;
            if (this.x < -this.len || this.y > height + this.len) {
                this.active = false;
            }
        }
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.len, this.y - (this.len * 0.4));
        grad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - (this.len * 0.4));
        ctx.stroke();
        ctx.restore();
    }
  }

  const shootingStarManager = new ShootingStar();
  
  function scheduleShootingStar() {
    const nextTick = Math.random() * 2000 + 2000; 
    setTimeout(() => {
      shootingStarManager.trigger();
      scheduleShootingStar();
    }, nextTick);
  }

  class Rocket {
    constructor() {
      this.x = Math.random() * (width * 0.8) + (width * 0.1);
      this.y = height + 10;
      this.targetY = height * (0.2 + Math.random() * 0.3);
    }
    update() {
      let dist = this.y - this.targetY;
      this.y -= (dist * 0.008 + 0.8); 
      if (dist < 3) {
        createChrysanthemumHeart(this.x, this.y);
        return false;
      }
      return true;
    }
    draw() {
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#fff";
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, 1.5, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createChrysanthemumHeart(cx, cy) {
    const explosionScale = Math.random() * 2.0 + 0.8; // Random size factor
    const count = Math.floor(40 + (explosionScale * 40)); 
    const hue = Math.random() * 360;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const speed = (Math.random() * 0.15 + 0.5) * explosionScale;
      
      particles.push({
        x: cx, y: cy,
        vx: hx * speed * 0.08,
        vy: hy * speed * 0.08,
        a: 1,
        d: 0.0015 + Math.random() * 0.002, 
        color: `hsla(${hue}, 70%, 75%,`,
        history: []
      });
    }
  }

  function render() {
    ctx.fillStyle = '#010205'; 
    ctx.fillRect(0, 0, width, height);

    drawRealisticMoon();
    shootingStarManager.update();
    shootingStarManager.draw();

    stars.forEach(s => {
      s.phase += s.speed;
      ctx.globalAlpha = 0.2 + (Math.sin(s.phase) + 1) * 0.3;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2); ctx.fill();
    });
    
    ctx.globalAlpha = 1;
    rockets = rockets.filter(r => {
      if (r.update()) { r.draw(); return true; }
      return false;
    });

    ctx.globalCompositeOperation = 'lighter';
    particles = particles.filter(p => {
      p.history.push({x: p.x, y: p.y});
      if (p.history.length > 15) p.history.shift();
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.004; 
      p.vx *= 0.99; p.vy *= 0.99;
      p.a -= p.d;
      if (p.a > 0) {
        ctx.beginPath();
        ctx.strokeStyle = p.color + p.a + ")";
        ctx.lineWidth = p.a * 1.8; 
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for(let i = 1; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y);
        ctx.stroke();
        return true;
      }
      return false;
    });
    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(render);
  }

  // --- UPDATED CLICK HANDLER ---
  btn.onclick = () => {
    btn.style.display = 'none';
    msg.classList.add('show');
    
    // Play the song
    bgMusic.play().catch(error => console.log("Audio failed to load:", error));
    
    scheduleShootingStar();
    
    setInterval(() => {
      if (rockets.length < 1) {
        // Randomly launch 1 to 5 rockets
        const randomCount = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < randomCount; i++) {
          setTimeout(() => {
            rockets.push(new Rocket());
          }, i * 300);
        }
      }  
    }, 4500);
    
    rockets.push(new Rocket());
  };

  render();