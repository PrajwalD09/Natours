/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    // Check if element exists first
    if (!mapElement.hasChildNodes()) {
      // Create the map here (lines 3-7 of your original code)
      const locations = JSON.parse(mapElement.dataset.locations);
      // ... rest of your code

      const map = L.map('map', { zoomControl: true });
      // ... rest of your code
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const points = [];
      locations.forEach(loc => {
        points.push([loc.coordinates[1], loc.coordinates[0]]);
        L.marker([loc.coordinates[1], loc.coordinates[0]])
          .addTo(map)
          .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false
          })
          .openPopup();
      });

      const bounds = L.latLngBounds(points).pad(0.5);
      map.fitBounds(bounds);

      map.scrollWheelZoom.disable();
    }
  }
});

// working ----------------------

// document.addEventListener('DOMContentLoaded', () => {
//   const mapElement = document.getElementById('map');
//   if (!mapElement) {
//     console.error('Map element not found');
//     return;
//   }

//   const locations = JSON.parse(mapElement.dataset.locations);

//   const map = L.map('map', { zoomControl: true }); // to disable + - zoom
//   // var map = L.map('map', { zoomControl: false }).setView([31.111745, -118.113491], );

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     crossOrigin: ''
//   }).addTo(map);

//   const points = [];
//   locations.forEach(loc => {
//     points.push([loc.coordinates[1], loc.coordinates[0]]);
//     L.marker([loc.coordinates[1], loc.coordinates[0]])
//       .addTo(map)
//       .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
//         autoClose: false
//       })
//       .openPopup();
//   });

//   const bounds = L.latLngBounds(points).pad(0.5);
//   map.fitBounds(bounds);

//   map.scrollWheelZoom.disable(); // to disable zoom by mouse wheel
// });

// --------------------------------

// const locations = JSON.parse(document.getElementById('map').dataset.locations);

// const map = L.map('map', { zoomControl: true }); //to disable + - zoom
// // var map = L.map('map', { zoomControl: false }).setView([31.111745, -118.113491], );

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   crossOrigin: ''
// }).addTo(map);

// const points = [];
// locations.forEach(loc => {
//   points.push([loc.coordinates[1], loc.coordinates[0]]);
//   L.marker([loc.coordinates[1], loc.coordinates[0]])
//     .addTo(map)
//     .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
//       autoClose: false
//     })
//     .openPopup();
// });

// const bounds = L.latLngBounds(points).pad(0.5);
// map.fitBounds(bounds);

// map.scrollWheelZoom.disable(); //to disable zoom by mouse wheel

// -------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//   const mapElement = document.getElementById('map');

//   if (mapElement) {
//     const locations = JSON.parse(mapElement.dataset.locations);

//     const map = L.map('map', { zoomControl: true });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       crossOrigin: ''
//     }).addTo(map);

//     const points = [];
//     locations.forEach(loc => {
//       points.push([loc.coordinates[1], loc.coordinates[0]]);
//       L.marker([loc.coordinates[1], loc.coordinates[0]])
//         .addTo(map)
//         .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
//           autoClose: false
//         })
//         .openPopup();
//     });

//     const bounds = L.latLngBounds(points).pad(0.5);
//     map.fitBounds(bounds);

//     map.scrollWheelZoom.disable(); // Disable zoom by mouse wheel
//   } else {
//     console.error('Map element not found.');
//   }
// });

//-----
