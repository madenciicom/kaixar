/* game.js – Oyunun başlangıcı ve oyuncu verileri */

let player = {
    name: "Kai",
    hp: 100,
    maxHp: 100,
    strengthBoost: 0,
    intelligenceBoost: 0,
    defenseBoost: 0,
    weapon: "Sıradan Çubuk"
};

/* Oyun başlangıcı */
function startGame() {
    UI.log("Oyun yükleniyor...");
    UI.log("Kai uyanıyor...");

    // İlk bölümü başlat
    chapter1();
}

/* Bölüm geçiş sistemi */
function goToChapter(n) {
    if (typeof window[`chapter${n}`] === "function") {
        window[`chapter${n}`]();
    } else {
        UI.setDialogue(`chapter${n} bulunamadı!`, []);
    }
}

/* Sayfa tamamen hazır olunca çalışır */
window.addEventListener("load", () => {
    UI.init();
    startGame();
});
