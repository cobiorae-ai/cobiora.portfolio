# Changing the color palette

Open `styles.css`. The first CSS `:root` block contains all five editable colors:

```css
:root {
  --peach: #FFDBBB;
  --stone: #CCBEB1;
  --taupe: #997E67;
  --brown: #664930;
  --black: #171411;
  /* Leave the semantic mappings below untouched. */
}
```

Edit these five hex values and save. All site section colors and the inline SVG artwork use them, without editing every page. The project images you supply are photos and **will not be recolored**. Two static files are an exception: `assets/favicon.svg` has three literal hex values, and every HTML page has a `meta name="theme-color"` tag with `#FFDBBB`. These are not part of the regular CSS rendering, so change them separately if you alter your palette later.

## Publish from your existing GitHub Pages repository

1. Extract the ZIP. Copy its contents into the root of your **already cloned** repository, replacing the matching files. Do not create a new repository.
2. In GitHub Desktop, review the differences, commit (`Change portfolio color palette`), then **Push origin**.
3. Refresh your site. If the old version appears, hard-refresh with Shift+Reload or open a private window.

The other project content and the 2D walker are unchanged.
