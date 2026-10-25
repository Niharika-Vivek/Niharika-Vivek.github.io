# Vivekvardhan & Niharika — GitHub Pages invitation

This ZIP contains the current invitation as a static website: curtains, burgundy/cream/gold theme, music, rising gold stars, animated text, large times, calendar download and directions. It does not contain account credentials, guest replies or the old database.

## 1. Upload to GitHub Pages

1. Extract this ZIP on a computer. Upload the extracted files, not the ZIP.
2. Sign in to GitHub as Niharika-Vivek.
3. Create a PUBLIC repository named `niharika-vivek.github.io`.
4. Add file > Upload files. Drag the CONTENTS of the extracted folder into GitHub. `index.html` must be at repository root, alongside `assets`, `version-three`, `config.js` and the music file. Do not upload one enclosing folder.
5. Commit changes.
6. Settings > Pages > Source: Deploy from a branch > main > /(root) > Save.
7. Wait for GitHub to report deployment success. Open `https://niharika-vivek.github.io/`.
8. The RSVP page uses `?page=rsvp` so direct links and refresh work without a special server.

There is no domain registration fee for this github.io address. The public repository contains only the invitation website. Guest responses belong in your private Google Sheet, never in GitHub.

## 2. RSVP IS NOT CONNECTED YET

The form shows an explicit setup-pending message until you complete this section. It does not pretend to save replies. Your existing hosted invitation and database are unchanged. Existing replies do not automatically transfer into this new Sheet.

1. Create a blank Google Sheet: `Vivekvardhan & Niharika — Wedding RSVPs`.
2. Share it with your fiancee as Editor; keep General access Restricted.
3. On a computer, open Extensions > Apps Script.
4. Replace the editor contents with `setup/google-apps-script.gs` from this ZIP.
5. In the script, replace `REPLACE_WITH_YOUR_SPREADSHEET_ID` with the ID between `/d/` and `/edit` in the spreadsheet URL.
6. Save. Deploy > New deployment > Web app.
7. Execute as: Me. Who has access: Anyone (anonymous guests must be able to submit). This publishes a write-only receiver; it does NOT make your spreadsheet public. If your account administrator disallows this deployment, stop and use another backend rather than sharing the Sheet publicly.
8. Review Google's permissions and authorize your own script. Finish deployment; copy the web app URL ending `/exec` (not `/dev`).
9. In GitHub edit `config.js`; paste the URL between the quotes for `rsvpEndpoint`. Leave everything else intact. Commit the change and wait for Pages to redeploy.
10. Guests do not need a Google account. This receiver only returns success/error and never exposes your guest list.

No password or private key belongs in config.js. The endpoint is public; a honeypot, validation and duplicate-ID protection are included, but this is not comprehensive anti-spam protection. Google Apps Script service quotas apply. There are no automatic email/SMS alerts in this package.

## 3. Test before sharing

The static bundle has been built and checked. The Google receiver is supplied as setup code, NOT a deployed or end-to-end-tested connection.

1. Open the LIVE GitHub Pages URL on a phone and computer. Opening index.html by double-clicking locally is not a supported preview for module scripts.
2. Open curtains; check garland exit, music, text, dates, large ceremony/lunch times and stars.
3. Confirm Directions points to 11391 State Highway 121, Trenton, TX 75490.
4. Confirm calendar shows November 15, 2026 at 7:30 AM Central Time.
5. Open RSVP. Submit a clearly labelled TEST guest, attending, total guests 3 and children 1.
6. The success message must appear AND the private Sheet must contain exactly one row with adults 2, children 1, total 3.
7. Test a declined RSVP: all counts must be zero. Check your fiancee can see both rows.
8. If the browser reports an error, check the Sheet before retrying. The form retains the same response ID for retries in the same page session to avoid duplicates. A new tab/reload creates a new response ID.
9. Check anonymous visitors cannot open the private spreadsheet. Delete only the labelled test rows once verified.
10. If Google deployment, redirect/CORS, permissions or quota errors prevent confirmed saving, do not share the invitation yet. Return with the error so the connection can be corrected.

## Updates

Edit config.js without rebuilding. For design changes, use the editable source in `editable-source/` and run `npm install` followed by `npm run build`. Publish the contents of its dist output and retain your configured config.js.

Music and artwork are bundled with this invitation. Review the public invitation details before uploading.
