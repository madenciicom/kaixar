/* chapters.js
   10 bölüm — tek dosya. Her bölümde diyaloglar, seçimler, stat değişimleri, savaşlar.
   Uyumluluk: game.js içinde goToChapter(n) veya chapter1() başlangıcı ile çalışır.
*/

/* Küresel izleyiciler (combat.js bekleyebilir) */
window.currentChapter = 1;
window.currentEnemy = null;

/* Yardımcı: combat.js ile uyumlu şekilde savaş başlatır */
function startCombatChapter(enemyName, enemyHp, chapterNumber) {
  // global set
  window.currentEnemy = { name: enemyName, hp: enemyHp };
  window.currentChapter = chapterNumber || window.currentChapter || 1;

  // call combat system (combat.js expects startCombat(name,hp))
  if (typeof startCombat === "function") {
    startCombat(enemyName, enemyHp);
  } else {
    UI.log("Hata: startCombat fonksiyonu bulunamadı.");
    UI.setDialogue("Savaş sistemi hazır değil.", []);
  }
}

/* --- BÖLÜM 1: Kai'nin Uyanışı --- */
function chapter1() {
  window.currentChapter = 1;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 1 — Kai'nin Uyanışı\n\nKai gözlerini açar. Köyünden uzakta, ürkütücü bir sessizlik var.",
    [
      { label: "Ayağa kalk ve etrafa bak", action: () => {
          UI.log("Kai etrafa bakıyor...");
          UI.setDialogue(
            "İleri doğru bir patika görüyorsun. Ormana doğru gidiyor.",
            [
              { label: "Patikaya gir", action: () => chapter1_part2() }
            ]
          );
        }
      }
    ]
  );
}

function chapter1_part2() {
  UI.setDialogue(
    "Patika boyunca hareket ederken ufak bir gölge seni fark eder ve saldırır!",
    [
      { label: "Savaş!", action: () => startCombatChapter("Orman Gölgesi", 40, 1) }
    ]
  );
}

/* --- BÖLÜM 2: Terk Edilmiş Kamp --- */
function chapter2() {
  window.currentChapter = 2;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 2 — Terk Edilmiş Kamp\n\nKai, ağaçların arasında eski bir kamp yeri bulur. Toprakta metal bir parça parlıyor.",
    [
      { label: "Parçayı al", action: () => {
          UI.log("Silah parçası alındı. Saldırı +5");
          player.strengthBoost = (player.strengthBoost || 0) + 5;
          UI.setDialogue("Silah yükseltildi. Bir adım daha içeri...", [
            { label: "İleri", action: () => chapter2_encounter() }
          ]);
        }
      },
      { label: "Devam et", action: () => chapter2_encounter() }
    ]
  );
}

function chapter2_encounter() {
  UI.setDialogue(
    "Kamptan bir adam (düşman) fırlar! Seni test ediyor.",
    [
      { label: "Savaş", action: () => startCombatChapter("Kamp Haydudu", 50, 2) }
    ]
  );
}

/* --- BÖLÜM 3: Gölgelerin Vadisi --- */
function chapter3() {
  window.currentChapter = 3;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 3 — Gölgelerin Vadisi\n\nSisli bir vadiye geldin. Uzaktan uzun bir gölge süzülüyor.",
    [
      { label: "Gölgeyi takip et", action: () => chapter3_follow() },
      { label: "Farklı yolu kullan", action: () => chapter3_detour() }
    ]
  );
}

function chapter3_follow() {
  UI.log("Gölge takip edildi — dikkatli ol.");
  UI.setDialogue(
    "Gölge kaybolduktan sonra bir bekçi seni bekliyor.",
    [
      { label: "Savaş", action: () => startCombatChapter("Vadi Gözcüsü", 60, 3) }
    ]
  );
}

function chapter3_detour() {
  UI.log("Sessiz bir yol seçtin — zemin tuzaklıydı, ama atlattın. Savunma +3");
  player.defenseBoost = (player.defenseBoost || 0) + 3;
  UI.setDialogue("Küçük bir ödül kazandın ve güvenli bir çıkış buldun.", [
    { label: "İleri", action: () => goToChapter(4) }
  ]);
}

/* --- BÖLÜM 4: Dağ Tapınağına Tırmanış --- */
function chapter4() {
  window.currentChapter = 4;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 4 — Dağ Tapınağına Tırmanış\n\nYüksek bir tapınağın önündesin. Eski bir figür (Eko) seni izliyor.",
    [
      { label: "Eko ile konuş", action: () => chapter4_talkEko() },
      { label: "Sessizce gir", action: () => chapter4_enterSolo() }
    ]
  );
}

