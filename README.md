# Sara Larocca Wellness: website

A finished, two-language website. English is at the root of the site and Swedish lives at `/sv/`. It has no build step, no framework and nothing to install: it's plain HTML, CSS and a small script.

```
site/
  index.html          English page
  sv/index.html       Swedish page
  thanks.html         "Thank you" page after a form (English)
  sv/tack.html        "Tack" page after a form (Swedish)
  404.html            Page-not-found
  favicon.svg         Honey hexagon browser icon
  assets/css/site.css Shared styles
  assets/js/site.js   Session toggle, booking switch (Cal.com setting is at the top)
  assets/img/         Photos and the tree-ring artwork
```

## 1. Put it online (free, about 10 minutes)

1. Go to **app.netlify.com/drop** and sign up (free).
2. Drag the **`site`** folder onto the page. A few seconds later the site is live at an address like `random-name.netlify.app`.
3. **Turn on the forms:** in the site dashboard, open **Forms → Enable form detection**. Then deploy once more, so Netlify finds the forms: under **Deploys**, drag the `site` folder in again.
4. **Get requests by email:** go to **Site configuration → Notifications → Form submission notifications → Add notification → Email**, and enter Sara's email address. Each booking request and newsletter signup then lands in her inbox. The Reply-to is set to the person who wrote, so she can just press Reply.
5. **Rename the site** (optional): **Site configuration → Change site name**, for example `saralaroccawellness.netlify.app`.

**Your own domain:** buy one (for example saralaroccawellness.se from Loopia, One.com or Namecheap). Then add it under **Domain management → Add a domain** and follow Netlify's steps.

Whenever you change something, drag the `site` folder in again under **Deploys**.

## 2. Fill in before you share it

Some facts still need filling in. They are marked with a dashed underline on the page; search both `index.html` and `sv/index.html` for `class="todo"`. Write in the real text, then delete the `<mark class="todo">` and `</mark>` around it.

| What | English page | Swedish page |
|---|---|---|
| Session length | `[60–90] min` (twice) | `[60–90] min` (twice) |
| Parking | `[Parking info]` | `[Parkering]` |
| Cancellation policy | `[Cancellation policy …]` | `[Avbokningsregler …]` |
| Street address (footer) | `[Street address]` | `[Gatuadress]` |
| Email (footer) | `[email@…]` | `[e-post@…]` |

Hidden for now (they come back with one small change):

- **Testimonials ("Kind words" / "Fina ord"):** look for the comment `TESTIMONIALS`. Put in real client quotes, with the clients' permission, then delete the word `hidden` in the `<section hidden …>` line just below the comment.
- **The tuning-fork video:** send the clip and it can go back into the "What is Biofield Tuning?" section.
- **The "Hi, I'm Sara" text** is the draft we wrote. Sara can rewrite it in her own words whenever she likes.

## 3. Switch to Cal.com booking (when Sara has an account)

Until then, the booking section is a short request form: session type, name, email, when suits, and a message. It arrives as an email (step 1.4).

When Sara has set up Cal.com and connected her iPhone calendar, open `assets/js/site.js` and fill in the line at the top:

```js
calLink: "saralarocca"        // her Cal.com username, or "saralarocca/in-person"
```

Save and redeploy. Both language versions then show her live Cal.com calendar, in the site's dark colours with honey highlights, instead of the form.

## 4. Before launch: a short checklist

- **Privacy policy:** the forms collect names and emails, so EU data-protection law (GDPR) requires a short privacy policy page. The message field could also hold health details. Link the policy in the footer.
- **Lawyer review** of the wording, as planned.
- **Google Fonts:** the typefaces load from Google. Some EU data-protection authorities prefer fonts that are self-hosted. Ask your lawyer; they can be moved into `assets/` in a few minutes.
- **Original photos:** replace the files in `assets/img/` with the originals from Sara's phone. Keep the same file names and nothing else needs changing. Around 2000 px on the long side is ideal.
- **Social sharing image:** once the domain is set, change `content="assets/img/forest.jpg"` in the `og:image` line to the full address (for example `https://saralaroccawellness.se/assets/img/forest.jpg`) on both pages.
- **Google Business Profile** for Sjuntorp, so she shows up on Google Maps.
- **Organisation number** in the footer, once the business is registered.
