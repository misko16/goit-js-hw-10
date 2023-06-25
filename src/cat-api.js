import axios from 'axios';

const apiKey = 'live_hldqybt1KGScVDrcge8cJWeYNcYsGLcEKM4BamzF5DSxMiBorDxzqPlNkrb6ispV';

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error('Failed to fetch cat breeds.');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error('Failed to fetch cat information.');
    });
}
