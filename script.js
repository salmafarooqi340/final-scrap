// ============ Mobile nav (hamburger) ============
(function(){
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if(!toggle || !mobileNav) return;
  function closeMenu(){
    toggle.setAttribute('aria-expanded','false');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  function openMenu(){
    toggle.setAttribute('aria-expanded','true');
    mobileNav.classList.add('open');
    document.body.classList.add('menu-open');
  }
  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });
  mobileNav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });
})();

// ============ Scroll reveal ============
(function(){
  const revealEls = document.querySelectorAll('.reveal');
  if(!revealEls.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el=> io.observe(el));
})();

// ============ Count-up stats ============
(function(){
  const counters = document.querySelectorAll('.trust-item .num[data-count]');
  const trustBar = document.querySelector('.trust-bar');
  if(!counters.length || !trustBar) return;
  let counted = false;
  const countIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !counted){
        counted = true;
        counters.forEach(c=>{
          const target = parseInt(c.dataset.count, 10);
          const dur = 1400; const start = performance.now();
          function tick(now){
            const p = Math.min((now-start)/dur, 1);
            const eased = 1 - Math.pow(1-p, 3);
            c.textContent = Math.round(eased * target);
            if(p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
    });
  }, { threshold: 0.4 });
  countIO.observe(trustBar);
})();

// ============ Hero 3D parallax on mouse move ============
(function(){
  const stage = document.getElementById('heroStage');
  const inner = document.getElementById('stageInner');
  if(!stage || !inner) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;
  if(window.matchMedia('(hover: hover)').matches){
    stage.addEventListener('mousemove', (e)=>{
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      inner.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
    });
    stage.addEventListener('mouseleave', ()=>{ inner.style.transform = 'rotateY(0) rotateX(0)'; });
  }
})();

// ============ Process line fill on scroll into view ============
(function(){
  const processTrack = document.querySelector('.process-track');
  const lineFill = document.getElementById('processLine');
  if(!processTrack || !lineFill) return;
  const procIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ lineFill.style.width = '88%'; procIO.unobserve(e.target); } });
  }, { threshold: 0.3 });
  procIO.observe(processTrack);
})();

// ============ Testimonial carousel ============
(function(){
  const testis = document.querySelectorAll('.testi-card');
  const dots = document.querySelectorAll('.testi-dots button');
  if(!testis.length) return;
  let current = 0;
  let autoTimer = null;
  function showTesti(i){
    testis.forEach((t, idx)=>{ t.style.display = idx===i ? 'block' : 'none'; });
    dots.forEach((d, idx)=> d.classList.toggle('active', idx===i));
    current = i;
  }
  dots.forEach(d=> d.addEventListener('click', ()=>{
    showTesti(parseInt(d.dataset.i,10));
    resetAuto();
  }));
  function resetAuto(){
    if(autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(()=>{ showTesti((current+1) % testis.length); }, 5500);
  }
  resetAuto();
})();

// ============ Blog: category filter ============
(function(){
  const buttons = document.querySelectorAll('.blog-filter-bar button');
  const cards = document.querySelectorAll('.blog-card');
  if(!buttons.length || !cards.length) return;
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(card=>{
        const show = cat === 'all' || card.dataset.cat === cat;
        card.hidden = !show;
      });
    });
  });
})();

// ============ Blog: search filter ============
(function(){
  const input = document.getElementById('blogSearch');
  const cards = document.querySelectorAll('.blog-card');
  if(!input || !cards.length) return;
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    cards.forEach(card=>{
      const text = card.textContent.toLowerCase();
      card.hidden = q.length > 0 && !text.includes(q);
    });
  });
})();

// ============ FAQ accordion (article pages) ============
(function(){
  const items = document.querySelectorAll('.faq-item h3');
  items.forEach(h=>{
    const p = h.nextElementSibling;
    if(!p) return;
    h.addEventListener('click', ()=>{
      const isOpen = p.style.display !== 'none';
      p.style.display = isOpen ? 'none' : 'block';
    });
  });
})();
