// Car data. Each inner array is one car, in the same order as the cards in index.html:
// [name, price, engine, power, mileage, seats, gearbox]
var cars = [
  ["Maruti Suzuki Swift", "Rs 6.5 lakh", "1197 cc petrol", "80 bhp", "24 kmpl", "5", "Manual / AMT"],
  ["Hyundai Creta", "Rs 11 lakh", "1497 cc petrol", "113 bhp", "17 kmpl", "5", "Manual / CVT"],
  ["Tata Nexon", "Rs 8 lakh", "1199 cc turbo petrol", "118 bhp", "17 kmpl", "5", "Manual / AMT"],
  ["Mahindra Thar", "Rs 11.5 lakh", "1997 cc petrol", "150 bhp", "15 kmpl", "4", "Manual / Auto"],
  ["Honda City", "Rs 12 lakh", "1498 cc petrol", "119 bhp", "18 kmpl", "5", "Manual / CVT"],
  ["Toyota Fortuner", "Rs 33 lakh", "2755 cc diesel", "201 bhp", "14 kmpl", "7", "Manual / Auto"]
];

// This array remembers which cars are ticked (we store their numbers 0 to 5)
var selected = [];

// Get the elements we need from the page
var boxes = document.querySelectorAll(".compare-box");
var message = document.getElementById("message");
var table = document.getElementById("compareTable");
var clearBtn = document.getElementById("clearBtn");


// Runs every time any checkbox is ticked or unticked
function handleChange(event) {
  var box = event.target;               // the checkbox that was clicked
  var index = Number(box.value);        // its car number (0 to 5)
  var card = document.getElementById("card" + index);

  if (box.checked) {
    // Already 3 cars selected? Then do not allow a 4th one
    if (selected.length >= 3) {
      box.checked = false;
      message.textContent = "You can compare only 3 cars. Untick one first.";
      message.className = "warning";
      return;
    }
    selected.push(index);               // add this car to the list
    card.classList.add("selected");     // highlight the card
  } else {
    // Unticked: build a new list without this car
    var newList = [];
    for (var i = 0; i < selected.length; i++) {
      if (selected[i] !== index) {
        newList.push(selected[i]);
      }
    }
    selected = newList;
    card.classList.remove("selected");  // remove the highlight
  }

  updateTable();
}


// Fills the comparison table using the selected list
function updateTable() {
  message.className = "";               // remove the warning colour

  // Fewer than 2 cars: hide the table and show a hint
  if (selected.length < 2) {
    table.style.display = "none";
    message.textContent = "Select at least 2 cars to compare.";
    return;
  }

  message.textContent = "Comparing " + selected.length + " cars.";
  table.style.display = "table";

  // The table has 3 columns for cars: col0, col1, col2
  for (var col = 0; col < 3; col++) {
    var cells = document.querySelectorAll(".col" + col);   // 7 cells: 1 header + 6 specs

    for (var row = 0; row < cells.length; row++) {
      if (col < selected.length) {
        // This column has a car: look it up in the cars array and show it
        var carNumber = selected[col];
        cells[row].textContent = cars[carNumber][row];
        cells[row].style.display = "table-cell";
      } else {
        // No car for this column: empty it and hide it
        cells[row].textContent = "";
        cells[row].style.display = "none";
      }
    }
  }
}


// Runs when the Clear button is clicked
function clearAll() {
  // Untick every checkbox
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = false;
  }

  // Remove the highlight from every card
  var cards = document.querySelectorAll(".card");
  for (var j = 0; j < cards.length; j++) {
    cards[j].classList.remove("selected");
  }

  selected = [];
  updateTable();
}


// Connect the events: each checkbox calls handleChange, the button calls clearAll
for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("change", handleChange);
}
clearBtn.addEventListener("click", clearAll);

// Start with the table hidden
updateTable();
