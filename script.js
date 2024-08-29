let dataInject = document.getElementById("dataInject");
let input = document.getElementById("input");
let Btn = document.getElementById("Btn");

let apiName = "https://api.nasa.gov";
let apiEndpoint =
  "/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&page=1";
let apiKey = "&api_key=AFQpulSO0wFh6gMescZMJcFqEZjhj60FdUrvgSbQ";

Btn.addEventListener("click", function (e) {
  dataInject.innerHTML = "";
  fetchfunction(
    apiName +
      `/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${input.value}&page=1` +
      apiKey
  );
});

async function fetchfunction(url) {
  const response = await fetch(url);
  if (response.ok) {
    let jsonData = await response.json();
    console.log(jsonData.photos);

    if (Array.isArray(jsonData.photos)) {
      jsonData.photos.forEach((photos) => {
        displayData(photos);
      });
    }
  }
}

function displayData(data) {
  // image
  let imgCol = document.createElement("div");
  imgCol.className = "col-12";

  let img = document.createElement("img");
  img.setAttribute("src", data.img_src);
  img.className = "img-fluid maxHeight";

  imgCol.appendChild(img);

  // text
  let textCol = document.createElement("div");
  textCol.className = "col-12";

  let CameraType = document.createElement("h2");
  CameraType.innerText = " View: " + data.camera.full_name;

  let roverName = document.createElement("h2");
  roverName.innerText = " Rover Name: " + data.rover.name;

  let roverStatus = document.createElement("h2");
  roverStatus.innerText = " Status: " + data.roverStatus;

  textCol.appendChild(CameraType);
  textCol.appendChild(roverName);
  textCol.appendChild(roverStatus);

  dataInject.appendChild(imgCol);
  dataInject.appendChild(textCol);
}
