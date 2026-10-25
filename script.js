/* =========================================================
   Driveway Motors - script.js
   What this file does:
   1. Stores all car data in an array
   2. Listens for Compare checkbox clicks
   3. Allows a maximum of 3 selected cars
   4. Builds the comparison table dynamically
   ========================================================= */
 
// ===== 1. CAR DATA =====
// The position (index) of each car matches the checkbox value in index.html.
// Swift = 0, Nexon = 1, Creta = 2, Thar = 3, City = 4, Innova = 5
const cars = [
  {
    name: "Maruti Suzuki Swift",
    body: "Hatchback",
    price: "₹ 6.5 Lakh onwards",
    engine: "1197 cc",
    mileage: "24.8 km/l",
    seats: "5",
    fuel: "Petrol",
    transmission: "Manual / AMT"
  },
  {
    name: "Tata Nexon",
    body: "Compact SUV",
    price: "₹ 7.3 Lakh onwards",
    engine: "1199 cc",
    mileage: "17.4 km/l",
    seats: "5",
    fuel: "Petrol / Diesel / CNG",
    transmission: "Manual / AMT / DCT"
  },
  {
    name: "Hyundai Creta",
    body: "Mid-size SUV",
    price: "₹ 10.7 Lakh onwards",
    engine: "1497 cc",
    mileage: "17 km/l",
    seats: "5",
    fuel: "Petrol / Diesel",
    transmission: "Manual / IVT / Automatic"
  },
  {
    name: "Mahindra Thar",
    body: "Off-road SUV",
    price: "₹ 10 Lakh onwards",
    engine: "1997 cc",
    mileage: "15 km/l",
    seats: "4",
    fuel: "Petrol / Diesel",
    transmission: "Manual / Automatic"
  },
  {
    name: "Honda City",
    body: "Sedan",
    price: "₹ 11 Lakh onwards",
    engine: "1498 cc",
    mileage: "17.8 km/l",
    seats: "5",
    fuel: "Petrol / Hybrid",
    transmission: "Manual / CVT"
  },
  {
    name: "Toyota Innova Crysta",
    body: "MPV",
    price: "₹ 18 Lakh onwards",
    engine: "2393 cc",
    mileage: "15 km/l",
    seats: "7",
    fuel: "Diesel",
    transmission: "Manual / Automatic"
  }
];
 
// The rows of the comparison table: [label shown to user, key in the car object]
const rows = [
  ["Body type", "body"],
  ["Price", "price"],
  ["Engine", "engine"],
  ["Mileage", "mileage"],
  ["Seats", "seats"],
  ["Fuel", "fuel"],
  ["Transmission", "transmission"]
];
 
// ===== 2. GET ELEMENTS FROM THE PAGE =====
const MAX_COMPARE = 3;
 
const checkboxes = document.querySelectorAll(".compare-box");
const message = document.getElementById("compare-message");
const tableBox = document.getElementById("compare-table");
const clearBtn = document.getElementById("clear-btn");
const bar = document.getElementById("compare-bar");
const barText = document.getElementById("compare-bar-text");
 
// This array remembers which cars are selected (it stores their index numbers)
let selected = [];
 
// ===== 3. EVENT LISTENERS =====
// Run onCheckboxChange every time any checkbox is ticked or unticked
checkboxes.forEach(function (box) {
  box.addEventListener("change", onCheckboxChange);
});
 
clearBtn.addEventListener("click", clearAll);
 
// ===== 4. FUNCTIONS =====
 
// Runs when a checkbox changes
function onCheckboxChange(event) {
  const box = event.target;                 // the checkbox that was clicked
  const carIndex = Number(box.value);       // its value ("0", "1", ...) as a number
  const card = box.closest(".car-card");    // the card that contains this checkbox
 
  if (box.checked) {
    // Block the 4th car
    if (selected.length === MAX_COMPARE) {
      box.checked = false;
      message.textContent = "You can compare only 3 cars at a time. Untick one car first.";
      message.classList.add("warning");
      return; // stop here
    }
    selected.push(carIndex);                // add to the array
    card.classList.add("selected");         // highlight the card
  } else {
    // Remove this car from the array
    selected = selected.filter(function (index) {
      return index !== carIndex;
    });
    card.classList.remove("selected");
  }
 
  updateComparison();
}
 
// Updates the message, the floating bar and the table
function updateComparison() {
  message.classList.remove("warning");
 
  if (selected.length === 0) {
    message.textContent = "Select 2 or 3 cars above to compare them here.";
  } else if (selected.length === 1) {
    message.textContent = "Select one more car to start comparing.";
  } else {
    message.textContent = "Comparing " + selected.length + " cars.";
  }
 
  // Floating bar: show only when at least one car is selected
  if (selected.length > 0) {
    bar.classList.remove("hidden");
    barText.textContent = selected.length + " of " + MAX_COMPARE + " selected";
  } else {
    bar.classList.add("hidden");
  }
 
  // Table: build only when 2 or 3 cars are selected
  if (selected.length >= 2) {
    buildTable();
  } else {
    tableBox.innerHTML = "";
  }
}
 
// Creates the comparison table as HTML text and puts it on the page
function buildTable() {
  // Header row: one column per selected car
  let html = "<table><thead><tr><th>Specification</th>";
  selected.forEach(function (index) {
    html += "<th>" + cars[index].name + "</th>";
  });
  html += "</tr></thead><tbody>";
 
  // One row per specification
  rows.forEach(function (row) {
    const label = row[0];
    const key = row[1];
 
    html += "<tr><th>" + label + "</th>";
    selected.forEach(function (index) {
      html += "<td>" + cars[index][key] + "</td>";
    });
    html += "</tr>";
  });
 
  html += "</tbody></table>";
 
  tableBox.innerHTML = html;
}
 
// Clear all button: untick everything and reset
function clearAll() {
  checkboxes.forEach(function (box) {
    box.checked = false;
    box.closest(".car-card").classList.remove("selected");
  });
  selected = [];
  updateComparison();
}
 
