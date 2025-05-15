## Projektbeschreibung

**Projektname:** Sauce Demo

**Projektbeschreibung:** Es handelt sich hier um einen Online-Shop, der den registrierten Kunden einen sicheren Kaufprozess ermöglicht

**Ziel:** Automatisierte Tests der Sauce-Demo-Seite

**Frameworks:** Cucumber, Playwright

## Installation

1. Repository klonen:

`git clone https://github.com/AMurak35/Demo-Project.git`  
`cd https://github.com/AMurak35/Demo-Project.git`

2. Abhängigkeiten installieren:

`npm install`

3. Playwright-Browser installieren:

`npx playwright install`

4. Cucumber installieren:

`npm install --save-dev @cucumber/cucumber`

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

## Cucumbertests

Cucumbertests sind unter `tests/features` zu finden. Diese werden den drei Schritten im Kaufprozess entsprechend unterteilt: Loging, Auswahl der Produkte, Kaufabschluss.

Die Stepdefinitions befinden sich unter `tests/features/step_definitions`. Sie sind ebenso in drei Dateien verteilt:

```
- stepdefs-login.ts
- stepdefs-inventory-page.ts
- stepdefs-checkout-process.ts
- stepdefs-cart-page.ts
```

Die Before- und After-Conditionen befindet sich in der Datei `hooks.ts`.

Die Datei `stepdefs-common.ts` beinhaltet Schitte, die für mehrere Features gleich sind.

In der Datei `world.ts` wird die CustomWorld-Klasse definiert.

## Tests ausführen

- Testfälle werden mit diesem Befehl ausgeführt:

`npm run`

- Um das Ergebnis der Testdurchführung als JSON-Report zu speichern und danach HTML-Report-Skript zu starten, wird folgender Befehl benutzt:

`npm test:report`

Damit werden die Testberichte nach dem Testlauf automatisch erstellt.

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
