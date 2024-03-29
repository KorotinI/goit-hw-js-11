import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
const API_KEY = '41942855-48a43e8a3131b9e330700a0c4';
const URL = "https://pixabay.com/api/";
const formEl = document.querySelector(".form-inline");
const containerEl = document.querySelector(".card-container");
formEl.addEventListener("submit", handleSearch);
const lightbox = new SimpleLightbox('.card-container a', {
                    captionsData: 'alt',
                    captionPosition: 'bottom',
                    captionDelay: 250,
                });
function showLoadingIndicator() {
    containerEl.innerHTML = '<p>Loading images, please wait...</p>';
}
function hideLoadingIndicator() {
    const loadingElement = containerEl.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}
function handleSearch(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const picture = form.elements.picture.value.trim();
    if (picture === "" || picture == null) {
        iziToast.error({
            message: `❌ Please, input your request!`,
        })
        containerEl.innerHTML = "";
        return;
    }
    showLoadingIndicator()
    serchPicture(picture)
        .then((data) => {
            if (data.hits && data.hits.length > 0) {
                const hits = data.hits;

                let markup = "";
                for (const hit of hits) {
                    markup += createPictureMarkup(hit);
                }
                containerEl.innerHTML = markup;
                lightbox.refresh();
            } else {
                iziToast.error({
                    message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
                })

            }
        })
        .finally(() => {
            hideLoadingIndicator();
            form.reset()
        });
}
function serchPicture(picture) {
    const urlParams = new URLSearchParams({
        key: API_KEY,
        q: picture,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    return fetch(`${URL}?${urlParams}`).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
}
function createPictureMarkup({ webformatURL, likes, views, comments, downloads, largeImageURL }) {
    return `
        <a href="${largeImageURL}" class= "picture-link">
            <img src = "${webformatURL}">
            <div class= "picture-content">
                <div class= "picture-text">
                    <span class= "picture-title">Likes</span>
                    <span class= "picture-sub-title">${likes}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Views</span>
                    <span class= "picture-sub-title">${views}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Comments</span>
                    <span class= "picture-sub-title">${comments}</span>
                </div>
                <div class= "picture-text">
                    <span class= "picture-title">Downloads</span>
                    <span class= "picture-sub-title">${downloads}</span>
                </div>
            </div>
        </a>`;
}