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
function chapter3() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Bu vadi… Ses bile yankılanmıyor. Bir şey ters.",
        [
            { label: "İlerlemeye devam et", action: () => chapter3_shadow() }
        ]
    );
}

function chapter3_shadow() {
    UI.setDialogue(
        "Kai bir anlığına karanlık bir silüet görür. Uzun boylu, keskin hatlı… Xar’ın gölgesi olabilir.",
        [
            { label: "Peşinden git", action: () => chapter3_followShadow() },
            { label: "Geri dur ve yolu incele", action: () => chapter3_investigate() }
        ]
    );
}

/* 1) GÖLGEYİ TAKİP EDERSEN */
function chapter3_followShadow() {
    UI.setDialogue(
        "Kai hızla gölgenin peşinden koşar ama silüet bir anda kaybolur. Ardından ufak bir düşman ortaya çıkar.",
        [
            { label: "Hazırlan!", action: () => startCombat({ name: "Vadi Gözcüsü", hp: 60 }, 4) }
        ]
    );
}

/* 2) YOLU İNCELE DİYENLER */
function chapter3_investigate() {
    UI.setDialogue(
        "Kai dikkatlice zemini inceler ve eski bir tuzak fark eder. Hızlıca geri çekilir.",
        [
            { label: "Devam et", action: () => chapter3_trapReveal() }
        ]
    );
}

function chapter3_trapReveal() {
    UI.log("Tuzaktan kurtuldun! Savunma +3");
    player.defenseBoost = 3;

    UI.setDialogue(
        "Kai: Az daha eziliyordum. Bu vadide biri düzen kurmuş olmalı…",
        [
            { label: "Yola devam et", action: () => chapter3_enemyEncounter() }
        ]
    );
}

function chapter3_enemyEncounter() {
    UI.setDialogue(
        "Bir gözcü aniden Kai’nin önüne atlar!",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Vadi Gözcüsü", hp: 60 }, 4) }
        ]
    );
}
function chapter4() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Dağın tepesinde bir tapınak… Burası uzun zamandır terk edilmiş gibi.",
        [
            { label: "Tırmanmaya başla", action: () => chapter4_climb() }
        ]
    );
}

function chapter4_climb() {
    UI.setDialogue(
        "Kai dik kayalıklardan tırmanırken, bir ses duyar. Sessiz ama net.",
        [
            { label: "Sesi takip et", action: () => chapter4_meetEko() },
            { label: "Yoluna devam et", action: () => chapter4_continueAlone() }
        ]
    );
}

/* --- EKO İLE TANIŞMA SEÇENEĞİ --- */
function chapter4_meetEko() {
    UI.setDialogue(
        "??? : “Kimsin sen?”\nKai döner ve zayıf bir çöp adam silüeti görür. Bu, Eko’dur.",
        [
            { label: "Ben Kai’yim. Sen kimsin?", action: () => chapter4_talkEko() }
        ]
    );
}

function chapter4_talkEko() {
    UI.setDialogue(
        "Eko: “Tapınak mühürlü. Açmak için üç sembolü bulmak gerek.”",
        [
            { label: "Sembolleri sor", action: () => chapter4_symbols() },
            { label: "Yardım için teşekkür et", action: () => chapter4_continueAlone() }
        ]
    );
}

function chapter4_symbols() {
    UI.setDialogue(
        "Eko: “Sembol 1: Ağaç köklerinin altında.\nSembol 2: Kayanın gölgesinde.\nSembol 3: Kapıya en yakın yerde.”",
        [
            { label: "Sembolleri ara", action: () => chapter4_findSymbols() }
        ]
    );
}

function chapter4_findSymbols() {
    UI.log("Zeka +1 (Eko ile konuştuğun için)");

    player.intelligenceBoost = 1;

    UI.setDialogue(
        "Kai sembolleri daha hızlı bulur. Kapı parlamaya başlar.",
        [
            { label: "Tapınağa gir", action: () => chapter4_enterTemple() }
        ]
    );
}

