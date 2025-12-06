/* combat.js – Basit çöp adam savaş sistemi */

function startCombat(enemyName, enemyHp) {
    const enemy = {
        name: enemyName,
        hp: enemyHp
    };

    UI.log(`${enemy.name} ortaya çıktı!`);

    UI.renderScene(player, enemy);

    UI.setDialogue(
        `${enemy.name} ile karşı karşıyasın!`,
        [
            { label: "Saldır", action: () => attackEnemy(enemy) },
            { label: "Savun", action: defendTurn },
            { label: "Kaç", action: runAway }
        ]
    );
}

function attackEnemy(enemy) {
    let dmg = Math.floor(10 + player.strengthBoost);

    enemy.hp -= dmg;
    UI.log(`Kai vurdu: -${dmg} HP`);
    UI.renderScene(player, enemy);

    if (enemy.hp <= 0) {
        UI.log(`${enemy.name} yenildi!`);
        UI.setDialogue(`${enemy.name} düştü.`, [
            { label: "Devam Et", action: () => nextChapterAfterFight() }
        ]);
        return;
    }

    enemyTurn(enemy);
}

function defendTurn() {
    UI.log("Kai savunmaya geçti!");
    player.defenseBoost += 5;

    setTimeout(() => {
        UI.log("Savunma etkisi geçti.");
        player.defenseBoost = 0;
    }, 1000);

    UI.setDialogue("Savunuyorsun...", []);
    setTimeout(() => nextEnemyTurnAuto(), 800);
}

function runAway() {
    UI.log("Kai kaçmaya çalıştı...");

    let chance = Math.random();
    if (chance > 0.6) {
        UI.log("Başarıyla kaçtın!");
        UI.setDialogue("Kurtuldun.", [
            { label: "Devam Et", action: () => nextChapterAfterFight() }
        ]);
    } else {
        UI.log("Kaçamadan yakalandın!");
        nextEnemyTurnAuto();
    }
}

function enemyTurn(enemy) {
    let dmg = Math.floor(8 - player.defenseBoost);
    if (dmg < 1) dmg = 1;

    player.hp -= dmg;
    UI.log(`${enemy.name} vurdu: -${dmg} HP`);

    if (player.hp <= 0) {
        UI.log("Kai yere düştü...");
        UI.setDialogue("Kaybettin...", [
            { label: "Tekrar Dene", action: () => goToChapter(1) }
        ]);
        return;
    }

    UI.setDialogue("Hamleni seç:", [
        { label: "Saldır", action: () => attackEnemy(enemy) },
        { label: "Savun", action: defendTurn },
        { label: "Kaç", action: runAway }
    ]);
}

function nextEnemyTurnAuto() {
    UI.log("Düşman hamle yaptı!");
    // Burada basit hasar veriyoruz
    player.hp -= 5;

    if (player.hp <= 0) {
        UI.log("Kai dayanamadı...");
        UI.setDialogue("Kaybettin!", [
            { label: "Tekrar Dene", action: () => goToChapter(1) }
        ]);
        return;
    }

    UI.setDialogue("Hamleni seç:", [
        { label: "Saldır", action: () => attackEnemy(currentEnemy) },
        { label: "Savun", action: defendTurn },
        { label: "Kaç", action: runAway }
    ]);
}

/* Savaş bittikten sonra bölüm değişimi buradan yapılır */
function nextChapterAfterFight() {
    goToChapter(currentChapter + 1);
}
