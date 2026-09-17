import "./navigation.js";

function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
}

function initScrollUp() {
  const trigger = document.querySelector(".scrollUp");

  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: "smooth" });
  });
}

async function initGsapScrollFeatures() {
  const header = document.querySelector("header");
  const fadeTargets = document.querySelectorAll('[data-animate="fade-up"]');
  const animatedTargets = document.querySelectorAll(".oov");

  if (!header && !fadeTargets.length && !animatedTargets.length) {
    return;
  }

  const { default: gsap } = await import("gsap");
  const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  const createRevealTrigger = (target) => {
    const defaults = {
      distance: 60,
      start: "top 96%",
      end: "top 75%",
      scrub: 2,
      ease: "none"
    };

    const distance = target.dataset.distance ? parseFloat(target.dataset.distance) || defaults.distance : defaults.distance;
    const start = target.dataset.start || defaults.start;
    const end = target.dataset.end || defaults.end;
    const delay = target.dataset.delay ? parseFloat(target.dataset.delay) || 0 : 0;
    const scrubAttr = target.dataset.scrub;
    let scrub = defaults.scrub;

    if (typeof scrubAttr !== "undefined") {
      if (scrubAttr === "false" || scrubAttr === "0") {
        scrub = false;
      } else if (scrubAttr === "true") {
        scrub = true;
      } else {
        const parsed = parseFloat(scrubAttr);
        scrub = Number.isNaN(parsed) ? defaults.scrub : parsed;
      }
    }

    const ease = target.dataset.ease || defaults.ease;
    const once = target.hasAttribute("data-once");

    gsap.set(target, {
      clearProps: "transition"
    });

    return gsap.fromTo(
      target,
      {
        opacity: 0,
        y: distance
      },
      {
        opacity: 1,
        y: 0,
        delay,
        ease,
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          trigger: target,
          start,
          end,
          scrub,
          once,
          invalidateOnRefresh: true
        }
      }
    );
  };

  if (header) {
    const updateScrollEffects = (scrollY) => {
      const stickyThreshold = header.offsetTop + 100;
      header.classList.toggle("sticky", scrollY > stickyThreshold);
    };

    updateScrollEffects(window.pageYOffset);

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        updateScrollEffects(self.scroll());
      }
    });
  }

  fadeTargets.forEach((target) => {
    createRevealTrigger(target);
  });

  animatedTargets.forEach((target) => {
    gsap.set(target, {
      clearProps: "transition"
    });

    gsap.fromTo(target,
      {
        opacity: 0,
        y: 150
      },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
          end: "bottom 90%",
          scrub: 2,
          invalidateOnRefresh: true
        }
      }
    );
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  }, { once: true });
}

function runWhenVisible(selector, callback, options = {}) {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    callback();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries;

    if (!entry?.isIntersecting) {
      return;
    }

    observer.disconnect();
    callback();
  }, options);

  observer.observe(target);
}

async function initAccordion() {
  const accordions = Array.from(document.querySelectorAll(".accordion-container"));

  if (!accordions.length) {
    return;
  }

  const { default: Accordion } = await import("accordion-js");

  new Accordion(accordions, {
    duration: 400,
    showMultiple: false,
    ariaEnabled: true
  });
}

async function initSliders() {
  const hasQuotes = document.querySelector(".qts_swiper");
  const hasImpressions = document.querySelector(".imps_swiper");
  const hasCards = document.querySelector(".crds_swiper");

  if (!hasQuotes && !hasImpressions && !hasCards) {
    return;
  }

  const swiperModule = await import("swiper");
  const {
    default: Swiper,
    Lazy,
    Pagination,
    Navigation,
    Autoplay,
    EffectFade,
    EffectCards
  } = swiperModule;

  if (hasQuotes) {
    new Swiper(".qts_swiper", {
      direction: "horizontal",
      loop: false,
      slidesPerView: 1,
      watchSlidesProgress: true,
      centeredSlides: true,
      modules: [Pagination, Navigation, Autoplay],
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev"
      },
      renderBullet(index, className) {
        return `<span class="${className}">${index + 1}</span>`;
      }
    });
  }

  if (hasImpressions) {
    new Swiper(".imps_swiper", {
      loop: true,
      preloadImages: false,
      lazy: true,
      slidesPerView: 1,
      watchSlidesProgress: true,
      modules: [Autoplay, Pagination, Lazy, EffectFade],
      effect: "fade",
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
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      renderBullet(index, className) {
        return `<span class="${className}">${index + 1}</span>`;
      }
    });
  }

  if (hasCards) {
    new Swiper(".crds_swiper", {
      centerSlide: true,
      slidesPerView: 1,
      modules: [EffectCards, Navigation, Pagination],
      effect: "cards",
      cardsEffect: {
        grabCursor: true,
        rotate: true,
        slideShadows: false
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev"
      },
      renderBullet(index, className) {
        return `<span class="${className}">${index + 1}</span>`;
      }
    });
  }
}

function initTerminForm() {
  const form = document.getElementById("termin-form");
  const successMessage = document.getElementById("success-message");

  if (!form || !successMessage) {
    return;
  }

  function toUrlEncoded(formData) {
    return new URLSearchParams(formData).toString();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);

    if (!data.has("form-name")) {
      data.append("form-name", form.getAttribute("name"));
    }

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toUrlEncoded(data)
      });

      form.style.display = "none";
      successMessage.classList.remove("hidden");
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      alert("Fehler beim Absenden, bitte versuchen Sie es erneut.");
      console.error(error);
    }
  });
}

onReady(async () => {
  await initGsapScrollFeatures();
  initScrollUp();
  initTerminForm();

  runWhenVisible(".accordion-container", () => {
    initAccordion();
  }, { rootMargin: "300px 0px" });

  runWhenVisible(".qts_swiper, .imps_swiper, .crds_swiper", () => {
    initSliders();
  }, { rootMargin: "400px 0px" });

});
