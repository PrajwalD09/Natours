/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupBtn = document.querySelector('.btn--signup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// values

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    signupBtn.textContent = 'Processing...';

    const name = document.getElementById('nameSignup').value;
    const email = document.getElementById('emailSignup').value;
    const password = document.getElementById('passwordSignup').value;
    const passwordConfirm = document.getElementById('passwordConfirmSignup')
      .value;

    const html = await signup(name, email, password, passwordConfirm);

    if (!html) {
      password.value = '';
      passwordConfirm.value = '';
      return;
    }

    // make container empty
    main.innerHTML = '';

    // convert the returned html file which would be in string format to html and appending it to the container
    main.appendChild(
      new DOMParser().parseFromString(html, 'text/html').querySelector('.main')
    );
  });
}

// import '@babel/polyfill';
// import { displayMap } from './mapbox';
// import { login, logout } from './login';
// import { updateSettings } from './updateSettings';

// // DOM ELEMENTS
// const mapBox = document.getElementById('map');
// const loginForm = document.querySelector('.form--login');
// const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');

// // DELEGATION
// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

// if (loginForm)
//   loginForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
//   });

// if (logOutBtn) logOutBtn.addEventListener('click', logout);

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings({ name, email }, 'data');
//   });

// if (userPasswordForm)
//   userPasswordForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );

//     document.querySelector('.btn--save-password').textContent = 'Save password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });
