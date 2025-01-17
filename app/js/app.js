// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import AOS from "aos";

import Swiper from "swiper";
import { Navigation, Pagination, Thumbs, Grid } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  // Custom JS
  AOS.init({ once: true });
  hoverProcessItems();
  services();
  toggleMenu();
  reviews();
  works();
  popup();
});

function appendIframe () {
  const iframeContainer = document.querySelector('.iframe')
  const iframeSrc = ""
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', iframeSrc)
  iframeContainer.appendChild(iframe)
}
function works() {
  var swiper = new Swiper(".works-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination"
    },
    navigation: {
      nextEl: ".works-button-next",
      prevEl: ".works-button-prev",
    },
    modules: [Navigation, Pagination],
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });
}
function reviews() {
  var swiper = new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".reviews-button-next",
      prevEl: ".reviews-button-prev",
    },
    modules: [Navigation, Pagination],
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      },
  });
}
function services () {
  let servicesThumbnailSwiper = new Swiper(".services-thumbnail-swiper", {
    slidesPerView: 6,
    // spaceBetween: 16,
    watchSlidesProgress: true,
    // autoHeight: true

  });

  let servicesSwiper = new Swiper(".services-swiper", {
    slidesPerView: 1,
    spaceBetween: 12,
    // autoHeight: true,
    navigation: {
      nextEl: ".services-button-next",
      prevEl: ".services-button-prev",
    },
    pagination: {
      el: ".swiper-pagination"
    },
    modules: [Navigation, Pagination, Thumbs],
    thumbs: {
      swiper: servicesThumbnailSwiper,
    },
  });
}
function toggleMenu() {
  let btn = document.querySelector(".header__btn");
  let menu = document.querySelector(".header-mob");

  btn.addEventListener("click", function (e) {
    menu.style.display = "block";
    setTimeout(function () {
      menu.classList.add("header-mob--open");
    }, 100);
  });

  menu.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("header-mob__close") ||
      e.target === e.currentTarget
    ) {
      menu.classList.remove("header-mob--open");
      setTimeout(function () {
        menu.style.display = "none";
      }, 400);
    } else if (e.target.classList.contains("menu__link")) {
      menu.classList.remove("header-mob--open");
      setTimeout(function () {
        menu.style.display = "none";
      }, 400);
    }
  });
}
function hoverProcessItems() {
  let items = document.querySelectorAll(".process__item");
  let visualItems = document.querySelectorAll(".process-visual__item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("mouseover", function (e) {
      visualItems[i].classList.add("active");
    });
    items[i].addEventListener("mouseout", function (e) {
      visualItems[i].classList.remove("active");
    });
  }
}
function popup() {
  let popupForm = document.querySelector(".popup[data-type='form']");
  let popupSuccess = document.querySelector(".popup[data-type='success']");
  let popupError = document.querySelector(".popup[data-type='error']");
  let form = document.querySelector('.js-form')

  let buttons = document.querySelectorAll(".js-open-popup");
  let activePopup
    
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      popupForm.classList.add('active')
      activePopup = popupForm
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      activePopup.classList.remove("active");
    }
  })


  function togglePopup (type) {
    activePopup.classList.remove('active')
    if (type === 'success') {
      popupSuccess.classList.add('active')
      activePopup = popupSuccess
    } else if (type === 'error') {
      popupError.classList.add('active')
      activePopup = popupError
    }

    setTimeout(function () {
      activePopup.classList.remove("active");
    }, 3000)
  }



  function submitRequest() {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      let formData = new FormData(e.target)
      let work = []
      for (let [key, value] of formData.entries()) {
        if (key === 'work') {
          work.push(value)
        }
    }
    formData.set('work', work.join('; '))
      try {
        let response = await fetch('/telegram.php', {
          method: 'POST',
          body: formData
        })
        let answer = await response.json()
        togglePopup(answer.status)
      } catch (e) {
        togglePopup('error')
        console.log(e.message)
      }

      form.reset();
    });
  }

  submitRequest();
}


// window.addEventListener('load', function () {
//   hideLoader();
// })

// function hideLoader() {
//   let loader = document.querySelector(".loader-wrap");
//   loader.style.display = "none";
//   document.body.classList.add("animate");
// }
