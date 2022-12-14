let photos = [{
    src: "images/compl_project-1.png",
    title: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don",
    district: "LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "Upon request"
  }, {
    src: "images/compl_project-2.png",
    title: "Sochi Thieves",
    city: "Sochi",
    district: "Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "Upon request"
  }, {
    src: "images/compl_project-3.png",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don",
    district: "Patriotic",
    area: "93 m2",
    time: "3 months",
    cost: "Upon request"
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
  
  function initPhotos(num) {
    sliderPhotos.querySelector(".slider__photo").src = photos[num].src;
  }
  
  function initArrows() {
    let prev = document.querySelectorAll('.prev')
    let next = document.querySelectorAll('.next')
    let currentIndex = 0

    prev.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        if (currentIndex === 0) {
          currentIndex = photos.length-1
          moveSlider(currentIndex);
        
        } else {
          currentIndex -= 1;
          moveSlider(currentIndex);
        }
      })
    });
    
    next.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        if (currentIndex === photos.length-1) {
          currentIndex = 0;
          moveSlider(currentIndex);
        
        } else {
          currentIndex += 1;
          moveSlider(currentIndex);
        }   
      })
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
      let name =  `<li class="slider__names_item"><a href="#projects" class="slider__names_link n${index} ${index === 0? "active" : ""}" data-index="${index}">${photos[index].title}</a></li>`  
      sliderNames.innerHTML += name;
      
    });
    sliderNames.querySelectorAll(".slider__names_link").forEach(name => {
        name.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  
  function moveSlider(num) {
    initPhotos(num);
    if (options.titles) changeTitle(num);

    sliderNames.querySelector(".active").classList.remove("active");
    sliderNames.querySelector(".n" + num).classList.add("active");
    changeParams(num);

    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }

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

  function changeParams(num) {
    let sliderParamsCity = document.querySelector(".slider__params_city");
    let sliderParamsDistrict = document.querySelector(".slider__params_district");
    let sliderParamsArea = document.querySelector(".slider__params_area");
    let sliderParamsTime = document.querySelector(".slider__params_time");
    let sliderParamsCost = document.querySelector(".slider__params_cost");

    sliderParamsCity.innerText = photos[num].city;
    sliderParamsDistrict.innerText = photos[num].district;
    sliderParamsArea.innerText = photos[num].area;
    sliderParamsTime.innerText = photos[num].time;
    sliderParamsCost.innerText = photos[num].cost;
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
  autoplay: false,
  autoplayInterval: 10000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});