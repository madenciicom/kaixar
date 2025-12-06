// Basit UI yöneticisi
const UI = {
    dialogueBox: null,
    choicesBox: null,
    logBox: null,

    init() {
        this.dialogueBox = document.getElementById("dialogue");
        this.choicesBox = document.getElementById("choices");
        this.logBox = document.getElementById("log");
    },

    // Diyalog yazdırma
    setDialogue(text, choices = []) {
        this.dialogueBox.innerText = text;

        this.choicesBox.innerHTML = "";
        choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.innerText = choice.label;
            btn.onclick = choice.action;
            this.choicesBox.appendChild(btn);
        });
    },

    // Log alanına bilgi ekleme
    log(text) {
        const p = document.createElement("p");
        p.innerText = text;
        this.logBox.appendChild(p);
        this.logBox.scrollTop = this.logBox.scrollHeight;
    },

    // Sahne (karakter + düşman) çizimi
    renderScene(playerData = {}, enemyData = {}) {
        const scene = document.getElementById("scene");

        scene.innerHTML = `
            <div class="stickman player">${playerData.name || ""}</div>
            <div class="stickman enemy">${enemyData.name || ""}</div>
        `;
    }
};

// Sayfa yüklenince UI çalışsın
window.onload = () => {
    UI.init();
};
