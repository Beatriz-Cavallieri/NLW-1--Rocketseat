const openSearchModal = document.querySelector("#go-to-search");
const modalWindow = document.querySelector("#modal");
const closeModal = document.querySelector("#close");

openSearchModal.addEventListener("click", () => modalWindow.classList.remove("hide"));
closeModal.addEventListener("click", () => modalWindow.classList.add("hide"));