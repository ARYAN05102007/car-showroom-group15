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
