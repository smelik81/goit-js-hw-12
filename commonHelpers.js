import{a as _,S,i as u}from"./assets/vendor-eded45c0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function m(s,t){try{const o="https://pixabay.com/api/",a="43587882-3fd012595c4df59010c013d1f",{data:e}=await _.get(o,{params:{key:a,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}});return e}catch(o){throw console.error("Error fetching data, please try again:",o),new Error(o.response.status)}}function y(s){return s.reduce((t,{webformatURL:o,largeImageURL:a,tags:e,likes:r,views:i,comments:b,downloads:L})=>t+=`
        <li class="gallery-item">
            <a class="gallery-link" href="${a}">
                <img class="gallery-img" src="${o}" alt="${e}" />
            </a>
            <div class="gallery-block">
                <p class="gallery-block__description"><span>likes</span>${r}</p>
                <p class="gallery-block__description"><span>views</span>${i}</p>
                <p class="gallery-block__description"><span>comments</span> ${b}</p>
                <p class="gallery-block__description"><span>downloads</span>${L}</p>
            </div>
        </li>
        `,"")}let f=new S(".gallery a",{sourceAttr:"href",captionsData:"alt",captionPosition:"bottom",captionDelay:250});const p=document.querySelector(".js__search-form"),h=document.querySelector(".js__list"),l=document.querySelector(".loader"),n=document.querySelector(".button__load-btn");let d,c=1,g=15;p.addEventListener("submit",w);n.addEventListener("click",P);async function w(s){s.preventDefault(),d=p.elements.picture.value.trim(),l.classList.remove(".hide"),h.innerHTML="";try{const t=await m(d,c);if(d){h.insertAdjacentHTML("beforeend",y(t.hits)),f.refresh();const o=Math.ceil(t.totalHits/g);c<o&&n.classList.replace("load-more-hidden","load-more")}else{u.error({title:"Error",message:"Sorry, your request is not correct. Please try again!"}),l.classList.add("hide");return}}catch{u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter",transitionIn:"bounceInUp",messageColor:"white",timeout:2e3}),l.classList.add("hide")}finally{l.classList.add("hide"),p.reset()}}async function P(){c+=1,n.disabled=!0;try{const s=await m(d,c),t=Math.ceil(s.totalHits/g);h.insertAdjacentHTML("beforeend",y(s.hits)),n.disabled=!1,f.refresh();const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:Math.round(o)*2,behavior:"smooth"}),c>=t&&(n.classList.replace("load-more","load-more-hidden"),u.show({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch{u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter",transitionIn:"bounceInUp",messageColor:"white",timeout:2e3})}}
//# sourceMappingURL=commonHelpers.js.map