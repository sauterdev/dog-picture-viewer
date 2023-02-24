const dogDropDown = document.getElementById(`dogDropDown`);
const fetchButton = document.querySelector(`button`);
const loadImg = document.querySelector(".load-image");
const spinner = document.querySelector(".spinner");

// Builds drop down list of dog breeds
function getDogList() {
  const getList = fetch(`https://dog.ceo/api/breeds/list/all`);
  getList
    .then((res) => res.json())
    .then((data) => {
      const breedsArr = Object.keys(data.message);
      breedsArr.forEach((ele) => {
        const option = document.createElement(`option`);
        option.textContent = ele;
        option.value = ele;
        dogDropDown.appendChild(option);
      });
    })
    .catch((err) => err);
}
getDogList();

function getDogPic() {
  //shows emoji spinner and hides image during fetch
  spinner.classList.add("show");
  loadImg.classList.remove("show");
  //API call for iamges using dog breed as end point
  const value = document.getElementById(`dogDropDown`).value;
  const getDog = fetch(`https://dog.ceo/api/breed/${value}/images`);

  getDog
    .then((res) => res.json())
    .then((data) => {
      //picks a random image of selected dog breed
      const dogImgArr = Object.keys(data.message);
      const randNum = Math.floor(Math.random() * dogImgArr.length);
      loadImg.src = data.message[randNum];
    });
}

loadImg.addEventListener("load", () => {
  //removes emoji spinner, displays dog pic
  spinner.classList.remove("show");
  loadImg.classList.add("show");
});

fetchButton.addEventListener(`click`, getDogPic);
