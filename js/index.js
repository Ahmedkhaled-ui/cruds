var hamada,
  myindex,
  sitename = document.querySelector("#siteName"),
  website = document.querySelector("#website"),
  btn = document.querySelector("button"),
  popup = document.querySelector(".popup"),
  close = document.querySelector("#close");

function add() {
  if (hamada.some(function(e) { return e.website === website.value; })) {
    alert("Erorr the URL ");
    sitename.classList.remove("is-valid");
    website.classList.remove("is-valid");
    sitename.value = null;
    website.value = null;
    return;
  }
  if (
    sitename.classList.contains("is-valid") &&
    website.classList.contains("is-valid")
  ) {
    var e = { sitename: sitename.value, website: website.value };
    hamada.push(e);
    localStorage.setItem("data", JSON.stringify(hamada));
    display();
    clear();
    sitename.classList.remove("is-valid");
    website.classList.remove("is-valid");
  } else {
    popup.classList.replace("d-none", "d-flex");
  }
}

function display() {
  var e = "";
  for (var t = 0; t < hamada.length; t++) {
    e += `
      <div class="row bg-light my-2 mx-0 align-items-center border-bottom pb-3 ">
        <div class="col-lg col-ss col-md col-sm text-center ps-3 pe-0">${t + 1}</div>
        <div class="col-lg col-ss col-md col-sm text-center">
          <p class="mt-3 pe-5">${hamada[t].sitename}</p>
        </div>
        <div class="col-lg col-ss col-md col-sm text-center ">
          <button onclick="visit(${t})" class="btn btn-success text-center "><i class="fa-solid fa-eye pe-1 "></i>visit</button>
        </div>
        <div class="col-lg col-ss col-md col-sm text-center ">
          <button onclick="deleteName(${t})" class="btn btn-danger text-center  "><i class="fa-solid fa-trash-can pe-1 "></i>delete</button>
        </div>
        <div class="col-lg col-ss col-md col-sm text-center Edit">
          <button onclick="edit(${t})" class="btn btn-warning ms-2 px-3 text-center "><i class="fa-solid fa-pen mb-1 pe-1 "></i>Edit</button>
        </div>
      </div>
    `;
  }
  document.getElementById("display").innerHTML = e;
}

function deleteName(e) {
  hamada.splice(e, 1);
  localStorage.setItem("data", JSON.stringify(hamada));
  display();
}

function clear() {
  sitename.value = null;
  website.value = null;
}

function valedate(e) {
  if (
    /^[A-Z][a-z]{3,10}$/.test(e.value) || /^https?:\/\/[A-Za-z0-9.-]+\.(com)$/.test(e.value)
  ) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    e.nextElementSibling.classList.add("d-none");
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    e.nextElementSibling.classList.remove("d-none");
  }
}

function visit(e) {
  window.open(hamada[e].website, "_blank");
}

function edit(e) {
  myindex = e;
  sitename.value = hamada[e].sitename;
  website.value = hamada[e].website;
  sitename.classList.add("is-valid")
  website.classList.add("is-valid")
  btn.nextElementSibling.classList.remove("d-none");
  btn.classList.add("d-none");
}

function editinfo(e) {
  if (sitename.classList.contains("is-valid") && website.classList.contains("is-valid")) {
    hamada[e].sitename = sitename.value;
    hamada[e].website = website.value;
    display();
    localStorage.setItem("data", JSON.stringify(hamada));
    btn.nextElementSibling.classList.add("d-none");
    btn.classList.remove("d-none");
    sitename.value = null;
    website.value = null;
  sitename.classList.remove("is-valid")
  website.classList.remove("is-valid")
  

  } else {
    popup.classList.replace("d-none", "d-flex");
  }
}

if (localStorage.getItem("data") == null) {
  hamada = [];
} else {
  hamada = JSON.parse(localStorage.getItem("data"));
  display();
}

close.addEventListener("click", function() {
  popup.classList.replace("d-flex", "d-none");
});

btn.addEventListener("click", add);

website.addEventListener("input", function() {
  valedate(this);
});

sitename.addEventListener("input", function() {
  valedate(this);
});

document.addEventListener("click", function(e) {
  if (e.target == popup) {
    popup.classList.replace("d-flex", "d-none");
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key == "Escape") {
    popup.classList.replace("d-flex", "d-none");
  }
});

btn.nextElementSibling.addEventListener("click", function() {
  editinfo(myindex);
});
