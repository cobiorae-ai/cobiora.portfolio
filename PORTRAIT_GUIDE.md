# Adding your portrait to the About section

This update uses your uploaded portrait in the About section of `index.html`.

## Apply it to your existing GitHub Pages repository

1. Download the **About portrait patch** ZIP.
2. Extract it and copy `index.html`, `styles.css`, and the `assets` folder into the root of your existing cloned repository. Agree to replace `index.html` and `styles.css`; the added `assets/about-portrait.jpg` should be inside your existing `assets/` directory.
3. Preview your local `index.html`. On desktop the About section displays **photo | biography | education/research interests**. On smaller screens it reflows to two columns and then one.
4. In GitHub Desktop, review changes, commit, and **Push origin**. Your existing GitHub Pages configuration remains the same.

## Change the photo later

Replace `assets/about-portrait.jpg` with another JPG using the **same filename**. You do not need to edit HTML. If you change the filename, update `src="assets/about-portrait.jpg"` in `index.html`.

The photo is saved at its original pixel dimensions (880 × 1234), converted to a high-quality JPG for faster loading. It has not been retouched or cropped.

## Adjust portrait width

At the bottom of `styles.css`, look for the rules under `ABOUT PORTRAIT`. The `220px` in the desktop `grid-template-columns` controls the portrait column width. The `max-width: 260px` in the mobile rules controls how wide it appears when stacked.

**Note:** This patch is based on the latest warm-palette website. If you made edits to `index.html` or `styles.css` after that version, merge the changes instead of overwriting your own edits.
