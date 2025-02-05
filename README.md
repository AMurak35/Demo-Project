## Projektbeschreibung

**Projektname:** Sauce Demo

**Projektbeschreibung:** Es handelt sich hier um einen Online-Shop, der den registrierten Kunden einen sicheren Kaufprozess ermöglicht

**Ziel:** Automatisierte Tests der Sauce-Demo-Seite

**Tools:** Playwright mit TypeScript

## Installation

1. Repository klonen:

`git clone https://github.com/AMurak35/Demo-Project.git`  
`cd https://github.com/AMurak35/Demo-Project.git`

2. Abhängigkeiten installieren:

`npm install`

3. Playwright-Browser installieren:

`npx playwright install`

## Statische Codeanalyse

Für einen gut wartbaren und sauberen Code wird _Prettier_ benutzt. Dieses kann über VS Code installiert werden. Dafür muss man nach `Prettier - Code formatter` suchen und installieren.

Um sicherzustellen, dass diese erweiterung benutzt wird, muss man die VS-Code-Einstellungen prüfen und ggf. den Formatierer als Standardformatieren festlegen.

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Man kann _Prettier_ für bestimmte Sprachen nutzen. So sieht man im oberen Beispiel, dass es für alle Sprachen außer Java verwendet wird.

## Tests ausführen

- Einen bestimmten Test von einer bestimmten Seite starten:

`npx playwright test tests/login-page.spec.ts`

- Alle Tests ausführen:

`npx playwright test`

- Parallelisierung für schnellere Testläufe nutzen:

`npx playwright test --workers=4`

(Die Anzahl der Workers kann je nach Leistung des Systems angepasst werden)

- Debug-Modus für die Fehleranalyse nutzen:

`npx playwright test --debug`

## Berichte generieren

Die Testberichte werden nach dem Testlauf automatisch erstellt. Um sie als HTML-Report anzusehen, kann dieser Befehl ausgeführt werden:

`npx playwright show-report`

Für detaillierte Testberichte wird _Playwright Trace Report_ benutzt. Dafür kann man den `--trace` Flag auf `on` setzen und anschließend den HTML-Bericht öffnen und auf das Trace-Symbol klicken.

## Parallelisierung

Für eine schnellere Ausführung der Tests ist die Parallelisierung in playwright.config.ts aktiviert. Dort kann man die Anzahl der parallelen Worker anpassen.

```
export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Damit wird die Parallelisierung aktiviert
  workers: 4, //
  retries: 1, // Wiederholungen bei Fehlern
});
```

## Projektstruktur

Die Projektstruktur ist folgenderweise aufgebaut:

```
sauce-demo-project/
├── pages/
│   ├── login-page.ts             # Page Object für die Produktseite
│   ├── inventory-page.ts         # Page Object für die Login-Seite
│   ├── product-page.ts           # Page Object für die Product-Seite
│   ├── cart-page.ts              # Page Object für die Cart-Seite
│   ├── checkout-page.ts          # Page Object für die Checkout-Seite
├── tests/
│   ├── login-page.spec.ts        # Tests für die Login-Seite
│   ├── product-page.spec.ts      # Tests für die Produktseite
│   ├── cart-page.spec.ts         # Tests für den Warenkorb
│   ├── checkout-page.spec.ts     # Tests für die Checkout-Seite
├── global-setup.ts               # Globales Setup für Authentifizierung
├── playwright.config.ts          # Playwright-Konfigurationsdatei
├── package.json                  # Projektabhängigkeiten
└── README.md                     # Projektbeschreibung, Teststrategie und Testabdeckung
```

## Cross-Browser-Tests

Die Ausführung der Tests erfolgt auf folgenden Browsern:

- Chromium (Google Chrome)
- Firefox
- WebKit (Safari)

## Teststrategie

**Kernfunktionen:** Login, Produktdarstellung, Warenkorbmanagement, Checkout und Bestellbestätigung

Diese Funktionen stellen kritische, sicherheitsrelevante Workflows dar und sind dementsprechend in ihrer Prüfung hoch priorisiert.

Unten findet man die genaue Priorisierung der Funktionen.

**Hohe Priorität**

1. Login-Prozess (Positiv- und Negativfall)
2. Warenkorb (Prüfung der ausgewählten Produkte, Entwernen der Produkte, Fortsetzung zum Checkout)
3. Checkout (Kaufprozess abschließen, Kaufprozess abbrechen)

**Mittlere Priorität**

1. Produktdetails anzeigen.

**Niedrige Priorität**

1. Sortierung.
2. Layouts.

Aktuell sind die Szenarien der höheren und mittleren Priorität abgedeckt. Die entsprechenden Testfälle findet man in pagebezogenen Ordnern (siehe Projektstruktur oben). Außerdem wurde noch ein E2E-Test geschrieben, der den Kaufprozess vom Login bis zum erfolgreichen Checkout prüft. Die Erstellung der Testfälle, die die Szenarien der niedrigen Priorität betreffen, steht noch aus.