function chapter4_talkEko() {
  UI.log("Eko: 'Kapıda üç sembol var. Biri zeka ile çözülür.'");
  player.intelligenceBoost = (player.intelligenceBoost || 0) + 1;
  UI.setDialogue("Eko sana bir ipucu verdi. Zeka +1", [
    { label: "Tapınağa gir", action: () => {
        UI.setDialogue("Tapınağın girişinde bir muhafız belirdi!", [
          { label: "Savaş", action: () => startCombatChapter("Tapınak Muhafızı", 80, 4) }
        ]);
      }
    }
  ]);
}

function chapter4_enterSolo() {
  UI.log("Tek başına girdin. Daha zor ama ilginç.");
  UI.setDialogue("Tapınağın bekçisi saldırdı!", [
    { label: "Savaş", action: () => startCombatChapter("Tapınak Muhafızı", 80, 4) }
  ]);
}

/* --- BÖLÜM 5: Tapınağın Kalbi --- */
function chapter5() {
  window.currentChapter = 5;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 5 — Tapınağın Kalbi\n\nİçerisi ışık ve gölgeyle dolu. Sessiz bir fısıltı duyuyorsun.",
    [
      { label: "Işık odasını incele", action: () => {
          player.intelligenceBoost = (player.intelligenceBoost || 0) + 1;
          UI.log("Yazıları okudun. Zeka +1");
          UI.setDialogue("Eski yazılar bir uyarı veriyor: 'Gölge sakınma.'", [
            { label: "İlerle", action: () => startCombatChapter("Gölge Koruyucu", 110, 5) }
          ]);
        }
      },
      { label: "Karanlık geçide gir", action: () => {
          UI.log("Karanlıkta bir fısıltı duydun. Xar adını mırıldandı.");
          UI.setDialogue("Sesi takip et ve ilerle.", [
            { label: "İleri", action: () => startCombatChapter("Gölge Koruyucu", 110, 5) }
          ]);
        }
      }
    ]
  );
}

/* --- BÖLÜM 6: Kırık Zihin Koridoru --- */
function chapter6() {
  window.currentChapter = 6;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 6 — Kırık Zihin Koridoru\n\nÜç kapı var: Denge, Cesaret, Zihin.",
    [
      { label: "Denge (savunma kazan)", action: () => {
          player.defenseBoost = (player.defenseBoost || 0) + 2;
          UI.log("Denge odası: Savunma +2");
          UI.setDialogue("Dengen arttı.", [{ label: "İleri", action: () => startCombatChapter("Zihin Gözcüsü", 130, 6) }]);
        }
      },
      { label: "Cesaret (güç kazan)", action: () => {
          player.strengthBoost = (player.strengthBoost || 0) + 3;
          UI.log("Cesaret odası: Güç +3");
          UI.setDialogue("Cesaret arttı.", [{ label: "İleri", action: () => startCombatChapter("Zihin Gözcüsü", 130, 6) }]);
        }
      },
      { label: "Zihin (zeka kazan)", action: () => {
          player.intelligenceBoost = (player.intelligenceBoost || 0) + 2;
          UI.log("Zihin odası: Zeka +2");
          UI.setDialogue("Zihin güçlendi.", [{ label: "İleri", action: () => startCombatChapter("Zihin Gözcüsü", 130, 6) }]);
        }
      }
    ]
  );
}

/* --- BÖLÜM 7: Xar'ın İzleri --- */
function chapter7() {
  window.currentChapter = 7;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 7 — Xar'ın İzleri\n\nDuvarlarda siyah X sembolleri. Eko tekrar görünüyor.",
    [
      { label: "Eko'ya inan ve izleri takip et", action: () => {
          player.defenseBoost = (player.defenseBoost || 0) + 2;
          UI.log("Eko'nun rehberliği: Savunma +2");
          UI.setDialogue("Eko seni gizli bir yoldan yönlendiriyor.", [
            { label: "Yolu takip et", action: () => startCombatChapter("Karanlık Koruma", 150, 7) }
          ]);
        }
      },
      { label: "Kendi başına ilerle", action: () => {
          UI.log("Yalnız ilerledin; beklenmedik bir saldırı.");
          UI.setDialogue("Saldırı!", [{ label: "Savun", action: () => startCombatChapter("Karanlık Koruma", 150, 7) }]);
        }
      }
    ]
  );
}

/* --- BÖLÜM 8: Karanlık Merdiven --- */
function chapter8() {
  window.currentChapter = 8;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 8 — Karanlık Merdiven\n\nMerdiven üç kola ayrılıyor: Hız, Güç, Zeka.",
    [
      { label: "Hız (kaçınma artar)", action: () => {
          player.speedBoost = (player.speedBoost || 0) + 3;
          UI.log("Hız +3");
          UI.setDialogue("Hız yolunu seçtin.", [{ label: "İleri", action: () => startCombatChapter("Elit Savaşçı", 170, 8) }]);
        }
      },
      { label: "Güç (saldırı artar)", action: () => {
          player.strengthBoost = (player.strengthBoost || 0) + 4;
          UI.log("Güç +4");
          UI.setDialogue("Güç yolunu seçtin.", [{ label: "İleri", action: () => startCombatChapter("Elit Savaşçı", 170, 8) }]);
        }
      },
      { label: "Zeka (zeka artar)", action: () => {
          player.intelligenceBoost = (player.intelligenceBoost || 0) + 3;
          UI.log("Zeka +3");
          UI.setDialogue("Zeka yolunu seçtin.", [{ label: "İleri", action: () => startCombatChapter("Elit Savaşçı", 170, 8) }]);
        }
      }
    ]
  );
}

