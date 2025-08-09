const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu(){
    sideMenu.style.transform = 'translateX(-16rem)';
}
function closeMenu(){
    sideMenu.style.transform = 'translateX(16rem)';
}

window.addEventListener('scroll', ()=>{
    if(scrollY > 50){
        navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', "dark:bg-transparent");
    }else{
        navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', "dark:bg-transparent");
    }
})

// -------- light mode and dark mode -----------

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  function toggleTheme(){
    document.documentElement.classList.toggle('dark');

    if(document.documentElement.classList.contains('light')){
        localStorage.theme = 'light';
    }else{
        localStorage.theme = 'dark';
    }
  }

//   visitor count
// Visitor count
(function initVisitorCounter() {
  function run() {
    updateCounter().catch(console.error);
  }

  if (document.readyState !== 'loading') {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }

  async function updateCounter() {
    const el = document.getElementById('visitorCount');
    if (!el) return; // element not present; nothing to update

    try {
      const response = await fetch('https://intakhab.vercel.app/api/counter', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Invalid content type: ${contentType}. Body: ${text}`);
      }

      const data = await response.json(); // parses JSON body[20]
      el.textContent = typeof data.count === 'number' ? data.count : '0';
    } catch (err) {
      console.error('Counter fetch failed, using localStorage fallback:', err);
      let count = parseInt(localStorage.getItem('visitorCount') || '0', 10);
      count += 1;
      localStorage.setItem('visitorCount', String(count));
      el.textContent = String(count);
    }
  }
})();
