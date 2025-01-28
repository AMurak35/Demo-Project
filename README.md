## Projektbeschreibung

**Projektname:** Sauce Demo

**Projektbeschreibung:** Es handelt sich hier um einen Online-Shop, der den Kunden einen benutzerfreundlichen und sicheren Kaufprozess anbietet.

**Ziel:** Automatisierte Tests der Sauce-Demo-Seite

**Tools:** Playwright mit TypeScript.

## Installation
1. Repository klonen:
`git clone <repository-url>`
`cd <repository-ordner>`
2. Abhängigkeiten installieren:
`npm install`
3. Playwright-Browser installieren:
`npx playwright install`

Tests ausführen
- Einen bestimmten Test starten:
npx playwright test tests/login-page.spec.ts
- Alle Tests ausführen:
npx playwright test
- Parallelisierung für schnellere Testläufe nutzen:
npx playwright test --workers=4
(Die Anzahl der Workers kann je nach Leistung des Systems angepasst werden)
- Debug-Modus für die Fehleranalyse nutzen:
npx playwright test --debug

Berichte generieren
Die Testberichte werden nach dem Testlauf automatisch erstellt. Um sie als HTML-Report anzusehen, kann dieser Befehl ausgeführt werden:
npx playwright show-report

Parallelisierung
Für eine schnellere Ausführung der Tests ist die Parallelisierung in playwright.config.ts aktiviert. Dort kann man die Anzahl der parallelen Worker anpassen.

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Damit wird die Parallelisierung aktiviert
  workers: 4, // 
  retries: 1, // Wiederholungen bei Fehlern
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry', // Trace nur bei einem Fehler
  },
});

Projektstruktur
Die Projektstruktur ist folgenderweise aufgebaut:
sauce-demo-project/
├── pages/
│   ├── inventory-page.ts         # Page Object für die Produktseite
│   ├── login-page.ts             # Page Object für die Login-Seite
├── tests/
│   ├── e2e-test.spec.ts          # Page Object für die Login-Seite
│   ├── inventory-page.spec.ts    # Page Object für die Produktseite
│   ├── login-page.spec.ts        # Page Object für den Warenkorb
├── global-setup.ts               # Globales Setup für Authentifizierung
├── playwright.config.ts          # Playwright-Konfigurationsdatei
├── package.json                  # Projektabhängigkeiten
└── README.md                     # Dokumentation

Cross-Browser-Tests
Die Ausführung der Tests erfolgt auf folgenden Browsern:
Chromium (Google Chrome)
Firefox
WebKit (Safari)

