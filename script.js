let photos = [{
    src: "images/compl_project-1.png",
    //url: "images/compl_project-1.png",
    title: "Rostov-on-Don, Admiral"
  }, {
    src: "images/compl_project-2.png",
    //url: "images/compl_project-2.png",
    title: "Sochi Thieves"
  }, {
    src: "images/compl_project-3.png",
    //url: "images/compl_project-3.png",
    title: "Rostov-on-Don Patriotic"
  }];

function initSlider(options) {
  if (!photos || !photos.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: true
  };
  
  let sliderPhotos = document.querySelector(".slider__photos");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderNames = document.querySelector(".slider__names");
  
  initPhotos();
  initArrows();
  initNames(); 
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initPhotos() {
    photos.forEach((photo, index) => {
      let photoDiv = `<div class="photo n${index} ${index === 0? "active" : ""}" data-index="${index}"> <img src=${photos[index].src} alt="project_photo"> </div>`;
      //let photoDiv = `<div class="photo n${index} ${index === 0? "active" : ""}" style="background-image:url(${photos[index].url});" data-index="${index}"></div>`;
      sliderPhotos.innerHTML += photoDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderPhotos.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("prev")) {
          nextNumber = curNumber === 0? photos.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === photos.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    photos.forEach((photo, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function initNames() {
    photos.forEach((photo, index) => {
      let name =  `<li class="slider__names_item"><a href="#projects" class="slider__names_link n${index} ${index === 0? "slider__names_current active" : ""}" data-index="${index}">${photos[index].title}</a></li>`  
      sliderNames.innerHTML += name;
      
      
      //let name = photos[index].title;
      //sliderNames.querySelector(".slider__names_link").classList.add(`n${index}`);
      //sliderNames.querySelector(".slider__names_link").dataset.index = index;
      //sliderNames.querySelector(".slider__names_link").classList.add(index === 0? "slider__names_current" : "")

    //   `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
    //   sliderDots.innerHTML += dot;
    });
    sliderNames.querySelectorAll(".slider__names_link").forEach(name => {
        name.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  
  function moveSlider(num) {
    sliderPhotos.querySelector(".active").classList.remove("active");
    sliderPhotos.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }

  function changeName(num) {
    //if (!photos[num].title) return;
    sliderNames.querySelector(".active").classList.remove("active");
    sliderNames.querySelector(".n" + num).classList.add("active");
    //let sliderName = sliderNames.querySelector(".slider__photos-title");
    //sliderNames.innerText = cropTitle(photos[num].title, 50);
  }
  
  function initTitles() {
    let titleDiv = `<div class="slider__photos-title">${photos[0].title}</div>`;
    sliderPhotos.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!photos[num].title) return;
    let sliderTitle = sliderPhotos.querySelector(".slider__photos-title");
    sliderTitle.innerText = cropTitle(photos[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderPhotos.querySelector(".active").dataset.index;
      let nextNumber = curNumber === photos.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: false,
  autoplay: true,
  autoplayInterval: 10000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});