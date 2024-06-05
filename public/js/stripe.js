/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

// const stripe = Stripe(
//   'pk_test_51PNLkJSGsACzm2HGqRn37sCkzlfNzHuqhhQlwzon5nJwyLhwYJhlEbWvFDTsz6ZILjsqe7fy2CY1Jn9xK227ibYQ00IkI0Uga1'
// );

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51PNLkJSGsACzm2HGqRn37sCkzlfNzHuqhhQlwzon5nJwyLhwYJhlEbWvFDTsz6ZILjsqe7fy2CY1Jn9xK227ibYQ00IkI0Uga1'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

// ----
/*eslint-disable*/
// import { showAlert } from './alerts';

// export const bookTour = async tourID => {
//   try {
//     const stripe = Stripe(
//       'pk_test_51NmfEyAud4S6ER4emv2nO0hFMCoYfAvT5BKOA0OWWpjTpxAnfkEpbNCdA61DbDf5BrCAhkrOoVcFqvKbxEp7JO1n00rFE4WgRf'
//     );
//     // 1. Get checkout session from API
//     const session = await fetch(
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
//     ).then(function(response) {
//       return response.json();
//     });

//     console.log(session);
//     // 2. create checkout form + change credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.session.id
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };

// ----- sajan --- works

// import axios from 'axios';
// import { showAlert } from './alerts';
// import { loadStripe } from '@stripe/stripe-js';

// export const bookTour = async tourId => {
//   const stripe = await loadStripe(
//     'pk_test_51PNLkJSGsACzm2HGqRn37sCkzlfNzHuqhhQlwzon5nJwyLhwYJhlEbWvFDTsz6ZILjsqe7fy2CY1Jn9xK227ibYQ00IkI0Uga1'
//   );

//   try {
//     // 1) Get Checkout session
//     const response = await axios.get(
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//     );
//     const session = response.data.session;

//     // 2) Redirect to checkout form
//     await stripe.redirectToCheckout({
//       sessionId: session.id
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error');
//   }
// };

// - ---- deprecated wont work for you - works

// import axios from 'axios';
// import { showAlert } from './alerts';
// const stripe = Stripe(
//   'pk_test_51NFwotSIH8fieRDzRkcDSuUbZTeeCxLIqZWZj6Ip09OND3bfRMlU8VkLdByiAIb8r0TKrN1eFtj0H82CS7osf6gV004ZTnI2R6'
// );

// const bookTour = async tourId => {
//   try {
//     // 1) Get checkout session from API
//     const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
//     // await stripe.redirectToCheckout({
//     //   sessionId:session.data.session.i
//     // })
//     // console.log(session.data.session.url);
//     const stripeUrl = session.data.session.url;
//     window.location.href = stripeUrl;
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
// export { bookTour };
