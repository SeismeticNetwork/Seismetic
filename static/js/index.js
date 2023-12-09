"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
  const url = search(address.value, searchEngine.value);
  localStorage.setItem("TargetURL", url)
  localStorage.setItem("TargetName", 'Search')
  location.href = './go.html'
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const encodedData = window.location.hash.substr(1);
    if (encodedData) {
      localStorage.setItem('sm-user', encodedData);
      const sm_register = document.createElement('div');
      sm_register.className = 'sm-register';
      const SM_logo = document.createElement('img');
      sm_register.appendChild(SM_logo);
      SM_logo.className = 'sm-logo';
      SM_logo.alt = 'SM-Logo';
      SM_logo.src = '../imagen/seisimetic_Transparent.png';

      const p_el = document.createElement('p');
      sm_register.appendChild(p_el);
      p_el.textContent = 'Logging in...';
      const sm_loading_screen = document.createElement('img');
      sm_loading_screen.alt = 'sm-load';
      sm_loading_screen.className = 'loader';
      sm_loading_screen.src = '../imagen/loader.svg';
      sm_register.appendChild(sm_loading_screen);
      document.body.appendChild(sm_register);
      const Item = document.createElement('div'); Item.className = 'overlay'; document.body.appendChild(Item); Item.id = 'overlay_'
      setTimeout(function() {
        Item.remove();
        sm_register.remove();
      }, 3000);
    }
  }, 0);
});