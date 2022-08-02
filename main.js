"use strict";

// ? Mobile navigation functionalities
document.querySelector(".header__menu").addEventListener("click", function () {
  this.closest("header").classList.toggle("active-nav");
});

// ? Feature functionalities
let active_id = 1;

const alter_feature = function (obj) {
  const removeClass = document.querySelector(`.${obj.class1}--${obj.prev_id}`);
  removeClass.classList[obj.arr_method[0]](obj.class2);

  const addClass = document.querySelector(`.${obj.class1}--${obj.cur_id}`);
  addClass.classList[obj.arr_method[1]](obj.class2);
};

document
  .querySelector(".feature__main-list")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;

    if (
      target.className === "feature__main-list" ||
      target.className === "feature__list" ||
      target.classList.contains("feature__link--active")
    )
      return;

    const num_id = target.dataset.id;

    // arr_method the orders is really matters if not won't work
    alter_feature({
      class1: "feature__link",
      class2: "feature__link--active",
      prev_id: active_id,
      cur_id: num_id,
      arr_method: ["remove", "add"],
    });

    alter_feature({
      class1: "feature__img",
      class2: "feature__img--hide",
      prev_id: active_id,
      cur_id: num_id,
      arr_method: ["add", "remove"],
    });

    alter_feature({
      class1: "feature__content",
      class2: "feature__content--hide",
      prev_id: active_id,
      cur_id: num_id,
      arr_method: ["add", "remove"],
    });

    active_id = num_id;
  });

// ?FAQs functionalities
// I used Event delegation in accordion section for better performance
document
  .querySelector(".accordion__questions")
  .addEventListener("click", function (e) {
    e.target.closest(".question").classList.toggle("answer-active");
  });

// ? Sections functionalities
// Target sections
const tarSections = ["feature", "product", "accordion"];

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

tarSections.forEach((sectionClassName) => {
  const DOM = document.querySelector(`.${sectionClassName}`);

  DOM.classList.add("section--hidden");
  sectionObserver.observe(DOM);
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// when the user click contact us btn will triggered this
document.querySelector(".form__btn").addEventListener("click", function (e) {
  //preventing for goes to the top of page when the user click btn
  e.preventDefault();

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const userEmail = document.querySelector(".form__input").value;
  const formMessage = document.querySelector(".form__message");

  // For correct & wrong email animation
  const stateToggles = function (class1, class2) {
    this.closest(".form").classList.add(class1);
    this.closest(".form").classList.remove(class2);
  }.bind(this);

  if (userEmail.match(mailformat)) {
    formMessage.textContent = "Thank you, for your participation :)";
    stateToggles("passed-active", "error-active");
    return;
  }

  formMessage.textContent = "Whoops, make sure it's an emailsss";
  stateToggles("error-active", "passed-active");
});
