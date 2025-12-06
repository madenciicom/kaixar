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
