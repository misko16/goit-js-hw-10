import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const loader = document.querySelector(".loader");
const select = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const error = document.querySelector(".error");


select.style.display = "none";
loader.style.display = "none";
error.style.visibility = "hidden";

fetchBreeds()
fetchBreeds()
  .then((breeds) => {
    const options = breeds.map((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });

    select.innerHTML = "";
    select.append(...options);
    select.style.display = "block"; 

    
    error.style.visibility = "hidden";
  })
  .catch((error) => {
    console.log(error);
    loader.style.display = "none";
  });


select.addEventListener("change", () => {
  const breedId = select.value;
  loader.style.display = "block"; 
  error.style.visibility = "hidden"; 

  fetchCatByBreed(breedId)
    .then((breeds) => {

      loader.style.display = "none"; 
      error.style.visibility = "hidden"; 
    })
    .catch(() => {
      Notiflix.Notify.info("Oops! Something went wrong! Try reloading the page!");
      loader.style.display = "none";
      error.style.visibility = "visible"; 
    });
});
