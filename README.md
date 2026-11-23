# Sara Larocca Wellness

Website for Sara Larocca Wellness, Biofield Tuning in Sjuntorp and at a distance.
Live at **https://saralaroccawellness.com** (English) and **/sv/** (Swedish).

## How it is hosted

- The code lives in this GitHub repository.
- Cloudflare (Workers) publishes it automatically: every push to `main` goes live within a minute or two.
  Pushes to other branches get a preview link instead (see the Cloudflare check on the commit).
- `wrangler.jsonc` tells Cloudflare to serve the folder as a static site; `.assetsignore` lists files that are not published.

## Files

| File | What it is |
|---|---|
| `index.html` | English page |
| `sv/index.html` | Swedish page |
| `404.html` | "Page not found" page |
| `assets/css/site.css` | All styles (Design C, "Apothecary") |
| `assets/js/site.js` | Session tabs, booking and newsletter forms, Cal.com switch |
| `assets/img/` | Photos, paper grain and tree-ring artwork |

## Settings in `assets/js/site.js`

- `email` - Sara's address. Until Cal.com and a newsletter tool are connected, the booking
  request and newsletter forms open the visitor's email app with a message to this address.
- `calLink` - put Sara's Cal.com link here (e.g. `"saralarocca"`) and the booking form is
  replaced by the Cal.com calendar automatically.

## Still to fill in

Text marked with a dashed underline on the page is a placeholder: session length, street address,
parking, cancellation policy, real client quotes and Sara's own "about" text.
