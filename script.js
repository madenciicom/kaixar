const scripts = [
  { id: 1, title: "Combat Script", code: "print('Combat aktif')", category: "combat" },
  { id: 2, title: "Admin Script", code: "print('Admin aktif')", category: "admin" },
  { id: 3, title: "GUI Script", code: "print('GUI aktif')", category: "gui" },
  { id: 4, title: "Pet Sim Script", code: "print('Pet Sim aktif')", category: "petsim" }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
let comments = JSON.parse(localStorage.getItem("comments")) || {};

const scriptGrid = document.getElementById("scriptGrid");
const favList = document.getElementById("favList");
const searchInput = document.getElementById("searchInput");
const categoryChips = document.querySelectorAll(".chip");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalCode = document.getElementById("modalCode");
const copyBtn = document.getElementById("copyBtn");
const closeModal = document.getElementById("closeModal");
const starContainer = document.getElementById("starContainer");
const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const addComment = document.getElementById("addComment");

let currentScriptId = null;

function renderScripts() {
  scriptGrid.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const activeCategory = document.querySelector(".chip.active").dataset.category;
  scripts.forEach(s => {
    if ((activeCategory === "all" || s.category === activeCategory) && s.title.toLowerCase().includes(search)) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="title">${s.title}</div>
        <div class="btns">
          <button class="btn viewBtn">Görüntüle</button>
          <button class="btn favBtn">${favorites.includes(s.id) ? "Favoriden Çıkar" : "Favori Ekle"}</button>
        </div>
      `;
      card.querySelector(".viewBtn").onclick = () => openModal(s.id);
      card.querySelector(".favBtn").onclick = () => toggleFavorite(s.id);
      scriptGrid.appendChild(card);
    }
  });
}

function renderFavorites() {
  favList.innerHTML = "";
  favorites.forEach(id => {
    const s = scripts.find(sc => sc.id === id);
    if (s) {
      const div = document.createElement("div");
      div.textContent = s.title;
      favList.appendChild(div);
    }
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderScripts();
  renderFavorites();
}

function openModal(id) {
  currentScriptId = id;
  const s = scripts.find(sc => sc.id === id);
  modalTitle.textContent = s.title;
  modalCode.textContent = s.code;
  renderStars();
  renderComments();
  modal.style.display = "flex";
}

function closeModalFunc() {
  modal.style.display = "none";
}

copyBtn.onclick = () => {
  navigator.clipboard.writeText(modalCode.textContent);
  copyBtn.textContent = "Kopyalandı!";
  setTimeout(() => copyBtn.textContent = "Kopyala", 1500);
};

closeModal.onclick = closeModalFunc;
window.onclick = e => { if (e.target === modal) closeModalFunc(); };

function renderStars() {
  starContainer.innerHTML = "";
  const rate = ratings[currentScriptId] || 0;
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = i <= rate ? "★" : "☆";
    star.style.cursor = "pointer";
    star.onclick = () => {
      ratings[currentScriptId] = i;
      localStorage.setItem("ratings", JSON.stringify(ratings));
      renderStars();
    };
    starContainer.appendChild(star);
  }
}

function renderComments() {
  commentList.innerHTML = "";
  const scriptComments = comments[currentScriptId] || [];
  scriptComments.forEach(c => {
    const div = document.createElement("div");
    div.textContent = c;
    commentList.appendChild(div);
  });
}

addComment.onclick = () => {
  const text = commentInput.value.trim();
  if (text) {
    if (!comments[currentScriptId]) comments[currentScriptId] = [];
    comments[currentScriptId].push(text);
    localStorage.setItem("comments", JSON.stringify(comments));
    commentInput.value = "";
    renderComments();
  }
};

searchInput.oninput = renderScripts;
categoryChips.forEach(chip => {
  chip.onclick = () => {
    categoryChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderScripts();
  };
});

renderScripts();
renderFavorites();
