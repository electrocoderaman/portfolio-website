
const hamburger = document.getElementById('hamburger');
const links = document.querySelector('.links');
hamburger.addEventListener('click', () => {
    links.classList.toggle('show');
});

document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', () => {
        links.classList.remove('show');
    });
});

document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('show');
    }
});


const el = document.getElementById('typing');
const words = ['Web Developer', 'Electrical Engg', 'C / C++ Coder', 'DSA Learner'];
let w = 0, c = 0, del = false;
function type() {
    const word = words[w % words.length];
    if (!del) {
        c++; el.textContent = word.slice(0, c);
        if (c === word.length) { del = true; setTimeout(type, 900); return; }
    } else {
        c--; el.textContent = word.slice(0, c);
        if (c === 0) { del = false; w++; }
    }
    setTimeout(type, del ? 45 : 80);
}
type();

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: .15 });
reveals.forEach(r => io.observe(r));

const cvs = document.getElementById('fx');
const ctx = cvs.getContext('2d');
let P = [];
function resize() { cvs.width = innerWidth; cvs.height = innerHeight; }
addEventListener('resize', resize); resize();
const N = 90; // number of particles
for (let i = 0; i < N; i++) {
    P.push({ x: Math.random() * cvs.width, y: Math.random() * cvs.height, r: Math.random() * 1.8 + 0.4, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2 });
}
function step() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // draw links
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const a = P[i], b = P[j];
            const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
            if (d < 120) {
                ctx.globalAlpha = 1 - d / 120;
                const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y); g.addColorStop(0, '#7cf8ff'); g.addColorStop(1, '#7a5cff');
                ctx.strokeStyle = g; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
    // draw points
    for (const p of P) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, 'rgba(124,248,255,.9)'); g.addColorStop(1, 'rgba(124,248,255,0)');
        ctx.fillStyle = g; ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cvs.width) p.vx *= -1;
        if (p.y < 0 || p.y > cvs.height) p.vy *= -1;
    }
    requestAnimationFrame(step);
}
step();
