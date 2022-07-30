document
  .querySelector(".accordion__questions")
  .addEventListener("click", function (e) {
    e.target.closest(".question").classList.toggle("answer-active");
  });
