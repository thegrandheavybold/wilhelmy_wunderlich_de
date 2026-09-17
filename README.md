# wilhelmy_wunderlich_de
11ty > Netlify > wilhelmy_wunderlich_de Website

## Development

- `npm install`
- `npm run dev`
- lokale URL: `http://127.0.0.1:8888`

Der Dev-Workflow läuft über drei Prozesse:

- `vite build --watch` für gehashte Assets und Code-Splitting
- `11ty --watch` für HTML-Rebuilds nach `dist`
- `netlify dev` für Redirects, `/.netlify/images` und produktionsnahe lokale Auslieferung

Bildgrößen laufen über Netlify Image Transform und werden lokal wie in Produktion über `/assets/img/:width/:file` ausgeliefert.

## Production build

- `npm run build`