/* --- TEK BAŞINA İLERLEYENLER --- */
function chapter4_continueAlone() {
    UI.setDialogue(
        "Kai tek başına devam eder. Sembolleri bulması daha uzun sürer.",
        [
            { label: "Araştır", action: () => chapter4_slowFind() }
        ]
    );
}

function chapter4_slowFind() {
    UI.setDialogue(
        "Kai sembolleri sonunda bulur ama yorulur.",
        [
            { label: "Tapınağa gir", action: () => chapter4_enterTemple() }
        ]
    );
}

/* --- TAPINAĞA GİRİŞ --- */
function chapter4_enterTemple() {
    UI.setDialogue(
        "Kapı ağır bir şekilde açılır... İçeri adım attığın anda bir muhafız belirir!",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Tapınak Muhafızı", hp: 80 }, 5) }
        ]
    );
}
function chapter5() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Tapınağın içi… Burası bambaşka bir dünya gibi. Işık ve gölge bir arada.",
        [
            { label: "İçeri ilerle", action: () => chapter5_firstRoom() }
        ]
    );
}

function chapter5_firstRoom() {
    UI.setDialogue(
        "Oda ikiye ayrılıyor. Solda parlak bir ışık. Sağda tamamen karanlık bir geçit.",
        [
            { label: "Işık odasına gir", action: () => chapter5_lightRoom() },
            { label: "Karanlık odaya gir", action: () => chapter5_darkRoom() }
        ]
    );
}

/* --- IŞIK ODASI SEÇENEK --- */
function chapter5_lightRoom() {
    UI.setDialogue(
        "Oda yumuşak bir ışıkla dolu. Duvarlarda eski yazılar var.",
        [
            { label: "Yazıları incele", action: () => chapter5_readRunes() },
            { label: "Geçip git", action: () => chapter5_hallway() }
        ]
    );
}

function chapter5_readRunes() {
    UI.log("Bilgi arttı! Zeka +1");
    if (!player.intelligenceBoost) player.intelligenceBoost = 0;
    player.intelligenceBoost += 1;

    UI.setDialogue(
        "Yazılar Kai’ye kadim bir uyarı veriyor: 'Gölge her zaman izler.'",
        [
            { label: "Devam et", action: () => chapter5_hallway() }
        ]
    );
}

/* --- KARANLIK ODA SEÇENEK --- */
function chapter5_darkRoom() {
    UI.setDialogue(
        "Oda tamamen sessiz. Kai bir fısıltı duyar.",
        [
            { label: "Fısıltıyı dinle", action: () => chapter5_hearShadow() },
            { label: "Hemen çık", action: () => chapter5_hallway() }
        ]
    );
}

function chapter5_hearShadow() {
    UI.setDialogue(
        "Ses: 'Kai… çok yaklaştın.'\nKai donakalır. Bu Xar’ın sesidir.",
        [
            { label: "Korkmadan ilerle", action: () => chapter5_hallway() }
        ]
    );
}

/* --- TAPINAK KORİDORU --- */
function chapter5_hallway() {
    UI.setDialogue(
        "Kai uzun bir koridora girer. Zeminde dev bir gölge belirir.",
        [
            { label: "Hazırlan!", action: () => chapter5_boss() }
        ]
    );
}

/* --- MİNİ BOSS --- */
function chapter5_boss() {
    UI.setDialogue(
        "Gölgeler birleşir… Tapınaktaki ilk büyük koruyucu ortaya çıkar!",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Gölge Koruyucu", hp: 110 }, 6) }
        ]
    );
}
function chapter6() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Burası… garip. Duvarlar değişiyor, sesler yankılanıyor.",
        [
            { label: "İçeri ilerle", action: () => chapter6_roomSelect() }
        ]
    );
}

