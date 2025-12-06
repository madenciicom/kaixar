

function startGame() {
    loadProgress();
    showChapter(1);
}

function showChapter(num) {
    switch(num) {
        case 1: chapter1(); break;
        case 2: chapter2(); break;
        case 3: chapter3(); break;
        case 4: chapter4(); break;
        case 5: chapter5(); break;
        case 6: chapter6(); break;
        case 7: chapter7(); break;
        case 8: chapter8(); break;
        case 9: chapter9(); break;
        case 10: chapter10(); break;
        default:
            UI.setDialogue("Oyun bitti! Kai, Xar'ı yendi!", []);
    }

    saveProgress({ chapter: num });
}
