import 'navigation.js'

//Shrinking Header on Scroll
window.addEventListener('scroll', function(){

  const target = document.querySelector('header');
    var sticky = target.offsetTop + 100;

    if (window.pageYOffset > sticky) {
      target.classList.add('sticky');
    } else {
       target.classList.remove('sticky');
    }

});

//Scroll & Parallax Function
window.addEventListener('scroll', function() {

  const target = document.querySelector('.lax');

  var scrolled = window.pageYOffset;
  var rate = scrolled * .35;

    if (target){
      target.style.transform = 'translate3D(0px, '+rate+'px, 0px)';
    }

});


//Smooth Scroll to Top function
document.querySelector('.scrollUp').addEventListener('click', function(){
  scrollTo(0, 0);
});


//Fade in when in view Function
const inViewport = (entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is_inview", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {
  threshold: 1
};

// Attach observer to every [data-inview] element:
const ELs_inViewport = document.querySelectorAll('[data]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});


// import Swiper bundle with all modules installed
import Swiper, { Lazy, Pagination, Navigation, Autoplay, EffectFade, EffectCards } from 'swiper';

//Quotes Slider
const qtsSwiper = new Swiper('.qts_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: 1,
  watchSlidesProgress: true,
  centeredSlides: true,

  modules: [Pagination, Navigation, Autoplay],

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev'
  },
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});


//Impressions Slider
const impsSwiper = new Swiper('.imps_swiper', {
  // Optional parameters
  loop: true,
  preloadImages: false,
  lazy: true,
  slidesPerView: 1,
  watchSlidesProgress: true,

  modules: [Autoplay, Pagination, Lazy, EffectFade],

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  lazy: {
    loadPrevNext: true
   },

  speed: 800,
  autoplay: {
    delay: 8000
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },

  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});

//ICards Slider
const crdsSwiper = new Swiper('.crds_swiper', {
  centerSlide: 'true',
  slidesPerView: 1,
  //initialSlide: 1,

  // Optional parameters
  modules: [EffectCards, Navigation, Pagination],

  effect: 'cards',
  cardsEffect: {
    grabCursor: true,
    rotate: true,
    slideShadows: false,
    //transformEl: 'swiper-slide'
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev'
  },
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }

});


//Import Accordion js
import Accordion from 'accordion-js';
const accordions = Array.from(document.querySelectorAll('.accordion-container'));

// User options
new Accordion(accordions, {
  duration: 400,
  showMultiple: false,
  ariaEnabled: true,
  onOpen: function(currentElement) {
  console.log(currentElement);
  }
});


import  gsap  from 'gsap';
import  ScrollTrigger  from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//gsap outofview fadeUp
const oov = gsap.utils.toArray('.oov');
  oov.forEach(oov => {
    gsap.from(oov, {
    y: 150,
    opacity: 0,
      scrollTrigger: {
        trigger: oov,
        scrub: 2,
        end: "bottom 90%"
      }
    })
});

//Form Success Message
  const form = document.getElementById("termin-form");
  const successMessage = document.getElementById("success-message");

  function toUrlEncoded(formData) {
    return new URLSearchParams(formData).toString();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    // Sicherheit: form-name immer mitsenden
    if (!data.has("form-name")) {
      data.append("form-name", form.getAttribute("name"));
    }

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toUrlEncoded(data),
      });

      // Formular ausblenden
      form.style.display = "none";

      // Success anzeigen + in den Viewport scrollen
      successMessage.classList.remove("hidden");
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    } catch (err) {
      alert("Fehler beim Absenden, bitte versuchen Sie es erneut.");
      console.error(err);
    }
  });