function chapter6_roomSelect() {
    UI.setDialogue(
        "Koridor üç kapıya ayrılıyor. Her kapıda bir sembol var.",
        [
            { label: "Sembol: ⚪ (Denge)", action: () => chapter6_balanceRoom() },
            { label: "Sembol: ✦ (Cesaret)", action: () => chapter6_courageRoom() },
            { label: "Sembol: ❖ (Zihin)", action: () => chapter6_mindRoom() }
        ]
    );
}

/* --- DENGE ODASI --- */
function chapter6_balanceRoom() {
    UI.setDialogue(
        "Kai ortada duran bir platforma çıkar. Zemin titriyor.",
        [
            { label: "Dengeyi koru", action: () => chapter6_balanceOutcome() }
        ]
    );
}

function chapter6_balanceOutcome() {
    let gained = player.defenseBoost ? 2 : 1;
    player.defenseBoost = (player.defenseBoost || 0) + gained;
    UI.log("Savunma +" + gained);

    UI.setDialogue(
        "Kai dengesini buldu. Zemin düzeliyor.",
        [
            { label: "Koridora dön", action: () => chapter6_afterRooms() }
        ]
    );
}

/* --- CESARET ODASI --- */
function chapter6_courageRoom() {
    UI.setDialogue(
        "Karanlık bir odadasın. Duvarlarda adımların yankılanıyor.",
        [
            { label: "Adımları takip et", action: () => chapter6_courageOutcome() }
        ]
    );
}

function chapter6_courageOutcome() {
    UI.log("Güç +3");
    player.strengthBoost = (player.strengthBoost || 0) + 3;

    UI.setDialogue(
        "Kai karanlığa adım attıkça cesareti güçleniyor.",
        [
            { label: "Koridora dön", action: () => chapter6_afterRooms() }
        ]
    );
}

/* --- ZİHİN ODASI --- */
function chapter6_mindRoom() {
    UI.setDialogue(
        "Oda sessiz. Ortada kayan ışık parçaları var.",
        [
            { label: "Işıkları birleştir", action: () => chapter6_mindPuzzle() }
        ]
    );
}

function chapter6_mindPuzzle() {
    let bonus = player.intelligenceBoost ? 2 : 1;
    player.intelligenceBoost = (player.intelligenceBoost || 0) + bonus;

    UI.log("Zeka +" + bonus);

    UI.setDialogue(
        "Işıklar birleşir ve odanın kapısı açılır.",
        [
            { label: "Koridora dön", action: () => chapter6_afterRooms() }
        ]
    );
}

/* --- ODA SONRASI --- */
function chapter6_afterRooms() {
    UI.setDialogue(
        "Koridorun sonunda büyük bir kapı belirir… Ardından bir varlık ortaya çıkar.",
        [
            { label: "Hazırlan!", action: () => chapter6_boss() }
        ]
    );
}

/* --- ZİHİN BOSS — Zihin Gözcüsü --- */
function chapter6_boss() {
    UI.setDialogue(
        "Zihin Gözcüsü: “Zayıf zihin ilerleyemez.”",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Zihin Gözcüsü", hp: 130 }, 7) }
        ]
    );
}
function chapter7() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Burada hava değişiyor… Tapınağın kalbinden daha da derin bir yer burası.",
        [
            { label: "İçeri ilerle", action: () => chapter7_markings() }
        ]
    );
}

function chapter7_markings() {
    UI.setDialogue(
        "Kai duvarda bir sembol görür. Siyah bir X. Xar’ın işareti.",
        [
            { label: "İncele", action: () => chapter7_echoAppears() },
            { label: "Boşver, ilerle", action: () => chapter7_alone() }
        ]
    );
}

/* --- EKO ile ilerleyen yol --- */
function chapter7_echoAppears() {
    UI.setDialogue(
        "Eko aniden arkanda belirir: “Bu iz… Xar buradan geçmiş.”",
        [
            { label: "Xar’ı sor", action: () => chapter7_echoTalk() }
        ]
    );
}

