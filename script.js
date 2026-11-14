// Car data: every car is an object, and all cars are stored in one array
const cars = [
  { id: 1, name: "Maruti Suzuki Swift", image: "images/swift.svg", price: "Rs 6.5 lakh", engine: "1197 cc petrol", power: "80 bhp", mileage: "24 kmpl", seats: 5, gearbox: "Manual / AMT" },
  { id: 2, name: "Hyundai Creta", image: "images/creta.svg", price: "Rs 11 lakh", engine: "1497 cc petrol", power: "113 bhp", mileage: "17 kmpl", seats: 5, gearbox: "Manual / CVT" },
  { id: 3, name: "Tata Nexon", image: "images/nexon.svg", price: "Rs 8 lakh", engine: "1199 cc turbo petrol", power: "118 bhp", mileage: "17 kmpl", seats: 5, gearbox: "Manual / AMT" },
  { id: 4, name: "Mahindra Thar", image: "images/thar.svg", price: "Rs 11.5 lakh", engine: "1997 cc petrol", power: "150 bhp", mileage: "15 kmpl", seats: 4, gearbox: "Manual / Auto" },
  { id: 5, name: "Honda City", image: "images/city.svg", price: "Rs 12 lakh", engine: "1498 cc petrol", power: "119 bhp", mileage: "18 kmpl", seats: 5, gearbox: "Manual / CVT" },
  { id: 6, name: "Toyota Fortuner", image: "images/fortuner.svg", price: "Rs 33 lakh", engine: "2755 cc diesel", power: "201 bhp", mileage: "14 kmpl", seats: 7, gearbox: "Manual / Auto" }
];

// the rows of the specs table: [key in the car object, label to show]
const specs = [
  ["price", "Price (ex-showroom)"],
  ["engine", "Engine"],
  ["power", "Power"],
  ["mileage", "Mileage"],
  ["seats", "Seats"],
  ["gearbox", "Gearbox"]
];

const MAX_CARS = 3;      // we can compare at most 3 cars
let selectedIds = [];    // ids of the cars that are ticked right now

const carGrid = document.getElementById("carGrid");
const message = document.getElementById("message");
const tableBox = document.getElementById("tableBox");
const clearBtn = document.getElementById("clearBtn");


// 1. Build all the car cards
function showCars() {
  let html = "";

  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];

    html += '<article class="card" id="card' + car.id + '">';
    html += '  <img src="' + car.image + '" alt="' + car.name + '">';
    html += '  <div class="card-body">';
    html += '    <h3>' + car.name + '</h3>';
    html += '    <table>';
    for (let j = 0; j < specs.length; j++) {
      html += '<tr><td>' + specs[j][1] + '</td><td>' + car[specs[j][0]] + '</td></tr>';
    }
    html += '    </table>';
    html += '    <label class="compare-label">';
    html += '      <input type="checkbox" class="compare-box" value="' + car.id + '"> Compare';
    html += '    </label>';
    html += '  </div>';
    html += '</article>';
  }

  carGrid.innerHTML = html;

  // add a click listener to every checkbox
  const boxes = document.querySelectorAll(".compare-box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("change", onCheckboxChange);
  }
}


// 2. Find a car in the array using its id
function findCar(id) {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].id === id) {
      return cars[i];
    }
  }
  return null;
}


// 3. Runs every time a checkbox is ticked or unticked
function onCheckboxChange(event) {
  const box = event.target;
  const id = Number(box.value);

  if (box.checked) {
    // already 3 cars selected? then don't allow another one
    if (selectedIds.length >= MAX_CARS) {
      box.checked = false;
      showMessage("You can compare only " + MAX_CARS + " cars. Untick one first.", true);
      return;
    }
    selectedIds.push(id);
  } else {
    // remove this id from the array
    selectedIds = selectedIds.filter(function (x) {
      return x !== id;
    });
  }

  document.getElementById("card" + id).classList.toggle("picked", box.checked);
  buildTable();
}


// 4. Build the comparison table from the selected cars
function buildTable() {
  if (selectedIds.length < 2) {
    tableBox.innerHTML = "";
    showMessage("Select at least 2 cars to compare.", false);
    return;
  }

  showMessage("Comparing " + selectedIds.length + " cars.", false);

  // header row: empty first cell, then one column per car
  let html = "<table><thead><tr><th>Specification</th>";
  for (let i = 0; i < selectedIds.length; i++) {
    html += "<th>" + findCar(selectedIds[i]).name + "</th>";
  }
  html += "</tr></thead><tbody>";

  // one row for each spec
  for (let i = 0; i < specs.length; i++) {
    html += "<tr><td>" + specs[i][1] + "</td>";
    for (let j = 0; j < selectedIds.length; j++) {
      html += "<td>" + findCar(selectedIds[j])[specs[i][0]] + "</td>";
    }
    html += "</tr>";
  }
  html += "</tbody></table>";

  tableBox.innerHTML = html;
}


function showMessage(text, isWarning) {
  message.textContent = text;
  message.classList.toggle("warn", isWarning);
}


// 5. Clear button: untick everything
clearBtn.addEventListener("click", function () {
  const boxes = document.querySelectorAll(".compare-box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].checked = false;
  }
  const picked = document.querySelectorAll(".card.picked");
  for (let i = 0; i < picked.length; i++) {
    picked[i].classList.remove("picked");
  }
  selectedIds = [];
  buildTable();
});


showCars();
