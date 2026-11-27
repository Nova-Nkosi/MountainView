// script.js
document.addEventListener('DOMContentLoaded',()=>{
const overlay=document.getElementById('overlay');
const menuBtn=document.getElementById('menuBtn');
const closeBtn=document.getElementById('closeBtn');
if(menuBtn&&overlay)menuBtn.onclick=()=>overlay.classList.add('open');
if(closeBtn&&overlay)closeBtn.onclick=()=>overlay.classList.remove('open');
if(overlay)overlay.querySelectorAll('a').forEach(a=>a.onclick=()=>overlay.classList.remove('open'));
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}})},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});