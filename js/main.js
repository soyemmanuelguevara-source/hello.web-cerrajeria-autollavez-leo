const body = document.body;
body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader?.classList.add("hide");
    body.classList.remove("loading");
  }, 1700);
});

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mob-menu");

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 18);
});

hamburger?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const words = ["resuelta", "segura", "rápida", "precisa"];
const typingWord = document.getElementById("typing-word");
let wordIndex = 0;
setInterval(() => {
  if (!typingWord) return;
  wordIndex = (wordIndex + 1) % words.length;
  typingWord.style.opacity = "0";
  typingWord.style.transform = "translateY(8px)";
  setTimeout(() => {
    typingWord.textContent = words[wordIndex];
    typingWord.style.opacity = "1";
    typingWord.style.transform = "translateY(0)";
  }, 220);
}, 2200);

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.45 });

document.querySelectorAll(".stat-num").forEach((el) => countObserver.observe(el));

const form = document.getElementById("wa-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("f-name").value.trim();
  const interest = document.getElementById("f-interest").value;
  const message = document.getElementById("f-msg").value.trim();

  if (!name || !message) {
    form.classList.add("form-error");
    setTimeout(() => form.classList.remove("form-error"), 650);
    return;
  }

  const text = [
    "Hola, vi la página de Cerrajería Autollaves Leo.",
    `Mi nombre es: ${name}.`,
    `Necesito: ${interest}.`,
    `Detalle: ${message}.`
  ].join("\n");

  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

function particleCanvas(canvas, palette, count = 42) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dots = [];
  let width = 0;
  let height = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = Math.max(1, Math.floor(rect.width * window.devicePixelRatio));
    height = canvas.height = Math.max(1, Math.floor(rect.height * window.devicePixelRatio));
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    dots.length = 0;
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        size: Math.random() * 2 + .8,
        color: palette[i % palette.length]
      });
    }
  };

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    dots.forEach((dot, index) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0 || dot.x > rect.width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > rect.height) dot.vy *= -1;

      ctx.fillStyle = dot.color;
      ctx.globalAlpha = .72;
      ctx.fillRect(dot.x, dot.y, dot.size, dot.size);

      for (let j = index + 1; j < dots.length; j += 1) {
        const other = dots[j];
        const distance = Math.hypot(dot.x - other.x, dot.y - other.y);
        if (distance < 92) {
          ctx.globalAlpha = (1 - distance / 92) * .22;
          ctx.strokeStyle = dot.color;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
}

particleCanvas(document.getElementById("hero-canvas"), ["#50E3C2", "#4A90E2", "#FFFFFF"], 58);
document.querySelectorAll(".section-particles").forEach((canvas) => {
  particleCanvas(canvas, ["#50E3C2", "#4A90E2"], 34);
});

window.addEventListener("scroll", () => {
  const y = window.scrollY * 0.08;
  document.querySelectorAll(".fixed-bg").forEach((el) => {
    if (window.innerWidth > 760) el.style.backgroundPositionY = `${50 + y * 0.02}%`;
  });
});
