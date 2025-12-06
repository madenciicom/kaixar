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
