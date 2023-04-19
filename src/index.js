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

  fetchCountries(name).then(countries => {});
}
function createMarkupList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        ` <li">
              <img  src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2>${name.official}</h2></li> `
    )
    .join('');
}
function createMarkupInfo(countries) {
  return countries
    .map(
      ({
        name,
        capital,
        population,
        flags,
        languages,
      }) => `<img src="${flags.svg}" alt="Flag of ${name}" width="320" height="auto">
           <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`
    )
    .join('');
}