function chapter7_echoTalk() {
    UI.setDialogue(
        "Eko: “Xar zihni bozabilir. Yaklaşırken dikkat et. İşaretler seni hem korur hem işaret eder.”",
        [
            { label: "İşareti takip et", action: () => chapter7_followTrail(true) }
        ]
    );
}

/* --- Tek başına ilerleme --- */
function chapter7_alone() {
    UI.setDialogue(
        "Kai yalnız ilerler. İşaretin anlamını çözemez ama yol karanlığa çıkar.",
        [
            { label: "Devam et", action: () => chapter7_followTrail(false) }
        ]
    );
}

/* --- İZİ TAKMA BÖLÜMÜ --- */
function chapter7_followTrail(withEko) {
    if (withEko) {
        UI.log("Eko’nun rehberliği: Savunma +2");
        player.defenseBoost = (player.defenseBoost || 0) + 2;
    }

    UI.setDialogue(
        "Kai uzun bir tünelden geçer. Tünelin sonunda bir ses yankılanır.",
        [
            { label: "Dinle", action: () => chapter7_hearXar() }
        ]
    );
}

function chapter7_hearXar() {
    UI.setDialogue(
        "Ses: “Kai… yaklaşıyorsun.”\nBu kez ses daha belirgin. Xar seni fark etmiş.",
        [
            { label: "Sakin kal", action: () => chapter7_encounter() }
        ]
    );
}

/* --- KARŞILAŞMA --- */
function chapter7_encounter() {
    UI.setDialogue(
        "Bir kapı açılır. Xar’ın en sadık korumalarından biri karşında belirir.",
        [
            { label: "Hazırlan", action: () => chapter7_boss() }
        ]
    );
}

/* --- MİNİ BOSS: Xar’ın Korumalarından Biri --- */
function chapter7_boss() {
    UI.setDialogue(
        "KORUMA: “Xar yaklaşmanı istemiyor.”",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Karanlık Koruma", hp: 150 }, 8) }
        ]
    );
}
function chapter8() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Bu merdiven… Üstte büyük bir güç hissediliyor. Xar’a çok yaklaştım.",
        [
            { label: "Merdivene yaklaş", action: () => chapter8_paths() }
        ]
    );
}

function chapter8_paths() {
    UI.setDialogue(
        "Merdivenin alt kısmı üç koridora ayrılıyor. Her biri farklı bir enerji yayıyor.",
        [
            { label: "Koridor: ⚡ Hız", action: () => chapter8_speedPath() },
            { label: "Koridor: 💥 Güç", action: () => chapter8_powerPath() },
            { label: "Koridor: ✧ Zeka", action: () => chapter8_wisdomPath() }
        ]
    );
}

/* --- HIZ YOLU --- */
function chapter8_speedPath() {
    UI.log("Hız +3 (kaçınma şansı artar)");
    player.speedBoost = (player.speedBoost || 0) + 3;

    UI.setDialogue(
        "Koridor dar ama hızlı. Kai refleks göstererek taşlardan kaçıyor.",
        [
            { label: "Koridora devam et", action: () => chapter8_eliteEncounter() }
        ]
    );
}

/* --- GÜÇ YOLU --- */
function chapter8_powerPath() {
    UI.log("Saldırı gücü +4");
    player.strengthBoost = (player.strengthBoost || 0) + 4;

    UI.setDialogue(
        "Koridorun duvarları ağır. Kai güç toplayarak ilerliyor.",
        [
            { label: "Koridora devam et", action: () => chapter8_eliteEncounter() }
        ]
    );
}

/* --- ZEKA YOLU --- */
function chapter8_wisdomPath() {
    UI.log("Zeka +3");
    player.intelligenceBoost = (player.intelligenceBoost || 0) + 3;

    UI.setDialogue(
        "Koridorun duvarlarında eski semboller var. Kai onları hızlıca çözüyor.",
        [
            { label: "Koridora devam et", action: () => chapter8_eliteEncounter() }
        ]
    );
}

