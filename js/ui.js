/* ui.js – Tüm oyun ekranını yöneten sistem */
const UI = {
    dialogueBox: null,
    choicesBox: null,
    logBox: null,
    sceneBox: null,

    init() {
        this.dialogueBox = document.getElementById("dialogue");
        this.choicesBox = document.getElementById("choices");
        this.logBox = document.getElementById("log");
        this.sceneBox = document.getElementById("scene");
    },

    /* Diyalog ve butonları gösterir */
    setDialogue(text, choices = []) {
        this.dialogueBox.innerText = text;

        this.choicesBox.innerHTML = "";
        choices.forEach(c => {
            const btn = document.createElement("button");
            btn.className = "choice-btn";
            btn.innerText = c.label;
            btn.onclick = c.action;
            this.choicesBox.appendChild(btn);
        });
    },

    /* Oyun günlüğüne yazı ekler */
    log(text) {
        const p = document.createElement("p");
        p.innerText = text;
        this.logBox.appendChild(p);
        this.logBox.scrollTop = this.logBox.scrollHeight;
    },

    /* Sahne (Kai vs düşman) */
    renderScene(player = {}, enemy = {}) {
        this.sceneBox.innerHTML = `
            <div class="stickman">
                <div class="head"></div>
                <div class="body"></div>
                <span>${player.name || ""}</span>
            </div>

            <div class="stickman">
                <div class="head"></div>
                <div class="body"></div>
                <span>${enemy.name || ""}</span>
            </div>
        `;
    }
};

window.onload = () => {
    UI.init();
};
