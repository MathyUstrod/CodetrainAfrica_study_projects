/*
1. Write a function to manipulate key cabinet array: 
[
    ...{keyID, isAvailable}
]
2. Write a function to create a key object. {keyID, roomID, numberOfKeys, isAvailable, lastActivity} and add to cabinet array
3. Write functions to collect form inputs, remember to deativate default button action
4. Write functions to dynamically return appropriate style based on key status
5. Write a function to update key cabinet log table
*/

const keyCabinet = [
  {
    keyID: 1,
    roomID: "001",
    numberOfKeys: 2,
    isAvailable: true,
    lastActivity: new Date("Thu Oct 15 2026 00:36:56"),
    yourName: "",
    requesterName: "",
    checkInName: "",
  },
  {
    keyID: 2,
    roomID: "002",
    numberOfKeys: 3,
    isAvailable: false,
    lastActivity: new Date("Thu Oct 14 2026 00:36:56"),
    yourName: "Jane Doe",
    requesterName: "",
    checkInName: "",
  },
  {
    keyID: 3,
    roomID: "003",
    numberOfKeys: 4,
    isAvailable: false,
    lastActivity: new Date("Thu Oct 15 2026 00:36:56"),
    yourName: "John Smith",
    requesterName: "",
    checkInName: "",
  },
  {
    keyID: 4,
    roomID: "004",
    numberOfKeys: 1,
    isAvailable: true,
    lastActivity: new Date("Thu Oct 15 2026 00:36:56"),
    yourName: "",
    requesterName: "",
    checkInName: "",
  },
];

function getLastKey() {
  let lastKey = keyCabinet.length;
  return lastKey;
}

// console.log(`Number of keys: ${getLastKey()}`);

const addNewKey = (
  roomID,
  numberOfKeys = 1,
  isAvailable = true,
  lastActivity = new Date(),
) => {
  let newKey = {
    keyID: getLastKey() + 1,
    roomID,
    numberOfKeys,
    isAvailable,
    lastActivity,
    yourName: "",
    requesterName: "",
    checkInName: "",
  };

  keyCabinet.push(newKey);
};

// Key status and styles
const keyStatus = {
  isAvailable: "bg-emerald-800",
  notAvailable: "bg-rose-800",
  likelyMissing: "bg-rose-800 animate-ping",
};

// addNewKey("005", 5, true, "Admin just created");
// console.log(keyCabinet);

const keyGrid = document.querySelector("#key-grid");
// addHolder();

// const roomNumbers = document.querySelectorAll(".room-number");
// const statuses = document.querySelectorAll(".status");

// console.log(roomNumbers.length);

function updateGrid(cabinet) {
  const roomNumbers = document.querySelectorAll(".room-number");
  const statuses = document.querySelectorAll(".status");
  for (let key = 0; key < cabinet.length; key++) {
    roomNumbers[key].innerText = "Room-" + cabinet[key].roomID;

    statuses[key].classList.remove(
      ...keyStatus.isAvailable.split(" "),
      keyStatus.notAvailable.split(" "),
    );
    statuses[key].classList.add(
      cabinet[key].isAvailable === true
        ? keyStatus.isAvailable.split(" ")
        : keyStatus.notAvailable.split(" "),
    );
  }
}

// Update room name dropdowns
updateRoomDropdowns();

function updateRoomDropdowns() {
  let selectRoomCheckOut = document.getElementById(
    "select-room-number-checkout",
  );
  let selectRoomCheckIn = document.getElementById("select-room-number-checkin");
  let listItemsAvail =
    '<option value="" selected disabled>Select Room Number</option>';
  let listItemsNotAvail =
    '<option value="" selected disabled>Select Room Number</option>';

  selectRoomCheckOut.innerHTML = "";
  selectRoomCheckIn.innerHTML = "";

  for (let key = 0; key < keyCabinet.length; key++) {
    if (keyCabinet[key].isAvailable === true) {
      listItemsAvail =
        listItemsAvail +
        `<option value="${keyCabinet[key].roomID}">Room-${keyCabinet[key].roomID}</option>`;
    } else {
      listItemsNotAvail =
        listItemsNotAvail +
        `<option value="${keyCabinet[key].roomID}">Room-${keyCabinet[key].roomID}</option>`;
    }
  }

  selectRoomCheckOut.innerHTML = listItemsAvail;
  selectRoomCheckIn.innerHTML = listItemsNotAvail;
}

function addHolder() {
  let templ = document.createElement("div");
  let templStyle =
    "min-w-40 bg-slate-200 grid grid-cols-1 gap-2 justify-items-center p-4 text-violet-800 font-semibold text-sm md:text-2xl rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-slate-300";
  templ.classList.add(...templStyle.split(" "));
  templ.innerHTML = `<h3 class="text-center p-2 room-number">Room 000</h3> 
    <button class="rounded-full w-8 h-8 status"></button>`;
  keyGrid.appendChild(templ);
}

updateGrid(keyCabinet);
populateCabinetLogs();
updateRoomDropdowns();

// Form
frmAddHolder = document.getElementById("add-key-holder");

// Form - Add new holder
frmAddHolder.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.type == "submit") {
    let roomName = document.getElementById("add-room-name");
    let keyNumbers = document.getElementById("room-keys-number");
    if (
      roomName.value.trim().length > 0 &&
      keyNumbers.value.trim().length > 0
    ) {
      //add new key to key array
      addNewKey(roomName.value, keyNumbers.value);
      // console.log(keyCabinet);
      // Create holder
      addHolder();
      //update key cabinet grid
      updateGrid(keyCabinet);
      //   Populate cabinet logs
      populateCabinetLogs();
      // Update room dropdowns
      updateRoomDropdowns();
      // Clear fields
      clearFields([roomName, keyNumbers]);
    } else {
      alert("Please provide all required details!");
      return;
    }
  }
});

