/* ===== HEADER COMPACT ON SCROLL + HERO PARALLAX (unified) ===== */
const mainHeader = document.getElementById('mainHeader');
const heroSection = document.getElementById('hero');
const rows = document.querySelectorAll('.row');

window.addEventListener('scroll', ()=>{
  /* Header compact */
  if(window.scrollY > 60){ mainHeader.classList.add('compact'); }
  else{ mainHeader.classList.remove('compact'); }

  /* Hero parallax */
  const rect = heroSection.getBoundingClientRect();
  if(rect.bottom > 0){
    const p = -rect.top * 0.06;
    rows.forEach((row,i)=>{
      row.style.setProperty('--p', p*(i%2===0?1:-1));
    });
  }
}, {passive:true});

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
menuToggle.addEventListener('click', ()=>{
  mobileMenu.classList.add('open');
});
menuClose.addEventListener('click', ()=>{
  mobileMenu.classList.remove('open');
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
  mobileMenu.classList.remove('open');
  menuToggle.classList.remove('open');
}));

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ 
      entry.target.classList.add('is-visible'); 
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
},{threshold:.10});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('[data-lightbox]').forEach(item=>{
  item.addEventListener('click', ()=>{
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
  });
});
document.querySelector('.lightbox-close').addEventListener('click', ()=>lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });

/* ===== MANIFESTO PROGRESSIVE REVEAL ===== */
const words = document.querySelectorAll('#manifestoTitle .word');
const manifestoBody = document.querySelector('.manifesto-body');
const manifestoEl = document.querySelector('.manifesto');
if (manifestoEl) {
  const manifestoObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        words.forEach((w,i)=>{
          setTimeout(()=>w.classList.add('lit'), i*500);
        });
        if (manifestoBody) {
          setTimeout(()=>manifestoBody.classList.add('lit'), words.length * 500 + 350);
        }
        manifestoObserver.disconnect();
      }
    });
  },{threshold:.15});
  manifestoObserver.observe(manifestoEl);
}

