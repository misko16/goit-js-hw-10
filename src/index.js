import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

error.style.visibility = 'hidden';
loader.style.display = 'none';
catInfo.style.opacity = '0';

fetchBreeds()
  .then(breeds => {
    const options = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;

      return option;
    });

    select.append(...options);
    select.style.display = 'block';
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(() => {
    Notiflix.Notify.info('Oops! Something went wrong! Try reloading the page!');
    loader.style.display = 'none';
  });

select.addEventListener('change', () => {
  const breedId = select.value;
  loader.style.display = 'block';
  catInfo.style.opacity = '0';

  fetchCatByBreed(breedId)
    .then(breeds => {
      const url = breeds[0].url;
      const img = document.createElement('img');
      img.src = url;
      img.width = 300;
      const breedNameEl = document.createElement('h2');
      breedNameEl.textContent = breeds[0].breeds[0].name;
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = breeds[0].breeds[0].description;
      const temperamentEl = document.createElement('p');
      temperamentEl.textContent = breeds[0].breeds[0].temperament;

      catInfo.innerHTML = '';
      catInfo.appendChild(img);
      catInfo.appendChild(breedNameEl);
      catInfo.appendChild(descriptionEl);
      catInfo.appendChild(temperamentEl);

      loader.style.display = 'none';
      catInfo.style.opacity = '1';
    })
    .catch(() => {
      Notiflix.Notify.info('Oops! Something went wrong! Try reloading the page!');
      loader.style.display = 'none';
    });
});
