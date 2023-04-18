import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));
function onInputCountry(e) {
  e.preventDefault();
  const searchCountry = e.target.value.trim();
}

fetch(
  'https://restcountries.com/v3.1/name/deutschland?fields=name,capital,population,flags,languages'
)
  .then(response => {
    return response.json();
  })
  .then(name => {
    console.log(name);
  })
  .catch(error => {
    console.log(error);
  });
