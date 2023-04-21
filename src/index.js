import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));
function onInputCountry(e) {
  e.preventDefault();
  const searchCountry = e.target.value.trim();
  if (searchCountry === '') {
    return (countryInfo.innerHTML = ''), (countryList.innerHTML = '');
  }

  fetchCountries(searchCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please, enter a more specific name.'
        );
        return;
      } else if (countries.length >= 2 && countries.length < 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = createMarkupList(countries);
      } else if (countries.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = createMarkupInfo(countries);
      }
    })
    .catch(error => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}
function createMarkupList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        ` <li class="item">
              <img  src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 30px>
              <h2>${name.official}</h2></li> `
    )
    .join('');
}
function createMarkupInfo(countries) {
  return countries
    .map(
      ({ name, capital, population, flags, languages }) =>
        // console.log(languages)
        `<img src="${flags.svg}" alt="Flag of ${name}" width="40" height="30">
           <h2> ${name.official}</h2>
            <p class="title">Capital: <span> ${capital}</span></p>
            <p class="title">Population: <span> ${population}</span></p>
            <p class="title">Languages: <span> ${Object.values(
              languages
            )}</span></p>`
    )
    .join('');
}
