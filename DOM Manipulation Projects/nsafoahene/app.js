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
    lastActivity: "",
    yourName: "",
    requesterName: "",
  },
  {
    keyID: 2,
    roomID: "002",
    numberOfKeys: 3,
    isAvailable: false,
    lastActivity: "",
    yourName: "",
    requesterName: "",
  },
  {
    keyID: 3,
    roomID: "003",
    numberOfKeys: 4,
    isAvailable: false,
    lastActivity: "",
    yourName: "",
    requesterName: "",
  },
  {
    keyID: 4,
    roomID: "004",
    numberOfKeys: 1,
    isAvailable: true,
    lastActivity: "",
    yourName: "",
    requesterName: "",
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
  };

  keyCabinet.push(newKey);
};

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

    statuses[key].classList.add(
      cabinet[key].isAvailable
        ? keyStatus.isAvailable.split(" ")
        : keyStatus.notAvailable.split(" "),
    );
  }
}

// Update room name dropdowns

function updateRoomDropdowns() {
  let selectRoomCheckOut = document.getElementById(
    "select-room-number-checkout",
  );
  let selectRoomCheckIn = document.getElementById("select-room-number-checkin");
  let listItems =
    '<option value="" selected disabled>Select Room Number</option>';

  selectRoomCheckOut.innerHTML = "";
  selectRoomCheckIn.innerHTML = "";

  for (let key = 0; key < keyCabinet.length; key++) {
    listItems =
      listItems +
      `<option value="${keyCabinet[key].roomID}">Room-${keyCabinet[key].roomID}</option>`;
  }

  selectRoomCheckOut.innerHTML = listItems;
  selectRoomCheckIn.innerHTML = listItems;
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

// Forms
frmAddHolder = document.getElementById("add-key-holder");
frmCheckOutKey = document.getElementById("check-out-key");
frmCheckInKey = document.getElementById("check-in-key");

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
  fields.forEach((item) => (item.value = ""));
}

// Key check out
function checkOutKey(roomNum, yourName, isRequester, requesterName) {
  let isKeyAvailable = false;
  let refKey = "";

  for (let key = 0; key < keyCabinet.length; key++) {
    if (keyCabinet[key].roomID == roomNum) {
      refKey = keyCabinet[key];
      isKeyAvailable = keyCabinet[key].isAvailable;
    }
  }

  if (isKeyAvailable != false) {
    refKey.isAvailable = false;
    refKey.lastActivity = new Date();
    refKey.yourName = yourName;
    if (isRequester) {
      refKey.requesterName = requesterName;
    }
  } else {
    alert("This key is already checked out!");
    return;
  }
}

// Key check in
function checkInKey(roomNum, yourName) {
  let isKeyAvailable = true;
  let refKey = "";

  for (let key = 0; key < keyCabinet.length; key++) {
    if (keyCabinet[key].roomID == roomNum) {
      refKey = keyCabinet[key];
      isKeyAvailable = keyCabinet[key].isAvailable;
    }
  }

  if (isKeyAvailable != true) {
    refKey.isAvailable = true;
    refKey.lastActivity = new Date();
    refKey.yourName = yourName;
  } else {
    alert("This key is already checked in!");
    return;
  }
}

// Form - Check out key
