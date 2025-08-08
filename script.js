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

//   // Simple visitor counter using localStorage
// function updateLocalVisitorCount() {
//     let count = localStorage.getItem('visitorCount');
    
//     if (count === null) {
//         count = 1;
//     } else {
//         count = parseInt(count) + 1;
//     }
    
//     localStorage.setItem('visitorCount', count);
//     document.getElementById('visitorCount').textContent = count;
// }

// window.addEventListener('DOMContentLoaded', updateLocalVisitorCount);

// //

const countElement = document.getElementById("visitorCount");
const apiKey = "my-cool-website-counter";

const apiUrl = `https://api.countapi.xyz/hit/intakhab/${apiKey}`;

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    countElement.textContent = data.value;
})
.catch(error => {
    console.error("Error fetching visitor count:", error);
    countElement.textContent = "N/A";
});
