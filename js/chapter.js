function chapter1() {
    UI.renderScene({}, {}); // Boş sahne

    UI.setDialogue(
        "Kai: Nerede olduğumu hatırlamıyorum... Ama önümde bir yol var.",
        [
            { label: "İlerle", action: () => chapter1_part2() }
        ]
    );
}

function chapter1_part2() {
    UI.setDialogue(
        "Ormanın derinliklerinde bir gölge hareket ediyor...",
        [
            { label: "Yaklaş", action: () => startCombat({ name: "Orman Gölgesi", hp: 40 }, 2) },
            { label: "Kaç", action: () => chapter1_escape() }
        ]
    );
}

function chapter1_escape() {
    UI.setDialogue(
        "Kaçmaya çalıştın ama gölge seni buldu!",
        [
            { label: "Savaş", action: () => startCombat({ name: "Orman Gölgesi", hp: 40 }, 2) }
        ]
    );
}
function chapter2() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Bu terk edilmiş kamp… Burada birileri yaşamış olmalı.",
        [
            { label: "Etrafı incele", action: () => chapter2_part2() }
        ]
    );
}

function chapter2_part2() {
    UI.setDialogue(
        "Kai, yerde paslanmış bir silah parçası bulur. Görünüşe göre geliştirilebilir.",
        [
            { label: "Silahı al", action: () => chapter2_getWeapon() },
            { label: "Boşver", action: () => chapter2_skipWeapon() }
        ]
    );
}

function chapter2_getWeapon() {
    UI.log("Silah yükseltildi! Hasar +5");
    player.weapon = "Gelişmiş Çubuk";
    player.damageBoost = 5;

    UI.setDialogue(
        "Silahı aldın! Aniden bir ayak sesi…",
        [
            { label: "Hazırlan", action: () => startCombat({ name: "Kamp Haydudu", hp: 50 }, 3) }
        ]
    );
}

function chapter2_skipWeapon() {
    UI.setDialogue(
        "Silahı almadın… Ama birisi yaklaşıyor!",
        [
            { label: "Dön ve savaş", action: () => startCombat({ name: "Kamp Haydudu", hp: 50 }, 3) }
        ]
    );
}