/* --- BÖLÜM 9: Kapanan Kapı --- */
function chapter9() {
  window.currentChapter = 9;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 9 — Kapanan Kapı\n\nBu kapı üç enerji ister: Güç, Zihin, Ruh.",
    [
      { label: "Sembolleri kontrol et", action: () => chapter9_check() }
    ]
  );
}

function chapter9_check() {
  const str = player.strengthBoost || 0;
  const mind = player.intelligenceBoost || 0;
  const soul = player.defenseBoost || 0;
  const total = str + mind + soul;

  if (total >= 10) {
    UI.log("Gerekli enerji toplandı — kapı açıldı.");
    UI.setDialogue("Kapı açıldı. İçeri gir.", [
      { label: "İleri", action: () => startCombatChapter("Son Koruma", 190, 9) }
    ]);
  } else {
    UI.setDialogue("Enerjin yetersiz. Alternatif olarak ortamdan enerji çekebilirsin.", [
      { label: "Enerji çek (zeka+2)", action: () => {
          player.intelligenceBoost = (player.intelligenceBoost || 0) + 2;
          UI.log("Enerji çekildi: Zeka +2");
          UI.setDialogue("Kapı titreşti.", [{ label: "Kapı aç", action: () => startCombatChapter("Son Koruma", 190, 9) }]);
        }
      },
      { label: "Odaklan (ruh+2)", action: () => {
          player.defenseBoost = (player.defenseBoost || 0) + 2;
          UI.log("Odaklanıldı: Ruh +2");
          UI.setDialogue("Kapı titreşti.", [{ label: "Kapı aç", action: () => startCombatChapter("Son Koruma", 190, 9) }]);
        }
      }
    ]);
  }
}

/* --- BÖLÜM 10: Final — Kai vs Xar --- */
function chapter10() {
  window.currentChapter = 10;
  UI.renderScene(player, {});
  UI.setDialogue(
    "Bölüm 10 — Xar'ın Odası\n\nKapı aralanır. İçeride karanlığın merkezinde Xar belirir. Sesleri zihinlere işler.",
    [
      { label: "Xar ile yüzleş", action: () => chapter10_start() }
    ]
  );
}

function chapter10_start() {
  UI.log("Xar: 'Sonunda geldin, Kai.'");
  // final hazırlık eğlencesi: seçim etkisi
  UI.setDialogue(
    "Xar: 'Seçimlerin seni buraya getirdi. Son bir test.'\n\nNasıl saldıracaksın?",
    [
      { label: "Doğrudan güçle (agresif)", action: () => chapter10_fight('power') },
      { label: "Kurnazca zekayla (strateji)", action: () => chapter10_fight('mind') },
      { label: "Savunma ve bekleyiş (sabır)", action: () => chapter10_fight('defense') }
    ]
  );
}

function chapter10_fight(style) {
  // final boss hp ve davranışını seçime göre etkileyelim
  let xarHp = 260;
  if (style === 'power') { player.strengthBoost = (player.strengthBoost || 0) + 5; UI.log("Agresif seçim: Güç +5"); }
  if (style === 'mind') { player.intelligenceBoost = (player.intelligenceBoost || 0) + 4; UI.log("Kurnaz seçim: Zeka +4"); }
  if (style === 'defense') { player.defenseBoost = (player.defenseBoost || 0) + 4; UI.log("Sabır seçim: Ruh/Savunma +4"); }

  // Başlat
  startCombatChapter("Xar (Final)", xarHp, 10);
}

/* --- Bitiş/Zafer ekranı (combat.js savaş bittiğinde nextChapterAfterFight çağıracak) */
function chapter10_endVictory() {
  UI.renderScene(player, {});
  UI.setDialogue(
    "Xar çöktü. Işık yavaşça geri geliyor. Kai derin bir nefes alır.",
    [
      { label: "Zaferi kutla", action: () => {
          UI.log("Oyun Bitti — Kai zafer kazandı!");
          UI.setDialogue("Tebrikler! Xar yenildi. Hikâye tamamlandı.", []);
        }
      }
    ]
  );
}

/* Eğer oyun combat.js tarafından doğrudan 'goToChapter' veya nextChapterAfterFight ile ilerliyorsa
   chapter fonksiyonları zaten mevcut. Eğer final boss'ta özel davranış istersen veya
   combat.js içinde zafer durumunu yakalayıp chapter10_endVictory çağırmak gerekebilir.
*/
