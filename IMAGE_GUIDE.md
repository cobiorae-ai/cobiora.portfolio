# Adding your own project images (no code changes needed for default filenames)

This website now has **optional real-image slots**. You can keep any existing starter drawings that you like. When you put a photo or plot with the filename listed below in `assets/projects/`, the site automatically swaps in that image. If you haven't added a file yet, the original illustration or placeholder stays visible.

## Step-by-step: your pterosaur project

1. In the cloned repository, open the `assets` folder and create a folder called `projects` if it doesn't exist.
2. Export a representative real figure or photo from your pterosaur project.
3. Save it with the name `pterosaur-cover.jpg` in `assets/projects/`. **Use actual JPEG format** for a `.jpg` file (don't rename a PNG without converting it).
4. For your detailed pterosaur project page, place an airfoil comparison plot at `assets/projects/pterosaur-airfoil.png`, and your concept drawing, photo or CAD image at `assets/projects/pterosaur-concept.jpg`.
5. Preview your local `index.html`, then commit and push the image files to GitHub. The homepage cover should update automatically and the two figures should show up in the pterosaur project page.
6. Edit the `<figcaption>` text in `projects/pterosaur-glider.html` to describe your actual figures and analysis. Avoid posting unverified or confidential results.

## Built-in filenames

| Project | Homepage cover image | Detail page image 1 | Detail page image 2 |
| --- | --- | --- | --- |
| Optimal Gearing | `gearing-cover.jpg` | `gearing-results.png` | `gearing-model.png` |
| Pterosaur Glider | `pterosaur-cover.jpg` | `pterosaur-airfoil.png` | `pterosaur-concept.jpg` |
| Robotic Arm | `robotic-arm-cover.jpg` | `robotic-arm-cad.jpg` | `robotic-arm-prototype.jpg` |
| MoonRanger Interface | `moonranger-cover.jpg` | `moonranger-cad.jpg` | `moonranger-sequence.jpg` |

All 12 files belong in **`assets/projects/`**, which is relative to your repository root. These are filenames only, not supplied images. Add only the ones you have; the rest keep the original artwork or placeholders.

## Using PNG/WebP instead of JPG

Keep the real file extension and change the matching `data-photo` attribute in the HTML. Example, if your cover file is `pterosaur-cover.png`, edit `index.html`:

```html
<div class="project-art art-glider"
     data-photo="assets/projects/pterosaur-cover.png"
     data-photo-alt="Airfoil simulation from my pterosaur glider project"
     data-photo-fit="contain">
```

Project detail pages are one directory deeper, so their paths start with `../assets/projects/`.

## About image size, fitting, and captions

- Use **JPEG or WebP** for photos and screenshots when appropriate; **PNG** for plots with small labels or lines. SVG is also good for vector diagrams if it is safe and self-contained.
- Aim for around **1200–1800 pixels wide** for cover images, and compress large files so the site loads quickly. You usually don't need multi-megabyte exports.
- `data-photo-fit="contain"` shows the complete plot/CAD image without cropping. `data-photo-fit="cover"` fills the rectangle, which works well for photos but crops the edges.
- Update `data-photo-alt` in the HTML to describe what the **actual** image shows, not what you intended to show.
- Each detail page has a caption in `<figcaption>`. Edit these to state the result, parameters, or design feature your viewers should notice.
- Be mindful of figure permissions, lab unpublished results, and employer restrictions before sharing them publicly.

## How to publish your edits

Since you've already cloned and pushed your GitHub Pages repository:

1. Copy the modified code files from this update into your existing local repository (or make the same edits yourself).
2. Add images to `assets/projects/`.
3. Open GitHub Desktop, verify the list of changed files, enter a commit message such as `Update About and add project figures`, click **Commit to main**, then **Push origin**.
4. Refresh your public site once GitHub Pages finishes deploying. If you still see an older image, hard-refresh or check filename capitalization.

You do **not** need to create a new repository or set up Pages again.
