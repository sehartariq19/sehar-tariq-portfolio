"use strict";
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const links = [...document.querySelectorAll('.nav-link')];
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';nav.classList.toggle('is-open',!open);toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(link=>{const active=link.getAttribute('href')==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-20% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
document.querySelector('#year').textContent=new Date().getFullYear();

// Lightweight, accessible section search (no external dependencies).
const searchToggle=document.querySelector('.search-toggle');
const searchPanel=document.querySelector('#site-search');
const searchInput=document.querySelector('#search-input');
const searchResults=document.querySelector('#search-results');
const searchableSections=[['Home','#home'],['About me','#about'],['Work experience','#experience'],['Academic projects','#projects'],['Skills and education','#skills'],['Contact and LinkedIn','#contact']];
function drawResults(){const query=searchInput.value.trim().toLowerCase();const matches=searchableSections.filter(([name])=>name.toLowerCase().includes(query));searchResults.replaceChildren();for(const [name,href] of matches){const a=document.createElement('a');a.href=href;a.textContent=name;a.addEventListener('click',closeSearch);searchResults.append(a);}if(!matches.length){const empty=document.createElement('span');empty.textContent='No sections found';searchResults.append(empty);}}
function closeSearch(){searchPanel.hidden=true;searchToggle.setAttribute('aria-expanded','false');}
searchToggle.addEventListener('click',()=>{const opening=searchPanel.hidden;searchPanel.hidden=!opening;searchToggle.setAttribute('aria-expanded',String(opening));if(opening){drawResults();searchInput.focus();}});
searchInput.addEventListener('input',drawResults);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!searchPanel.hidden){closeSearch();searchToggle.focus();}});
