import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchPhoto } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

let lightbox = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const formSearch = document.querySelector('.js__search-form');
const list = document.querySelector('.js__list');
const loader = document.querySelector('.loader');
const buttonLoad = document.querySelector('.button__load-btn');

let inputSearchValue;
let page = 1;
let per_page = 15;

formSearch.addEventListener('submit', handleSubmit);
buttonLoad.addEventListener('click', loadNextPage);


async function handleSubmit(event) {
    event.preventDefault();
   
    inputSearchValue = formSearch.elements.picture.value.trim();
    list.innerHTML = "";
    loader.classList.remove('.hide');
    
    try {
        const data = await searchPhoto(inputSearchValue, page);
        if (!inputSearchValue) {
             iziToast.error({
               title: 'Error',
               message: 'Sorry, your request is not correct. Please try again!',
             });
            
             return;
        } else {
          list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
          lightbox.refresh();
            const totalPages = Math.ceil(data.totalHits / per_page);
            
          if (page < totalPages) {
              buttonLoad.classList.replace("load-more-hidden", "load-more");
          }
        }
    } catch(error) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomCenter',
            transitionIn: 'bounceInUp',
            messageColor: 'white',
            timeout: 2000,
          });
           
      }
    finally {
        
        formSearch.reset();
    }
    
};


async function loadNextPage() {
    page += 1;
    buttonLoad.disabled = true;
  loader.classList.remove('.hide');
  
    try {
      const data = await searchPhoto(inputSearchValue, page);
      const totalPages = Math.ceil(data.totalHits / per_page);
      
        list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        buttonLoad.disabled = false;
        lightbox.refresh();

        const { height: cardHeight } = document
          .querySelector('.gallery-item')
          .getBoundingClientRect();
        window.scrollBy({
          top: Math.round(cardHeight) * 2,
          behavior: 'smooth',
        });



        if (page >= totalPages) {
            buttonLoad.classList.replace('load-more', 'load-more-hidden');
            iziToast.show({
                position: 'topRight',
                message:
                    "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message:
                'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomCenter',
            transitionIn: 'bounceInUp',
            messageColor: 'white',
            timeout: 2000,
        });
  }
  finally {
     loader.classList.add('hide');
  }
};
