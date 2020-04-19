/******************************************************************************
 *                          Fetch and display Beers
 ******************************************************************************/

displayBeers();

function displayBeers() {
  httpGet("/api/beers/all")
    .then((response) => response.json())
    .then((response) => {
      var allBeers = response.beers;
      // Empty the anchor
      var allBeersAnchor = document.getElementById("all-beers-anchor");
      allBeersAnchor.innerHTML = "";
      // Append beers to anchor
      allBeers.forEach((beer) => {
        allBeersAnchor.innerHTML += getBeerDisplayElement(beer);
      });
    });
}

function getBeerDisplayElement(beer) {
  return `<div class="beer-display-ele">
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">${beer.name}</h5>
    <p class="card-text">${beer.catId}</p>
    <p class="card-text">${beer.descript}</p>
    <button class="edit-beer-btn btn btn-primary" data-beer-id="${beer.id}">
        Edit
    </button>
    <button class="delete-user-btn btn btn-danger" data-beer-id="${beer.id}">
        Delete
    </button>
    </div>
    </div>`;
}

/******************************************************************************
 *                        Add, Edit, and Delete Beers
 ******************************************************************************/

document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches("#add-beer-btn")) {
      addBeer();
    } else if (ele.matches(".edit-beer-btn")) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches(".cancel-edit-btn")) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches(".submit-edit-btn")) {
      submitEdit(ele);
    } else if (ele.matches(".delete-beer-btn")) {
      deleteBeer(ele);
    }
  },
  false
);

function addBeer() {
  var nameInput = document.getElementById("name-input");
  var catIdInput = document.getElementById("catId-input");
  var data = {
    beer: {
      name: nameInput.value,
      email: catIdInput.value,
    },
  };
  httpPost("/api/beers/add", data).then(() => {
    displayBeers();
  });
}

function showEditView(productEle) {
  var normalView = productEle.getElementsByClassName("normal-view")[0];
  var editView = productEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "none";
  editView.style.display = "block";
}

function cancelEdit(productEle) {
  var normalView = productEle.getElementsByClassName("normal-view")[0];
  var editView = productEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "block";
  editView.style.display = "none";
}

function submitEdit(ele) {
  var productEle = ele.parentNode.parentNode;
  var nameInput = productEle.getElementsByClassName("name-edit-input")[0];
  var catIdInput = userEle.getElementsByClassName("catId-edit-input")[0];
  var id = ele.getAttribute("data-beer-id");
  var data = {
    beer: {
      name: nameInput.value,
      catId: catIdInput.value,
      id: id,
    },
  };
  httpPut("/api/beers/update", data).then(() => {
    displayBeers();
  });
}

function deleteBeer(ele) {
  var id = ele.getAttribute("data-beer-id");
  httpDelete("/api/beers/delete/" + id).then(() => {
    displayBeers();
  });
}

function httpGet(path) {
  return fetch(path, getOptions("GET"));
}

function httpPost(path, data) {
  return fetch(path, getOptions("POST", data));
}

function httpPut(path, data) {
  return fetch(path, getOptions("PUT", data));
}

function httpDelete(path) {
  return fetch(path, getOptions("DELETE"));
}

function getOptions(verb, data) {
  var options = {
    dataType: "json",
    method: verb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
