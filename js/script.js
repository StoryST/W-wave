const searchOpen = document.querySelector('.search-btn');
const search = document.querySelector('.search__form');
const searchClose = document.querySelector('.search');
const burger = document.querySelector('.burger');
const menuFrst = document.querySelector('.header__nav');
const menuLinks = menuFrst.querySelectorAll('.header__nav-link');
const menuScnd = document.querySelector('.scnd-nav');
const menuLinksScnd = menuScnd.querySelectorAll('.scnd-nav__link');
const mobilePlayerButton = document.querySelector('.players__mobile');
const mobileMenu = document.querySelector('.players__wrap-btn');
const mobileMenuClose = document.querySelector('.players');
const btnAnim = document.querySelector('.players__mobile-svg');
const podcastsBtn = document.querySelectorAll('.podcasts__btn');
const modal = new GraphModal();

document.querySelector('.sign-in-btn').addEventListener('click', () => {
  new GraphModal().open('sign-in');
});

document.querySelector('.archive-btn-state').addEventListener('click', function () {
  document.querySelector('.archive-btn-state .pause').classList.toggle('play-btn-active'),
    document.querySelector('.archive-btn-state .arhive-play').classList.toggle('play-btn-passive')
});

document.querySelector('.onair-btn-state').addEventListener('click', function () {
  document.querySelector('.onair-btn-state .pause').classList.toggle('play-btn-active'),
    document.querySelector('.onair-btn-state .on-air-play').classList.toggle('play-btn-passive')
});

burger.addEventListener('click',
  function () {
    burger.classList.toggle('burger--active');
    menuFrst.classList.toggle('header__nav--active');
    menuScnd.classList.toggle('scnd-nav--active');
    document.body.classList.toggle('stop-scroll');
  })

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menuFrst.classList.remove('header__nav--active');
    menuScnd.classList.remove('scnd-nav--active');
    document.body.classList.remove('stop-scroll');
  })

});

menuLinksScnd.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menuFrst.classList.remove('header__nav--active');
    menuScnd.classList.remove('scnd-nav--active');
    document.body.classList.remove('stop-scroll');
  })

});

mobilePlayerButton.addEventListener('click',
  function () {
    mobileMenu.classList.toggle('players__wrap--active');
    btnAnim.classList.toggle('players__mobile-svg--anim');
  })

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(mobileMenuClose);

  if (!withinBoundaries) {
    mobileMenu.classList.remove('players__wrap--active');
    btnAnim.classList.remove('players__mobile-svg--anim');
  }
});

podcastsBtn.forEach(function (el) {
  el.addEventListener('click', function (ev) {
    ev.stopPropagation();
    podcastsBtn.forEach(el => { if (el != this) { el.classList.remove('btn-passive') }; });
    this.classList.toggle('btn-passive');
  });
});

const element = document.querySelector('.select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false
});

const anchors = document.querySelectorAll('.header__nav-link, .footer__nav-link')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
};

searchOpen.addEventListener('click', function () {
  search.classList.add('search__show');
});

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(searchClose);

  if (!withinBoundaries) {
    search.classList.remove('search__show');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion__item');

  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const control = self.querySelector('.accordion__control');
      const content = self.querySelector('.accordion__content');

      self.classList.toggle('open');

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      }
    });
  });
});

const showMore = document.querySelector(".podcasts__btn-more");
const productsLength = document.querySelectorAll(".podcasts__item").length;
let items = 8;

showMore.addEventListener('click', () => {

  items += 2;
  const array = Array.from(document.querySelector(".podcasts__list").children);
  const visibleItems = array.slice(0, items);

  visibleItems.forEach((el) => el.classList.add("is-visible"));
  if (visibleItems.length === productsLength) {
    showMore.style.display = 'none';
  }

});

document.querySelectorAll('.guests-list__btn').forEach(function (guestsBtn) {
  guestsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.guests-list__btn').forEach(function (btn) {
      btn.classList.remove('guests-list__btn--active')
    });
    e.currentTarget.classList.add('guests-list__btn--active');
    document.querySelectorAll('.guests__card').forEach(function (guestsBtn) {
      guestsBtn.classList.remove('guests__card--active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('guests__card--active');
  });
});

const swiper = new Swiper('.swiper', {

  direction: 'horizontal',
  loop: true,

  breakpoints: {

    320: {
      slidesPerView: 2.31,
      spaceBetween: 20
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },

    1170: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
});

const validationModal = new JustValidate(".graph-modal-form", {
  errorLabelStyle: {
    color: '#D52B1E'
  },
  errorFieldStyle: {
    border: "1px solid #B81111"
  },
})

validationModal
  .addField('.graph-modal-form__login', [
    {
      rule: 'required',
      errorMessage: "Введите Логин",
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: "Минимум два символа",
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: "Максимум 15 символов",
    },
  ])
  .addField('.graph-modal-form__password', [
    {
      rule: 'required',
      errorMessage: "Введите Пароль",
    },
    {
      rule: 'required',
    },
    {
      rule: 'password',
      errorMessage: "Пароль может содержать только символы a-z, A-Z, точку '.' и символ подчеркивания '_'"
    },
  ])

validationModal.onSuccess(function () {
  document.getElementById("modal-form").submit();
});


const validationAbout = new JustValidate(".about__form", {
  errorLabelStyle: {
    color: '#D52B1E'
  },
  errorFieldStyle: {
    border: "1px solid #B81111"
  },
})

validationAbout
  .addField('.about__form-textarea', [
    {
      rule: 'required',
      errorMessage: "Расскажите что-нибудь о себе",
    },
    {
      rule: 'minLength',
      value: 7,
      errorMessage: "Слишком короткий рассказ, нужно минимум 7 символов",
    },
    {
      rule: 'maxLength',
      value: 250,
      errorMessage: "Максимум 250 символов",
    },
  ])
  .addField('.about__form-name', [
    {
      rule: 'required',
      errorMessage: "Введите Имя",
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: "Минимум два символа",
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: "Максимум 15 символов",
    },
  ])
  .addField('.about__form-mail', [
    {
      rule: 'required',
      errorMessage: "Введите E-mail",
    },
    {
      rule: 'required',
    },
    {
      rule: 'email',
      errorMessage: "Введите коректно E-mail"
    },
  ])

validationAbout.onSuccess(function () {
  document.getElementById("form").submit();
});