/* --- ELİT DÜŞMAN KARŞILAŞMASI --- */
function chapter8_eliteEncounter() {
    UI.setDialogue(
        "Koridorun sonunda bir elit savaşçı belirir. Xar’ın enerjisi üzerinde parlıyor.",
        [
            { label: "Hazırlan!", action: () => chapter8_eliteFight() }
        ]
    );
}

/* --- ELİT SAVAŞ --- */
function chapter8_eliteFight() {
    UI.setDialogue(
        "Elit Savaşçı: “Xar seni görmek istiyor. Ama önce beni geçmelisin.”",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Elit Savaşçı", hp: 170 }, 9) }
        ]
    );
}
function chapter9() {
    UI.renderScene({}, {});

    UI.setDialogue(
        "Kai: Bu dev kapı… arkasında Xar’ın olduğu kesin.",
        [
            { label: "Kapıyı incele", action: () => chapter9_gate() }
        ]
    );
}

function chapter9_gate() {
    UI.setDialogue(
        "Kapı üç sembol istiyor:\n⚔ Güç\n✧ Zihin\n☯ Ruh",
        [
            { label: "Sembolleri etkinleştir", action: () => chapter9_checkStats() }
        ]
    );
}

/* --- KAPININ AÇILIP AÇILMAMASI --- */
function chapter9_checkStats() {

    let strength = player.strengthBoost || 0;
    let mind = player.intelligenceBoost || 0;
    let soul = player.defenseBoost || 0; // “ruh” = savunma/denge

    let total = strength + mind + soul;

    if (total >= 10) {
        UI.setDialogue(
            "Semboller parlıyor… Kai’nin gücü kapıyı açmaya yetti!",
            [
                { label: "İçeri gir", action: () => chapter9_openDoor() }
            ]
        );
    } else {
        UI.setDialogue(
            "Semboller zayıf kaldı… Kapı açılmıyor.",
            [
                { label: "Alternatif yöntem ara", action: () => chapter9_energyPuzzle() }
            ]
        );
    }
}

/* --- ENERJİ BULMACASI (stat düşük olanlar için) --- */
function chapter9_energyPuzzle() {
    UI.setDialogue(
        "Kai: Bir şekilde kapı için enerji yaratmalıyım…",
        [
            { label: "Enerjiyi odadan çek", action: () => chapter9_absorb() },
            { label: "Kendi enerjini odakla", action: () => chapter9_focus() }
        ]
    );
}

function chapter9_absorb() {
    UI.log("Zeka +2 (enerji kaynağını çözme)");
    player.intelligenceBoost = (player.intelligenceBoost || 0) + 2;

    UI.setDialogue(
        "Kai duvardaki sembolleri kullanarak ortam enerjisini toplar. Kapı titremeye başlar.",
        [
            { label: "Devam et", action: () => chapter9_openDoor() }
        ]
    );
}

function chapter9_focus() {
    UI.log("Ruh +2 (odaklanma)");
    player.defenseBoost = (player.defenseBoost || 0) + 2;

    UI.setDialogue(
        "Kai derin nefes alır, enerjisini bir noktaya toplar. Kapı tepki verir.",
        [
            { label: "Devam et", action: () => chapter9_openDoor() }
        ]
    );
}

/* --- KAPI AÇILINCA SON MİNİ SAVAŞ --- */
function chapter9_openDoor() {
    UI.setDialogue(
        "Kapı ağır bir şekilde açılır. İçeride son bir koruma vardır.",
        [
            { label: "Hazırlan", action: () => chapter9_lastGuardian() }
        ]
    );
}

function chapter9_lastGuardian() {
    UI.setDialogue(
        "Son Koruma: “Xar seni bekliyor… Ama önce beni geç.”",
        [
            { label: "Savaş!", action: () => startCombat({ name: "Son Koruma", hp: 190 }, 10) }
        ]
    );
    }
