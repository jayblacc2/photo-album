const auth = '563492ad6f917000010000017d9b09726d81431c9ac803d4386847cd';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let fetchLink;
let currentSearch;
let page = 1;

// Eventlister
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
  console.log('search in progesss....');
});

more.addEventListener('click', loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      // Accept: 'appliacation/json',
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
  console.log(data);
}

function imgGallery(data) {
  data.photos.forEach((photo) => {
    // console.log(photo);
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    const imgurl = 'photo.src.large'
    galleryImg.innerHTML = `
    
    <img src="${photo.src.large}"></img>
    <div class="gallery-info">
      <p>${photo.photographer}</p> 
      <a class="gallery-info" href='imgurl'>Download</a>
    </div>
    
    `;
    gallery.appendChild(galleryImg);
  });
}

// get the data through async-await
async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=1`;
  const data = await fetchApi(fetchLink);
  imgGallery(data);
}

async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  clear();
  const data = await fetchApi(fetchLink);
  imgGallery(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore() {
  console.log('clicked');
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  imgGallery(data);
}

curatedPhotos();

/*
 *********Impliment reandom page***********
 Math.floor(Math.random()* page) + `${data.photo.total_result}`
*/
