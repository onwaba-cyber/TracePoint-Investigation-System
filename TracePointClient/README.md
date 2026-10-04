# TracePointClient (React frontend)

Built with React 19, React Router and Vite. All case and suspect data is loaded from the
ASP.NET Core API (nothing is hard-coded).

## Person 3 - what is included
| Area | Files |
|---|---|
| React routing (`/`, `/case`, `/suspects`, `/evidence`, `/investigation`) | `src/App.jsx`, `src/main.jsx`, `src/components/Layout.jsx` |
| Home page (Start Investigation button) | `src/pages/HomePage.jsx` |
| Case page (loads `GET /api/cases/1`) | `src/pages/CasePage.jsx` |
| Suspects page (loads `GET /api/suspects`, selected suspect kept in React state) | `src/pages/SuspectsPage.jsx`, `src/context/InvestigationContext.jsx` |
| Page layout, responsive CSS | `src/index.css` |
| Tests for the above | `src/test/App.test.jsx` |

## Hand-over notes for the rest of the group
These files exist only so the pages work today. Replace/extend them on your own branch:

- **Person 4** - `Navigation.jsx`, `CaseCard.jsx`, `SuspectCard.jsx`, `SuspectList.jsx` are simple
  working versions using the agreed props (`suspect`, `isSelected`, `onSelect`, `caseItem`).
  Restyle freely, but keep the prop names. Build `EvidenceCard` and `InvestigationForm`.
- **Person 5** - `src/services/api.js` has `getCase`, `getSuspects`, `getEvidence`. Add
  `submitInvestigation` (POST `/investigations` with `{ caseID, suspectID, conclusion }`).
  `src/hooks/useApiData.js` gives `{ data, loading, error, reload }` for any loader.
- **Persons 4 and 5** - `src/pages/EvidencePage.jsx` and `src/pages/InvestigationPage.jsx` are
  placeholders (routes already work). The suspect chosen on the Suspects page is available
  anywhere with `const { selectedSuspect } = useInvestigation();`.

## Run it
1. Start the API first (`TracePointAPI`, profile `https` -> https://localhost:7080).
   If the browser blocks the HTTPS certificate, run once: `dotnet dev-certs https --trust`
   and open https://localhost:7080/api/cases in the browser to confirm JSON is returned.
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 (the port must stay 5173 - the API's CORS policy allows it).

If your API runs on another address, copy `.env.example` to `.env` and change `VITE_API_BASE_URL`.

## Test it
```
npm test
```
Runs 9 tests (routing, Home button, Case page, Suspects page, selected-suspect state,
loading/error messages) with the API mocked, so the API does not need to be running.

## Build for production
```
npm run build
```
