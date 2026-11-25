/* Gestione Orto PWA - dati statici: catalogo verdure, compagni, rotazione, piani, tipi di oggetto. */
(function () {
  'use strict';

  var GO = window.GO = window.GO || {};
  var D = GO.D = {};
  var C = function C(nome, emoji, mesi, giorni, come, perenne) {
    return {
      nome,
      emoji,
      mesi,
      giorni,
      come,
      perenne: !!perenne
    };
  };
  D.CATALOGO = [C('Pomodoro', '🍅', [2, 3, 4], 100, 'Vaschetta alveolare al caldo, trapianto da aprile-maggio'), C('Peperone', '🫑', [2, 3, 4], 110, 'Vaschetta alveolare al caldo, trapianto da maggio'), C('Peperoncino', '🌶️', [2, 3, 4], 120, 'Vaschetta alveolare al caldo, trapianto da maggio'), C('Melanzana', '🍆', [2, 3, 4], 110, 'Vaschetta alveolare al caldo, trapianto da maggio'), C('Zucchina', '🥒', [4, 5, 6], 55, 'Semina diretta a terra con suolo caldo'), C('Cetriolo', '🥒', [4, 5, 6], 60, 'Semina diretta o vaschetta alveolare'), C('Zucca', '🎃', [4, 5, 6], 120, 'Semina diretta, serve molto spazio'), C('Fagiolino', '🫛', [4, 5, 6, 7], 60, 'Semina diretta a terra'), C('Basilico', '🌿', [4, 5, 6], 60, 'Semina in vaschetta alveolare, non sotto i 12 °C'), C('Lattuga', '🥬', [2, 3, 4, 5, 8, 9, 10], 55, 'Vaschetta alveolare o semina diretta, evita il caldo estivo'), C('Rucola', '🥬', [3, 4, 5, 9, 10], 40, 'Semina diretta a spaglio'), C('Spinaci', '🥬', [2, 3, 9, 10, 11], 50, 'Semina diretta, preferisce il fresco'), C('Bietola', '🥬', [3, 4, 5, 6, 8], 60, 'Semina diretta'), C('Ravanello', '🌱', [3, 4, 5, 8, 9, 10], 30, "Semina diretta, il più veloce dell'orto"), C('Carota', '🥕', [3, 4, 5, 6, 7], 90, 'Semina diretta in terra soffice'), C('Barbabietola', '🌱', [3, 4, 5, 6, 7], 70, 'Semina diretta'), C('Rapa', '🌱', [8, 9], 60, 'Semina diretta a fine estate'), C('Cipolla', '🧅', [2, 3, 9, 10], 150, 'Semina o bulbilli'), C('Porro', '🧅', [3, 4, 5], 150, 'Vaschetta alveolare, trapianto dopo 2 mesi'), C('Aglio', '🧄', [10, 11, 12, 1, 2], 200, 'Interra gli spicchi con la punta in su'), C('Aglione', '🧄', [10, 11, 2, 3], 240, 'Interra i bulbilli con la punta in su, raccolta a fine primavera-estate'), C('Piselli', '🫛', [2, 3, 10, 11], 80, 'Semina diretta, con sostegni'), C('Fave', '🫛', [10, 11], 180, 'Semina diretta in autunno'), C('Patata', '🥔', [3, 4], 110, 'Tuberi-seme interrati a 10 cm'), C('Cavolfiore', '🥦', [5, 6, 7], 100, 'Vaschetta alveolare, trapianto dopo 5-6 settimane'), C('Broccolo', '🥦', [5, 6, 7], 90, 'Vaschetta alveolare, trapianto dopo 5-6 settimane'), C('Cavolo nero', '🥬', [5, 6, 7], 90, 'Vaschetta alveolare, trapianto in estate'), C('Finocchio', '🌱', [6, 7], 90, 'Semina diretta o vaschetta alveolare a inizio estate'), C('Sedano', '🌱', [3, 4], 120, 'Vaschetta alveolare, trapianto a maggio'), C('Prezzemolo', '🌿', [3, 4, 5, 6, 9], 70, 'Semina diretta, germina lentamente'), C('Radicchio', '🥬', [6, 7, 8], 90, 'Semina diretta o vaschetta alveolare in estate'), C('Cicoria', '🥬', [7, 8], 80, 'Semina diretta in tarda estate'), C('Scalogno', '🧅', [2, 3, 10, 11], 120, 'Interra i bulbilli con la punta in su, si divide in più bulbi'), C('Cavolo cappuccio', '🥬', [4, 5, 6, 7], 120, 'Vaschetta alveolare, trapianto dopo 5-6 settimane, vuole terreno fertile'), C('Verza', '🥬', [5, 6, 7], 130, 'Vaschetta alveolare, trapianto dopo 5-6 settimane, resiste bene al freddo'), C('Indivia', '🥬', [6, 7, 8], 80, 'Vaschetta alveolare o semina diretta in estate, trapianto dopo 4 settimane'), C('Mais', '🌽', [4, 5, 6], 90, 'Semina diretta in più file vicine (si impollina con il vento), suolo caldo'), C('Cocomero', '🍉', [4, 5], 100, 'Semina diretta o vaschetta alveolare con suolo caldo, serve moltissimo spazio'), C('Melone', '🍈', [4, 5], 100, 'Semina diretta o vaschetta alveolare con suolo caldo, serve molto spazio e sole'), C('Fragola', '🍓', [3, 4, 9, 10], 90, 'Metti a dimora le piantine (stoloni) con il colletto a livello del terreno; produce per 3-4 anni', true), C('Rosmarino', '🌿', [3, 4, 5, 9], 120, 'Piantina o talea in pieno sole e terreno ben drenato; si raccoglie tagliando i rametti', true), C('Salvia', '🌿', [3, 4, 5, 9], 120, 'Piantina o talea in pieno sole e terreno drenato; si raccolgono le foglie', true), C('Menta', '🌿', [3, 4, 5, 9], 60, "Meglio in vaso: con le radici invade il terreno; vuole acqua e mezz'ombra", true), C('Timo', '🌿', [3, 4, 5, 9], 120, 'Piantina o semina in pieno sole e terreno povero e drenato', true), C('Origano', '🌿', [3, 4, 5, 9], 120, 'Piantina o semina in pieno sole e terreno drenato', true), C('Erba cipollina', '🌿', [3, 4, 5, 9], 60, 'Semina diretta o piantina; si taglia a 5 cm dal suolo e ricresce', true), C('Carciofo', '🌱', [3, 4, 9], 200, "Si mette a dimora il carduccio (germoglio): produce dall'anno dopo e dura 3-4 anni", true), C('Cime di rapa', '🥬', [8, 9, 10], 70, 'Semina diretta in file, si dirada; si raccolgono le cime prima che fioriscano'), C('Cavolo di Bruxelles', '🥬', [4, 5, 6], 160, 'Vaschetta alveolare, trapianto dopo 5-6 settimane; si raccolgono i cavolini dal basso in autunno-inverno'), C('Cavolo rapa', '🥬', [3, 4, 7, 8], 70, 'Semina diretta o vaschetta alveolare; si raccoglie il fusto ingrossato quando misura 6-8 cm'), C('Taccole', '🫛', [2, 3, 10, 11], 70, 'Semina diretta, con rete o canne come sostegno; si raccolgono i baccelli quando sono ancora piatti'), C('Valerianella', '🌱', [8, 9, 10], 70, 'Semina diretta a spaglio o in file, resiste al freddo: insalata invernale'), C('Asparago', '🌱', [3, 4], 730, 'Si mettono a dimora le zampe (radici) in trincea: la prima raccolta leggera è dopo 2 anni, poi dura 10 anni e più', true), C('Coriandolo', '🌿', [3, 4, 5, 9], 50, 'Semina diretta a scalare: in piena estate fiorisce subito e le foglie perdono sapore'), C('Aneto', '🌿', [3, 4, 5, 6], 60, 'Semina diretta, non ama il trapianto; si raccolgono le foglie prima della fioritura'), C('Maggiorana', '🌿', [3, 4, 5], 90, "Piantina o semina in pieno sole; teme il gelo, in vaso si ripara d'inverno", true)];

  // Distanze di impianto consigliate in cm: [fra le piantine sul solco, dal solco accanto].
  D.DISTANZE = {
    Pomodoro: [50, 80],
    Peperone: [40, 60],
    Peperoncino: [40, 60],
    Aglione: [20, 30],
    Melanzana: [50, 80],
    Zucchina: [80, 100],
    Cetriolo: [40, 100],
    Zucca: [100, 150],
    Fagiolino: [8, 50],
    Basilico: [20, 30],
    Lattuga: [25, 30],
    Rucola: [5, 20],
    Spinaci: [8, 25],
    Bietola: [20, 40],
    Ravanello: [3, 15],
    Carota: [4, 25],
    Barbabietola: [10, 30],
    Rapa: [10, 30],
    Cipolla: [10, 25],
    Porro: [12, 30],
    Aglio: [10, 25],
    Piselli: [5, 50],
    Fave: [15, 50],
    Patata: [30, 70],
    Cavolfiore: [50, 60],
    Broccolo: [50, 60],
    'Cavolo nero': [40, 60],
    Finocchio: [25, 40],
    Sedano: [25, 40],
    Prezzemolo: [10, 25],
    Radicchio: [25, 30],
    Cicoria: [20, 30],
    Scalogno: [10, 25],
    'Cavolo cappuccio': [50, 60],
    Verza: [50, 60],
    Indivia: [25, 30],
    Mais: [25, 70],
    Cocomero: [100, 200],
    Melone: [80, 150],
    Fragola: [30, 40],
    Rosmarino: [60, 80],
    Salvia: [40, 60],
    Menta: [30, 40],
    Timo: [25, 30],
    Origano: [30, 40],
    'Erba cipollina': [15, 25],
    Carciofo: [80, 100],
    'Cime di rapa': [10, 30],
    'Cavolo di Bruxelles': [50, 70],
    'Cavolo rapa': [20, 30],
    Taccole: [5, 50],
    Valerianella: [5, 15],
    Asparago: [30, 100],
    Coriandolo: [10, 25],
    Aneto: [15, 30],
    Maggiorana: [25, 30]
  };

  // Giorni dalla semina in vaschetta alveolare al trapianto.
  D.GIORNI_TRAPIANTO = {
    Pomodoro: 45,
    Peperone: 55,
    Peperoncino: 55,
    Melanzana: 55,
    Cetriolo: 25,
    Basilico: 35,
    Lattuga: 28,
    Porro: 60,
    Cavolfiore: 40,
    Broccolo: 40,
    'Cavolo nero': 40,
    Finocchio: 30,
    Sedano: 60,
    Radicchio: 30,
    'Cavolo cappuccio': 40,
    Verza: 40,
    Indivia: 30,
    Cocomero: 25,
    Melone: 25,
    'Cavolo di Bruxelles': 40
  };

  // Verdure che soffrono il freddo anche da adulte.
  D.SENSIBILI_GELO = ['Pomodoro', 'Peperone', 'Peperoncino', 'Melanzana', 'Zucchina', 'Cetriolo', 'Zucca', 'Fagiolino', 'Basilico', 'Mais', 'Cocomero', 'Melone', 'Maggiorana'];

  // Ogni quanti giorni annaffiare con clima mite e senza pioggia.
  D.INTERVALLI = {
    Pomodoro: 2,
    Peperone: 2,
    Peperoncino: 3,
    Melanzana: 2,
    Zucchina: 2,
    Cetriolo: 2,
    Zucca: 3,
    Fagiolino: 3,
    Basilico: 2,
    Lattuga: 2,
    Rucola: 2,
    Spinaci: 3,
    Bietola: 3,
    Ravanello: 2,
    Carota: 4,
    Barbabietola: 4,
    Rapa: 4,
    Cipolla: 5,
    Porro: 4,
    Aglio: 7,
    Aglione: 7,
    Piselli: 3,
    Fave: 5,
    Patata: 4,
    Cavolfiore: 3,
    Broccolo: 3,
    'Cavolo nero': 4,
    Finocchio: 3,
    Sedano: 2,
    Prezzemolo: 3,
    Radicchio: 3,
    Cicoria: 4,
    Scalogno: 5,
    'Cavolo cappuccio': 3,
    Verza: 3,
    Indivia: 3,
    Mais: 3,
    Cocomero: 3,
    Melone: 3,
    Fragola: 2,
    Rosmarino: 7,
    Salvia: 5,
    Menta: 2,
    Timo: 7,
    Origano: 7,
    'Erba cipollina': 3,
    Carciofo: 4,
    'Cime di rapa': 3,
    'Cavolo di Bruxelles': 3,
    'Cavolo rapa': 3,
    Taccole: 3,
    Valerianella: 3,
    Asparago: 5,
    Coriandolo: 3,
    Aneto: 3,
    Maggiorana: 5
  };

  // Giorni di produzione dopo la prima raccolta (le altre piante si tolgono poco dopo).
  D.DURATA_PRODUZIONE = {
    Pomodoro: 60,
    Peperone: 60,
    Peperoncino: 60,
    Melanzana: 60,
    Zucchina: 60,
    Cetriolo: 45,
    Zucca: 30,
    Fagiolino: 30,
    Basilico: 30,
    'Cavolo nero': 120,
    Prezzemolo: 120,
    Cocomero: 30,
    Melone: 30
  };
  var FRUTT = 'stallatico o pollina pellettata, macerato di ortica (più potassio alla fioritura)';
  var CUCU = 'concime granulare equilibrato tra le file o macerato di ortica';
  var AZOT = 'concime azotato (cornunghia o stallatico pellettato)';
  // Piani di concimazione: [concime, primo giorno dopo la messa a dimora, ogni N giorni (null = una volta sola)]
  D.PIANI_CONCIME = {
    Pomodoro: [FRUTT, 14, 14],
    Peperone: [FRUTT, 14, 14],
    Peperoncino: [FRUTT, 14, 14],
    Melanzana: [FRUTT, 14, 14],
    Zucchina: [CUCU, 21, 25],
    Cetriolo: [CUCU, 21, 25],
    Zucca: [CUCU, 21, 25],
    Cavolfiore: [AZOT, 30, null],
    Broccolo: [AZOT, 30, null],
    'Cavolo nero': [AZOT, 30, null],
    Sedano: [AZOT, 30, null],
    Finocchio: [AZOT, 30, null],
    Bietola: ['compost e cornunghia', 30, null],
    'Cavolo cappuccio': [AZOT, 30, null],
    Verza: [AZOT, 30, null],
    Mais: [AZOT, 30, null],
    Cocomero: [CUCU, 21, 25],
    Melone: [CUCU, 21, 25],
    'Cavolo di Bruxelles': [AZOT, 30, null]
  };
  D.SUGGERIMENTI_CONCIMI = ['Concime di cavallo', 'Pollina', 'Letame bovino', 'Compost', 'Humus di lombrico', 'Pacciamatura (paglia)', 'Pacciamatura (telo)', 'Cenere', 'Cornunghia', 'Macerato di ortica', 'Calce', 'Sabbia'];

  // Strutture proposte per una verdura (il nome può comunque essere libero).
  D.STRUTTURE = ['Sostegno con canne', 'Tutore singolo / paletto', 'Telo', 'Rete', 'Rete ombreggiante', 'Tessuto non tessuto (TNT)'];

  // Promemoria "Aggiungi struttura": per le verdure che crescono in altezza, una volta sola dopo N giorni dalla messa a dimora.
  D.SUGGERIMENTI_STRUTTURE = {
    Pomodoro: {
      struttura: D.STRUTTURE[1],
      giorni: 10,
      consiglio: 'cresce in altezza e si piega sotto il peso dei frutti: un tutore e una legatura ogni tanto lo tengono dritto.'
    },
    Peperone: {
      struttura: D.STRUTTURE[1],
      giorni: 21,
      consiglio: 'con i frutti pesanti i rami si spezzano facilmente: meglio un tutore prima che sia tardi.'
    },
    Peperoncino: {
      struttura: D.STRUTTURE[1],
      giorni: 21,
      consiglio: 'con i frutti i rami si piegano: un tutore li sostiene.'
    },
    Melanzana: {
      struttura: D.STRUTTURE[1],
      giorni: 21,
      consiglio: 'i frutti pesanti piegano la pianta: un tutore la tiene dritta.'
    },
    Fagiolino: {
      struttura: D.STRUTTURE[0],
      giorni: 7,
      consiglio: 'se è un rampicante ha bisogno di canne o di una rete su cui arrampicarsi.'
    },
    Cetriolo: {
      struttura: D.STRUTTURE[0],
      giorni: 10,
      consiglio: 'cresce meglio in verticale: canne o una rete tengono i frutti puliti e sani.'
    }
  };

  // Compagnia: verdura -> [amici, nemici]
  D.COMPAGNIA = {
    Pomodoro: [['Basilico', 'Carota', 'Prezzemolo', 'Cipolla', 'Aglio', 'Lattuga', 'Sedano'], ['Patata', 'Finocchio', 'Cavolfiore', 'Broccolo', 'Cavolo nero']],
    Peperone: [['Basilico', 'Carota', 'Cipolla'], ['Finocchio', 'Fagiolino']],
    Peperoncino: [['Basilico', 'Carota', 'Cipolla', 'Pomodoro'], ['Finocchio', 'Fagiolino']],
    Aglione: [['Barbabietola', 'Carota', 'Pomodoro'], ['Piselli', 'Fave', 'Fagiolino']],
    Melanzana: [['Fagiolino', 'Basilico'], ['Finocchio']],
    Zucchina: [['Fagiolino', 'Ravanello', 'Cipolla'], ['Patata']],
    Cetriolo: [['Fagiolino', 'Lattuga', 'Ravanello', 'Cipolla', 'Piselli'], ['Patata']],
    Zucca: [['Fagiolino', 'Cipolla'], ['Patata']],
    Fagiolino: [['Carota', 'Patata', 'Ravanello', 'Cetriolo', 'Zucchina', 'Melanzana'], ['Cipolla', 'Aglio', 'Porro', 'Finocchio', 'Piselli']],
    Lattuga: [['Carota', 'Ravanello', 'Cetriolo', 'Cipolla'], []],
    Spinaci: [['Cavolfiore', 'Broccolo', 'Ravanello'], []],
    Bietola: [['Cipolla', 'Cavolfiore'], []],
    Ravanello: [['Carota', 'Lattuga', 'Piselli'], []],
    Carota: [['Cipolla', 'Porro', 'Lattuga', 'Piselli'], ['Finocchio']],
    Barbabietola: [['Cipolla', 'Cavolfiore'], ['Fagiolino']],
    Cipolla: [['Barbabietola'], ['Piselli', 'Fave']],
    Porro: [['Sedano'], ['Piselli']],
    Aglio: [['Barbabietola'], ['Piselli', 'Fave']],
    Piselli: [['Carota', 'Ravanello'], ['Cipolla', 'Aglio', 'Porro']],
    Fave: [['Patata', 'Carota'], ['Cipolla', 'Aglio']],
    Patata: [['Fave', 'Cavolfiore'], ['Zucca', 'Zucchina', 'Cetriolo']],
    Cavolfiore: [['Sedano', 'Spinaci'], []],
    Broccolo: [['Sedano', 'Spinaci'], []],
    'Cavolo nero': [['Sedano', 'Cipolla'], []],
    Sedano: [['Porro', 'Cavolfiore'], []],
    Scalogno: [['Barbabietola', 'Carota', 'Lattuga', 'Fragola', 'Pomodoro'], ['Piselli', 'Fave', 'Fagiolino']],
    'Cavolo cappuccio': [['Sedano', 'Cipolla', 'Spinaci', 'Bietola', 'Rosmarino', 'Salvia', 'Timo', 'Menta'], ['Pomodoro', 'Fragola']],
    Verza: [['Sedano', 'Cipolla', 'Spinaci', 'Bietola', 'Rosmarino', 'Salvia', 'Timo', 'Menta'], ['Pomodoro', 'Fragola']],
    Indivia: [['Finocchio', 'Porro', 'Carota', 'Ravanello'], []],
    Mais: [['Fagiolino', 'Zucca', 'Zucchina', 'Cetriolo', 'Melone', 'Cocomero', 'Piselli'], ['Pomodoro']],
    Cocomero: [['Mais', 'Ravanello', 'Cipolla'], ['Patata']],
    Melone: [['Mais', 'Ravanello', 'Cipolla'], ['Patata']],
    Fragola: [['Spinaci', 'Lattuga', 'Cipolla', 'Aglio', 'Fagiolino', 'Timo', 'Erba cipollina'], ['Cavolfiore', 'Broccolo', 'Cavolo nero', 'Finocchio']],
    Rosmarino: [['Carota', 'Fagiolino', 'Salvia'], ['Basilico']],
    Salvia: [['Carota', 'Pomodoro', 'Rosmarino'], ['Cetriolo']],
    Menta: [['Pomodoro', 'Cavolfiore'], ['Prezzemolo']],
    Timo: [['Melanzana', 'Pomodoro'], []],
    Origano: [['Peperone', 'Cetriolo', 'Zucchina'], []],
    'Erba cipollina': [['Carota', 'Pomodoro', 'Lattuga'], ['Fagiolino', 'Piselli']],
    'Cime di rapa': [['Sedano', 'Cipolla', 'Lattuga'], ['Pomodoro', 'Fragola']],
    'Cavolo di Bruxelles': [['Sedano', 'Cipolla', 'Spinaci', 'Rosmarino', 'Salvia', 'Timo', 'Menta'], ['Pomodoro', 'Fragola']],
    'Cavolo rapa': [['Sedano', 'Cipolla', 'Lattuga', 'Barbabietola'], ['Pomodoro', 'Fragola']],
    Taccole: [['Carota', 'Ravanello', 'Cetriolo', 'Lattuga', 'Mais'], ['Cipolla', 'Aglio', 'Porro', 'Scalogno', 'Erba cipollina', 'Fagiolino']],
    Valerianella: [['Carota', 'Cipolla'], []],
    Asparago: [['Pomodoro', 'Prezzemolo', 'Basilico'], ['Cipolla', 'Aglio']],
    Coriandolo: [['Pomodoro', 'Spinaci', 'Lattuga'], ['Finocchio']],
    Aneto: [['Cetriolo', 'Cavolo cappuccio', 'Verza', 'Lattuga', 'Cipolla'], ['Carota', 'Finocchio']],
    Maggiorana: [['Peperone', 'Zucchina', 'Melanzana'], []]
  };

  // Famiglie botaniche (rotazione)
  D.FAMIGLIE = {
    Pomodoro: 'Solanacee',
    Peperone: 'Solanacee',
    Peperoncino: 'Solanacee',
    Melanzana: 'Solanacee',
    Patata: 'Solanacee',
    Zucchina: 'Cucurbitacee',
    Cetriolo: 'Cucurbitacee',
    Zucca: 'Cucurbitacee',
    Cocomero: 'Cucurbitacee',
    Melone: 'Cucurbitacee',
    Fagiolino: 'Leguminose',
    Piselli: 'Leguminose',
    Fave: 'Leguminose',
    Taccole: 'Leguminose',
    Basilico: 'Lamiacee',
    Rosmarino: 'Lamiacee',
    Salvia: 'Lamiacee',
    Menta: 'Lamiacee',
    Timo: 'Lamiacee',
    Origano: 'Lamiacee',
    Maggiorana: 'Lamiacee',
    Lattuga: 'Asteracee',
    Radicchio: 'Asteracee',
    Cicoria: 'Asteracee',
    Indivia: 'Asteracee',
    Carciofo: 'Asteracee',
    Rucola: 'Brassicacee',
    Ravanello: 'Brassicacee',
    Rapa: 'Brassicacee',
    Cavolfiore: 'Brassicacee',
    Broccolo: 'Brassicacee',
    'Cavolo nero': 'Brassicacee',
    'Cavolo cappuccio': 'Brassicacee',
    Verza: 'Brassicacee',
    'Cime di rapa': 'Brassicacee',
    'Cavolo di Bruxelles': 'Brassicacee',
    'Cavolo rapa': 'Brassicacee',
    Spinaci: 'Chenopodiacee',
    Bietola: 'Chenopodiacee',
    Barbabietola: 'Chenopodiacee',
    Carota: 'Apiacee',
    Finocchio: 'Apiacee',
    Sedano: 'Apiacee',
    Prezzemolo: 'Apiacee',
    Coriandolo: 'Apiacee',
    Aneto: 'Apiacee',
    Cipolla: 'Alliacee',
    Porro: 'Alliacee',
    Aglio: 'Alliacee',
    Aglione: 'Alliacee',
    Scalogno: 'Alliacee',
    'Erba cipollina': 'Alliacee',
    Mais: 'Poacee',
    Fragola: 'Rosacee',
    Valerianella: 'Valerianacee',
    Asparago: 'Asparagacee'
  };

  // Balcone: [profondità minima terriccio cm, luce minima (0 ombra, 1 mezza ombra, 2 sole), adatta a un vaso]
  var V = function V(p, l, a) {
    return {
      prof: p,
      luce: l,
      vaso: a !== false
    };
  };
  D.PROFILI = {
    Pomodoro: V(30, 2),
    Peperone: V(30, 2),
    Peperoncino: V(25, 2),
    Melanzana: V(35, 2),
    Zucchina: V(40, 2, false),
    Cetriolo: V(30, 2),
    Zucca: V(50, 2, false),
    Fagiolino: V(25, 2),
    Basilico: V(15, 2),
    Lattuga: V(15, 1),
    Rucola: V(12, 1),
    Spinaci: V(15, 0),
    Bietola: V(25, 1),
    Ravanello: V(12, 1),
    Carota: V(30, 2),
    Barbabietola: V(25, 1),
    Rapa: V(25, 1),
    Cipolla: V(20, 2),
    Porro: V(30, 2),
    Aglio: V(20, 2),
    Aglione: V(25, 2),
    Piselli: V(25, 1),
    Fave: V(30, 2),
    Patata: V(40, 2),
    Cavolfiore: V(40, 1, false),
    Broccolo: V(40, 1, false),
    'Cavolo nero': V(40, 1),
    Finocchio: V(30, 2),
    Sedano: V(25, 1),
    Prezzemolo: V(20, 1),
    Radicchio: V(25, 1),
    Cicoria: V(25, 1),
    Scalogno: V(15, 2),
    'Cavolo cappuccio': V(40, 1, false),
    Verza: V(40, 1, false),
    Indivia: V(20, 1),
    Mais: V(40, 2, false),
    Cocomero: V(50, 2, false),
    Melone: V(40, 2, false),
    Fragola: V(20, 1),
    Rosmarino: V(30, 2),
    Salvia: V(25, 2),
    Menta: V(20, 1),
    Timo: V(15, 2),
    Origano: V(20, 2),
    'Erba cipollina': V(15, 1),
    Carciofo: V(50, 2, false),
    'Cime di rapa': V(25, 1),
    'Cavolo di Bruxelles': V(40, 1, false),
    'Cavolo rapa': V(25, 1),
    Taccole: V(25, 1),
    Valerianella: V(12, 1),
    Asparago: V(50, 2, false),
    Coriandolo: V(15, 1),
    Aneto: V(25, 2),
    Maggiorana: V(15, 2)
  };
  D.ESPOSIZIONI = ['Nord', 'Sud', 'Est', 'Ovest'];

  // Tipi di oggetto dell'orto
  var T = function T(nome, emoji, o) {
    return Object.assign({
      nome,
      emoji,
      conTemperatura: false,
      esempio: '',
      ospita: false,
      coperto: false,
      nomeBase: null,
      conAlveoli: false,
      soloTerreno: false,
      conProfondita: false
    }, o || {});
  };
  D.LOMBRI = 'Lombricompostiera';
  D.PASSAGGIO = 'Passaggio';
  D.VASCHETTA = 'Vaschetta alveolare';
  D.AIUOLA = 'Aiuola rialzata';
  D.ALVEOLI = [4, 6, 12];
  D.TIPI = [T('Lombricompostiera', '🪱', {
    conTemperatura: true
  }), T('Compostiera', '🍂', {
    conTemperatura: true
  }), T('Serra o tunnel', '🏡', {
    esempio: 'es. aperta per arieggiare, 28 °C dentro',
    ospita: true,
    coperto: true,
    nomeBase: 'Serra',
    soloTerreno: true
  }), T('Mini serra da balcone', '🪟', {
    esempio: 'es. chiusa di notte, 22 °C dentro',
    ospita: true,
    coperto: true,
    nomeBase: 'Mini serra'
  }), T('Vaschetta alveolare', '🌱', {
    esempio: 'es. seminati i pomodori, germinati dopo 7 giorni',
    ospita: true,
    conAlveoli: true
  }), T('Vaso', '🪴', {
    esempio: 'es. aggiunto terriccio, annaffiato',
    ospita: true,
    conProfondita: true
  }), T('Cassetta', '🧺', {
    esempio: 'es. seminata lattuga, diradato dopo 2 settimane',
    ospita: true,
    conProfondita: true
  }), T('Impianto di irrigazione', '💧', {
    esempio: 'es. irrigato 20 minuti'
  }), T("Sottovaso o riserva d'acqua", '🥣', {
    esempio: 'es. riempita la riserva, acqua finita dopo 3 giorni'
  }), T('Supporto verticale o graticcio', '🪜', {
    esempio: 'es. legati i pomodori al tutore',
    ospita: true
  }), T("Botte per l'acqua piovana", '🛢️', {
    esempio: 'es. livello a 3/4'
  }), T('Aiuola rialzata', '🧱', {
    esempio: 'es. aggiunto terriccio e compost',
    ospita: true,
    soloTerreno: true
  }), T('Sensore o termometro', '🌡️', {
    esempio: 'es. umidità del suolo 45%'
  }), T('Arnia o casetta per insetti', '🐝', {
    esempio: 'es. controllo: api attive'
  })];
  D.CATEGORIE_SPESE = ['Semi', 'Piantine', 'Concimi', 'Attrezzi', 'Acqua', 'Altro'];
  D.UNITA = ['pz', 'kg', 'mazzi', 'cespi'];

  // Prezzi di mercato (Agri-food data portal UE): verdura -> prodotto API; peso medio di un pezzo in kg
  D.PRODOTTI_PREZZI = {
    Pomodoro: 'Tomatoes',
    Peperone: 'Peppers',
    Melanzana: 'Egg Plants',
    Zucchina: 'Courgettes',
    Cetriolo: 'Cucumbers',
    Fagiolino: 'Beans',
    Lattuga: 'Lettuces',
    Carota: 'Carrots',
    Cipolla: 'Onions',
    Aglio: 'Garlic',
    Cavolfiore: 'Cauliflowers'
  };
  D.PESO_MEDIO_KG = {
    Pomodoro: 0.15,
    Peperone: 0.2,
    Melanzana: 0.3,
    Zucchina: 0.2,
    Cetriolo: 0.25,
    Fagiolino: 0.01,
    Lattuga: 0.3,
    Carota: 0.1,
    Cipolla: 0.15,
    Aglio: 0.05,
    Cavolfiore: 1.0
  };
  D.MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  D.MESI_LUNGHI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  // Indice case-insensitive per le mappe sopra
  var idx = function idx(o) {
    var m = new Map();
    Object.keys(o).forEach(function (k) {
      return m.set(k.toLowerCase(), o[k]);
    });
    return m;
  };
  D.idx = {
    distanze: idx(D.DISTANZE),
    trapianto: idx(D.GIORNI_TRAPIANTO),
    intervalli: idx(D.INTERVALLI),
    durata: idx(D.DURATA_PRODUZIONE),
    piani: idx(D.PIANI_CONCIME),
    compagnia: idx(D.COMPAGNIA),
    famiglie: idx(D.FAMIGLIE),
    profili: idx(D.PROFILI),
    prodotti: idx(D.PRODOTTI_PREZZI),
    peso: idx(D.PESO_MEDIO_KG),
    gelo: new Set(D.SENSIBILI_GELO.map(function (s) {
      return s.toLowerCase();
    })),
    catalogo: new Map(D.CATALOGO.map(function (v) {
      return [v.nome.toLowerCase(), v];
    }))
  };
})();