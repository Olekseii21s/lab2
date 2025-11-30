"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ===== СТВОРЮЄМО МОДАЛКУ =====
const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.8)";
modal.style.display = "none";
modal.style.flexDirection = "column";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.padding = "20px";
modal.style.boxSizing = "border-box";
modal.style.overflowY = "auto";
modal.style.zIndex = "9999";
// картинка
const modalImg = document.createElement("img");
modalImg.style.maxWidth = "80%";
modalImg.style.maxHeight = "60%";
modalImg.style.marginBottom = "20px";
// текст з JSON
const modalText = document.createElement("div");
modalText.style.color = "white";
modalText.style.textAlign = "center";
modalText.style.maxWidth = "80%";
modalText.style.background = "rgba(0,0,0,0.5)";
modalText.style.padding = "10px";
modalText.style.borderRadius = "8px";
modal.appendChild(modalImg);
modal.appendChild(modalText);
document.body.appendChild(modal);
// закриття модалки по кліку на фон
modal.addEventListener("click", () => {
    modal.style.display = "none";
});
// ===== FETCH ДАНИХ З JSONPLACEHOLDER =====
function fetchPost() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/posts/" + (Math.floor(Math.random() * 100) + 1));
        const data = yield res.json();
        return { title: data.title, body: data.body };
    });
}
// ===== ВІДКРИТТЯ МОДАЛКИ ПО КЛІКУ НА ФОТО =====
const images = document.querySelectorAll(".gallery a img");
images.forEach(img => {
    img.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // ставимо картинку
        const link = img.parentElement;
        modalImg.src = link.href;
        // завантажуємо текст з JSONPlaceholder
        modalText.innerHTML = "Loading...";
        const post = yield fetchPost();
        modalText.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        modal.style.display = "flex";
    }));
});
// ===== SCROLL EFFECT =====
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header)
        return;
    if (window.scrollY > 120)
        header.classList.add("scrolled");
    else
        header.classList.remove("scrolled");
});
