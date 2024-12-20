// get time
function getTimeString(time) {
  // get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond % 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

//1 - Fetch, Load and show Categories on html
//create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//Create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    
    <button onclick= "loadCategoryVideos(${item.category_id})" class="btn">
    ${item.category}
    </button>
    
    `;
    categoryContainer.append(buttonContainer);
  });
};

const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

// Create displayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    
    <div class= "min-h[500px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="./assets/Icon.png" alt=""/>
   <h2 class="text-center text-3xl font-bold">
      No Content Here In this Category
    </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  // console.log(videos);
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    
    <figure class ="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class = "absolute text-xs right-1 bottom-1 bg-black text-white rounded p-1">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
      
    </figure>
    <div class = "px-0 py-2 flex gap-2">
      <div>
      <img
        class="w-10 h-10 rounded-full object-cover"
        src="${video.authors[0].profile_picture}"
        alt=""
      />
      </div>
      
      
      <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-2">
      <p>${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? `
        <img class="w-5" src="./assets/icons8-verified-.png" alt="verified icon">`
        : ""
    }
    </div>
    </div>    
    </div>
    
    `;
    videoContainer.append(card);
  });
};

// call the function
loadCategories();
loadVideos();
