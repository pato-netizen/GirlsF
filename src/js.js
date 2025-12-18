document.addEventListener("DOMContentLoaded", () => {

  const revealBtn = document.getElementById("revealBtn");
  const intro = document.getElementById("intro");
  const proposal = document.getElementById("proposal");
  const celebracion = document.getElementById("celebracion");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  proposal.classList.add("hidden");
  celebracion.classList.add("hidden");
  canvas.classList.add("hidden");

  /* REVELAR */
  revealBtn.addEventListener("click", () => {
    intro.classList.add("hidden");
    proposal.classList.remove("hidden");
  });

  /* NO (HUYE) */
  noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * 80 + "%";
    noBtn.style.left = Math.random() * 80 + "%";
  });

  /* SI */
  yesBtn.addEventListener("click", () => {
    proposal.classList.add("hidden");
    celebracion.classList.remove("hidden");
    canvas.classList.remove("hidden");
    iniciarFuegos();
  });

  // 💬 MENSAJES
  const mensajes = [
    "Te quiero infinitamente 💖",
    "Eres mi todo ✨",
    "Mi preciosa 💕",
    "Siempre juntos 🌷",
    "Mi niña hermosa 💞",
    "Mi persona favorita 💍"
  ];

  let particles = [];
  let texts = [];

  // 🔥 PARTÍCULAS
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 8;
      this.speedY = (Math.random() - 0.5) * 8;
      this.life = 100;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += 0.05; // gravedad
      this.life--;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // 💬 TEXTO FLOTANTE
  class FireText {
    constructor(text, x, y) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.opacity = 1;
    }

    update() {
      this.opacity -= 0.01;
      this.y -= 0.3;
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.font = "30px sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(this.text, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }

  // 🎆 EXPLOSIÓN
  function explode(x, y) {
    const color = `hsl(${Math.random() * 360},100%,70%)`;

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(x, y, color));
    }

    texts.push(
      new FireText(
        mensajes[Math.floor(Math.random() * mensajes.length)],
        x,
        y
      )
    );
  }

  // 🎇 ANIMACIÓN
  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.life <= 0) particles.splice(i, 1);
    });

    texts.forEach((t, i) => {
      t.update();
      t.draw();
      if (t.opacity <= 0) texts.splice(i, 1);
    });

    requestAnimationFrame(animateFireworks);
  }

  // 🚀 INICIAR
  function iniciarFuegos() {
    setInterval(() => {
      const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const y = Math.random() * canvas.height * 0.4 + 100;
      explode(x, y);
    }, 900);

    animateFireworks();
  }

});
