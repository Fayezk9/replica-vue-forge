// Course dates configuration - Easy to replace with database calls later
// TODO: Replace with API calls to fetch from database

export interface CourseDate {
  startDate: string;
  endDate: string;
}

export interface CourseInfo {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  title: string;
  price: number;
  duration: string;
  courseDays: string;
  location: string;
  exam: string;
  availableDates: CourseDate[];
  description: string;
  targetAudience: string[];
  materials: {
    coursebook?: { name: string; isbn: string; url: string };
    additional?: { name: string; isbn: string; url: string };
    note?: string;
  };
}

// Centralized course dates - Easy to move to API later
export const COURSE_DATES: CourseDate[] = [
  { startDate: '02.06.2025', endDate: '24.07.2025' },
  { startDate: '04.08.2025', endDate: '26.09.2025' },
  { startDate: '06.10.2025', endDate: '28.11.2025' },
  { startDate: '05.01.2026', endDate: '26.02.2026' },
];

export const coursesData: CourseInfo[] = [
  {
    level: 'A1',
    title: 'Deutsch Intensivkurs A1 in Dortmund – Sprachzertifikat in 8 Wochen',
    price: 569,
    duration: 'ca. 2 Monate',
    courseDays: 'Montag - Donnerstag',
    location: 'in Dortmund',
    exam: 'telc A1 optional',
    availableDates: COURSE_DATES,
    description: 'Unsere DEE-Sprachschule Dortmund bietet Ihnen professionelle Deutsch-Intensivkurse für alle Niveaustufen von A1 bis C1. Die Kurse sind flexibel verfügbar als Präsenzunterricht in Dortmund oder online. Jeder Kurs bereitet Sie gezielt auf die telc-Prüfungen vor.',
    targetAudience: [
      '✔️ Anfänger ohne Vorkenntnisse: Sie haben noch nie Deutsch gelernt? Perfekt – hier starten Sie bei Null.',
      '✔️ Berufseinsteiger oder Studierende: Sie benötigen Deutsch für Arbeit, Studium oder den Alltag in Deutschland.',
      '✔️ Neu in Dortmund: Sie möchten sich schnell in der Stadt zurechtfinden und Kontakte knüpfen.'
    ],
    materials: {
      coursebook: {
        name: 'Akademie Deutsch A1+',
        isbn: '978-3-19-101650-0',
        url: 'https://shop.hueber.de/de/sprache-lernen/deutsch-als-fremdsprache-daf-daz/lehrwerk/akademie-deutsch-a1-intensivlw-bd-1-978-3-19-101650-0.html'
      },
      additional: {
        name: 'Akademie Deutsch A1+',
        isbn: '978-3-19-111650-7',
        url: 'https://shop.hueber.de/de/sprache-lernen/deutsch-als-fremdsprache-daf-daz/lehrwerk/akademie-deutsch-a1-zusatzmat-bd-1-978-3-19-111650-7.html'
      }
    }
  },
  {
    level: 'A2',
    title: 'Deutsch Intensivkurs A2 in Dortmund – Sprachzertifikat in 8 Wochen',
    price: 579,
    duration: 'ca. 2 Monate',
    courseDays: 'Montag - Donnerstag',
    location: 'Präsenz',
    exam: 'telc A2 optional',
    availableDates: COURSE_DATES,
    description: 'Unsere DEE-Sprachschule Dortmund bietet Ihnen professionelle Deutsch-Intensivkurse für alle Niveaustufen von A1 bis C1. Die Kurse sind flexibel verfügbar als Präsenzunterricht in Dortmund oder online. Jeder Kurs bereitet Sie gezielt auf die telc-Prüfungen vor.',
    targetAudience: [
      '✔️ Teilnehmer mit A1-Grundkenntnissen – Sie haben bereits die Grundlagen erlernt und möchten Ihr Sprachniveau erweitern.',
      '✔️ Berufstätige & Studierende – Sie benötigen erweiterte Deutschkenntnisse für Beruf, Studium oder den Alltag in Deutschland.',
      '✔️ Neu in Dortmund – Sie möchten sich schneller integrieren, neue Kontakte knüpfen und sicherer auf Deutsch kommunizieren.'
    ],
    materials: {
      coursebook: {
        name: 'Akademie Deutsch A2+',
        isbn: '978-3-19-121650-4',
        url: 'https://shop.hueber.de/de/akademie-deutsch-a2-intensivlw-bd-2-978-3-19-121650-4.html'
      },
      additional: {
        name: 'Akademie Deutsch A2+',
        isbn: '978-3-19-131650-1',
        url: 'https://shop.hueber.de/de/akademie-deutsch-a2-zusatzmat-bd-2-978-3-19-131650-1.html'
      }
    }
  },
  {
    level: 'B1',
    title: 'Deutsch Intensivkurs B1 in Dortmund – Sprachzertifikat in 8 Wochen',
    price: 589,
    duration: '8 Wochen',
    courseDays: 'Montag - Donnerstag',
    location: 'Präsenz',
    exam: 'telc B1 optional',
    availableDates: COURSE_DATES,
    description: 'Unsere DEE-Sprachschule Dortmund bietet Ihnen professionelle Deutsch-Intensivkurse für alle Niveaustufen von A1 bis C1. Die Kurse sind flexibel verfügbar: als Präsenzunterricht in Dortmund oder online. Jeder Kurs bereitet Sie gezielt auf die telc-Prüfungen vor.',
    targetAudience: [
      '✔️ Teilnehmer mit A2-Kenntnissen – Sie möchten fließend kommunizieren und berufliche/akademische Ziele erreichen.',
      '✔️ Berufstätige – Sie benötigen Deutsch für Meetings, Präsentationen oder Kundenkontakt.',
      '✔️ Studierende – Vorbereitung auf ein Studium oder den TestDaF.',
      '✔️ Neu in Deutschland – Sie streben Integration in den Arbeitsmarkt oder gesellschaftliche Teilhabe an.'
    ],
    materials: {
      coursebook: {
        name: 'Akademie Deutsch B1+',
        isbn: '978-3-19-141650-8',
        url: 'https://shop.hueber.de/de/akademie-deutsch-b1-intensivlw-bd-3-978-3-19-141650-8.html'
      },
      additional: {
        name: 'Akademie Deutsch B1+',
        isbn: '978-3-19-151650-5',
        url: 'https://shop.hueber.de/de/akademie-deutsch-b1-zusatzmat-bd-3-978-3-19-151650-5.html'
      }
    }
  },
  {
    level: 'B2',
    title: 'Deutsch Intensivkurs B2 in Dortmund – Sprachzertifikat in 8 Wochen',
    price: 599,
    duration: '8 Wochen',
    courseDays: 'Montag - Donnerstag',
    location: 'Präsenz',
    exam: 'telc B2 optional',
    availableDates: COURSE_DATES,
    description: 'Unsere DEE-Sprachschule Dortmund bietet Ihnen professionelle Deutsch-Intensivkurse für alle Niveaustufen von A1 bis C1. Die Kurse sind flexibel verfügbar: als Präsenzunterricht in Dortmund oder online. Jeder Kurs bereitet Sie gezielt auf die telc-Prüfungen vor.',
    targetAudience: [
      '✔️ Teilnehmer mit B1-Kenntnissen – Sie möchten Deutsch für akademische oder berufliche Herausforderungen meistern.',
      '✔️ Berufstätige – Sie benötigen Deutsch für Verhandlungen, Fachvorträge oder Führungsaufgaben.',
      '✔️ Studierende – Vorbereitung auf ein deutschsprachiges Studium oder den TestDaF.',
      '✔️ Akademiker – Sie streben die Veröffentlichung von Fachtexten oder Forschungsergebnissen an.'
    ],
    materials: {
      coursebook: {
        name: 'Akademie Deutsch B2+',
        isbn: '978-3-19-161650-2',
        url: 'https://shop.hueber.de/de/akademie-deutsch-b2-intensivlw-bd-4-978-3-19-161650-2.html'
      },
      additional: {
        name: 'Akademie Deutsch B2+',
        isbn: '978-3-19-171650-9',
        url: 'https://shop.hueber.de/de/akademie-deutsch-b2-zusatzmat-bd-4-978-3-19-171650-9.html'
      }
    }
  },
  {
    level: 'C1',
    title: 'Deutsch Intensivkurs C1 in Dortmund – Sprachzertifikat in 8 Wochen',
    price: 599,
    duration: '8 Wochen',
    courseDays: 'Montag - Donnerstag',
    location: 'Präsenz',
    exam: 'telc C1 optional',
    availableDates: COURSE_DATES,
    description: 'Unsere DEE-Sprachschule Dortmund bietet Ihnen professionelle Deutsch-Intensivkurse für alle Niveaustufen von A1 bis C1. Die Kurse sind flexibel verfügbar als Präsenzunterricht in Dortmund oder online. Dieser Kurs bereitet Sie gezielt auf die telc C1, DSH oder TestDaF Prüfungen vor.',
    targetAudience: [
      '✔️ Studienbewerber: Sie planen ein Studium an einer deutschen Hochschule und benötigen das C1-Sprachzertifikat (DSH, TestDaF oder telc C1 Hochschule).',
      '✔️ Berufstätige: Sie möchten Ihre Deutschkenntnisse auf ein professionelles Niveau heben, um sich im Beruf sicher und kompetent auszudrücken.',
      '✔️ Fortgeschrittene Deutschlerner: Sie haben bereits B2 abgeschlossen und wollen Ihre Sprachkompetenz auf C1-Niveau ausbauen.'
    ],
    materials: {
      note: 'Kein festgelegtes Lehrbuch, da der Kurs gezielt auf telc C1, DSH & TestDaF vorbereitet. DEE-Materialien (im Kurs kostenlos erhältlich): Prüfungssimulationen (DSH, TestDaF, telc C1 Hochschule), Wissenschaftliche & journalistische Texte, Fachspezifische Hör- & Leseaufgaben'
    }
  }
];
