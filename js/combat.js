// Savaşın bitişi
function combatEnd(victory, nextChapter) {
    if (victory) {
        UI.setDialogue(
            "Zafer! Devam et.",
            [
                { label: "Devam", action: () => showChapter(nextChapter) }
            ]
        );
    } else {
        UI.setDialogue(
            "Kaybettin... Tekrar dene.",
            [
                { label: "Yeniden Başla", action: () => startCombat(lastEnemy, nextChapter) }
            ]
        );
    }
}
let player = { hp: 100 };
let enemyData = {};
let nextChapterAfterFight = 1;
let lastEnemy = {};

function startCombat(enemy, nextChap) {
    enemyData = enemy;
    nextChapterAfterFight = nextChap;
    lastEnemy = enemy;

    UI.renderScene(player, enemyData);

    UI.setDialogue(
        enemy.name + " saldırdı! Hazır mısın?",
        [
            { label: "Saldır", action: attackEnemy },
            { label: "Savun", action: defend },
            { label: "Özel Vuruş", action: special }
        ]
    );
}

function attackEnemy() {
    enemyData.hp -= 15;
    checkFight();
}

function defend() {
    player.hp += 5;
    if (player.hp > 100) player.hp = 100;
    enemyData.hp -= 5;
    checkFight();
}

function special() {
    enemyData.hp -= 25;
    checkFight();
}

function checkFight() {
    if (enemyData.hp <= 0) {
        combatEnd(true, nextChapterAfterFight);
        return;
    }

    // düşman saldırısı
    player.hp -= 10;

    if (player.hp <= 0) {
        combatEnd(false, nextChapterAfterFight);
        return;
    }

    UI.renderScene(player, enemyData);
    UI.setDialogue(
        "Saldırı / Savunma seç:",
        [
            { label: "Saldır", action: attackEnemy },
            { label: "Savun", action: defend },
            { label: "Özel", action: special }
        ]
    );
        }