function clearFields([...fields]) {
  for (let item = 0; item < fields.length; item++) {
    if (fields[item].type == "checkbox") {
      fields[item].checked = false;
    } else {
      fields[item].value = "";
    }
  }
}

// Key check out
function checkOutKey(roomNum, yourName, isRequester, requesterName) {
  let isKeyAvailable;
  let refKey;

  for (let key = 0; key < keyCabinet.length; key++) {
    if (keyCabinet[key].roomID == roomNum) {
      refKey = keyCabinet[key];
      isKeyAvailable = keyCabinet[key].isAvailable;
    }
  }

  if (isKeyAvailable == true) {
    refKey.lastActivity = new Date().toLocaleString();
    refKey.yourName = yourName;

    if (isRequester) {
      refKey.requesterName = requesterName;
    }
  } else {
    alert("This key is already checked out!");
    return;
  }
  refKey.isAvailable = false;
  updateGrid(keyCabinet);
  populateCabinetLogs();
  updateRoomDropdowns();
}

// Key check in
function checkInKey(roomNum, yourName) {
  let isKeyAvailable;
  let refKey;

  for (let key = 0; key < keyCabinet.length; key++) {
    if (keyCabinet[key].roomID == roomNum) {
      refKey = keyCabinet[key];
      isKeyAvailable = keyCabinet[key].isAvailable;
    }
  }

  if (isKeyAvailable !== true) {
    refKey.lastActivity = new Date().toLocaleString();
    refKey.checkInName = yourName;
    refKey.isAvailable = true;
  } else {
    alert("This key is already checked in!");
    return;
  }

  updateGrid(keyCabinet);
  populateCabinetLogs();
  updateRoomDropdowns();
}

// Form - Check out key
frmCheckOutKey = document.getElementById("check-out-key");

frmCheckOutKey.addEventListener("submit", (event) => {
  event.preventDefault(); //Prevent default behaviour to assign custom event handler

  //   Check out form fields
  let roomCheckOut = document.getElementById("select-room-number-checkout");
  let nameCheckOut = document.getElementById("your-name-checkout");
  let isRequester = document.getElementById("delegate");
  let requesterName = document.getElementById("requester-name-checkout");
  // console.log(requesterName.value);
  //   Validate the fields
  if (isRequester.checked == true && requesterName.value.trim() == "") {
    alert("Please provide requester name.");
    return;
  }

  if (nameCheckOut.value.trim() == requesterName.value.trim()) {
    alert(
      "Your name cannot be the same as the requester's name if you're checking out on their behalf.",
    );
    return;
  }
  //   check out the key if details are appropriate and correct
  checkOutKey(
    roomCheckOut.value,
    nameCheckOut.value,
    isRequester.checked,
    requesterName.value,
  );

  console.log(keyCabinet);

  clearFields([roomCheckOut, nameCheckOut, isRequester, requesterName]);
});

// Form - Check in key
frmCheckInKey = document.getElementById("check-in-key");

frmCheckInKey.addEventListener("submit", (event) => {
  event.preventDefault();
  // form fields
  let roomCheckIn = document.getElementById("select-room-number-checkin");
  let checkInName = document.getElementById("your-name-checkin");

  if (roomCheckIn.value.trim() == "" || checkInName.value.trim() == "") {
    alert("Please provide all required details.");
    return;
  }

  checkInKey(roomCheckIn.value.trim(), checkInName.value.trim());

  console.log(keyCabinet);

  clearFields([roomCheckIn, checkInName]);
});

// Key cabinet logs

// Determine if key has been unavailable >24hrs
function keyAvailability(logDt, Avail) {
  let logDate = new Date(logDt).getTime();
  let refDate = new Date().getTime();
  let diff = Math.floor(refDate - logDate) / (60 * 60 * 1000);
  console.log(diff);
  let keyAvail = Avail;

  if (diff > 24 && keyAvail == false) {
    return keyStatus.likelyMissing;
  } else if ((diff < 24 && keyAvail == false) || keyAvail == false) {
    return keyStatus.notAvailable;
  } else {
    return keyStatus.isAvailable;
  }
}

function elapsedHrs(dateTime) {
  let logDate = new Date(dateTime).getTime();
  let refDate = new Date().getTime();
  let diff = Math.floor(refDate - logDate) / (60 * 60 * 1000);
  if (diff < 24) {
    return diff.toFixed(1) + " hrs ago";
  } else {
    return Math.floor(diff / 24) + " days ago";
  }
}

function populateCabinetLogs() {
  let tableData = document.getElementById("cabinet-logs");
  let rows = "";
  //   let refDate = new Date();
  //   refDate = refDate.getMilliseconds();

  for (let key = keyCabinet.length - 1; key >= 0; key--) {
    rows =
      rows +
      `<tr>
        <td class="text-center border">${keyCabinet[key].keyID}</td>
        <td class="text-center border">${keyCabinet[key].roomID}</td>
        <td class="border text-center">${keyCabinet[key].yourName}</td>
        <td class="border text-center">${keyCabinet[key].requesterName}</td>
        <td class="border text-center">${keyCabinet[key].checkInName}</td>
        <td class="border"><button class="${keyAvailability(keyCabinet[key].lastActivity, keyCabinet[key].isAvailable)} w-5 h-5 rounded-full m-2"></button>${keyCabinet[key].isAvailable ? "Available" : "Not Available"}</td>
        <td class="border px-2">${elapsedHrs(keyCabinet[key].lastActivity)} @ ${keyCabinet[key].lastActivity.toLocaleString()}</td>
        </tr>`;
  }

  tableData.innerHTML = rows;
}

setInterval(populateCabinetLogs(), 5000);
