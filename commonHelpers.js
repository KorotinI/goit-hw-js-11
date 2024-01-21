import{S as l,i as c}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u="41942855-48a43e8a3131b9e330700a0c4",p="https://pixabay.com/api/",d=document.querySelector(".form-inline"),a=document.querySelector(".card-container");d.addEventListener("submit",g);const f=new l(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function m(){a.innerHTML="<p>Loading images, please wait...</p>"}function h(){const i=a.querySelector(".loading");i&&i.remove()}function g(i){i.preventDefault();const n=i.currentTarget,r=n.elements.picture.value.trim();if(r===""||r==null){c.error({message:"❌Please, input your request!"}),a.innerHTML="";return}m(),y(r).then(s=>{if(s.hits&&s.hits.length>0){const e=s.hits;let t="";for(const o of e)t+=L(o);a.innerHTML=t,f.refresh()}else c.error({message:"❌Sorry, there are no images matching your search query. Please, try again!"})}).finally(()=>{h(),n.reset()})}function y(i){const n=new URLSearchParams({key:u,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${p}?${n}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function L({webformatURL:i,likes:n,views:r,comments:s,downloads:e,largeImageURL:t}){return`
        <a href="${t}" class= "picture-link">
            <img src = "${i}">
            <div class= "picture-content">
                <div class= "picture-text">
                    <span class= "picture-title">Likes</span>
                    <span class= "picture-sub-title">${n}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Views</span>
                    <span class= "picture-sub-title">${r}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Comments</span>
                    <span class= "picture-sub-title">${s}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Downloads</span>
                    <span class= "picture-sub-title">${e}</span>
                </div>
            </div>
        </a>`}
//# sourceMappingURL=commonHelpers.js.map
