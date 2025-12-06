// Basit kayıt sistemi

function saveGame(state) {
    localStorage.setItem("kai_game_save", JSON.stringify(state));
}

function loadGame() {
    const data = localStorage.getItem("kai_game_save");
    if (!data) return null;
    return JSON.parse(data);
}

function clearSave() {
    localStorage.removeItem("kai_game_save");
}
