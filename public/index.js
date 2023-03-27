// select DOM elements
const form = document.getElementById("form");
const urlInput = document.getElementById("url");
const submitBtn = document.querySelector("#submit-btn");
const resultsTable = document.querySelector("#results-table tbody");
const invalidUrlDiv = document.getElementById("invalid-url");
//Set the Headers
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// store results in an array
const results = [];

//Update the table as soon as the window loads
window.onload = function () {
  updateTable();
};
//Verify whether a Url is valid or not
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
//Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  invalidUrlDiv.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// add event listener to form submit
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const url = urlInput.value;
    if (!isValidUrl(url)) {
      showToast("Invalid Url, Please check the Url and try again");
      return;
    }
    if (url) {
      let raw = JSON.stringify({
        url: url,
      });
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`/api/saveInsights`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            showToast(data.error);
            return;
          }
          updateTable();
        })
        .catch((error) => {
          showToast(error.message);
        });
      urlInput.value = "";
    }
  } catch (err) {
    console.log(err);
    showToast(err.message);
  }
});

//Function to view Previous History
async function fetchAllHistory() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  results.splice(0, results.length);
  return fetch("http://localhost:3000/api/listAll", requestOptions)
    .then((response) => response.json())
    .then((domains) => {
      domains.map((domain) => {
        let { name, fav, count, _id, timestamp } = domain;
        let dateAndTimeVal = new Date(timestamp).toLocaleString();
        results.push({
          url: name,
          wordCount: count,
          favourite: fav,
          id: _id,
          time: dateAndTimeVal,
        });
      });
    })
    .catch((error) => console.log("error", error));
}

// function to update table with results
async function updateTable() {
  await fetchAllHistory();
  resultsTable.innerHTML = ""; // clear existing rows
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.url}</td>
      <td>${result.wordCount}</td>
      <td>${result.time}</td>
      <td>
      <input id=${result.id} type="checkbox" ${
      result.favourite ? "checked" : ""
    } data-url="${result.url}" />
      </td>
      <td><button class="remove-btn" id=${result.id} data-url="${
      result.url
    }">Remove</button></td>
    `;

    resultsTable.appendChild(row);
  });

  // add event listeners to favourite checkboxes and remove buttons
  const favCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  favCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", handleFavourite)
  );
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => btn.addEventListener("click", handleRemove));
}

// function to handle favourite checkbox change
async function handleFavourite(e) {
  const url = e.target.dataset.url;
  const id = e.target.id;
  const index = results.findIndex((result) => result.url === url);
  results[index].favourite = e.target.checked;
  updateFavorite(url);
}

// function to handle remove button click
function handleRemove(e) {
  const id = e.target.id;
  removeById(id);
  const index = results.findIndex((result) => result.url === url);
  results.splice(index, 1);
  updateTable();
}

//Update Favorite
async function updateFavorite(url) {
  var raw = JSON.stringify({
    url: url,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/api/updateFavorite", requestOptions)
    .then((response) => response.text())
    .then((result) => updateTable())
    .catch((error) => console.log("error", error));
}

//Removes the Domain By Id
function removeById(id) {
  const raw = JSON.stringify({
    id: id,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let deleteDomain = fetch(
    "http://localhost:3000/api/deleteInsightById",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result;
    })
    .catch((error) => console.log("error", error));
}
