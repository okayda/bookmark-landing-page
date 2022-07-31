document
  .querySelector(".accordion__questions")
  .addEventListener("click", function (e) {
    e.target.closest(".question").classList.toggle("answer-active");
  });

document.querySelector(".form__btn").addEventListener("click", function (e) {
  e.preventDefault();
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const userEmail = document.querySelector(".form__input").value;
  const formMessage = document.querySelector(".form__message");

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

document.querySelector(".header__menu").addEventListener("click", function () {
  this.closest("header").classList.toggle("active-nav");
});
