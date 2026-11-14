# Chisom Obiora — Robotics Portfolio Starter

A complete, mobile-friendly starter portfolio for **GitHub Pages**, built from plain HTML, CSS, and JavaScript. No React, Node, hosting payment, build step, or third-party website builder is required.

The hero includes an **original SVG illustrated four-legged robot** with a continuous walking gait, a Play/Pause button, and a Show/Hide Joints button. The linkage positions are calculated from a two-segment inverse-kinematics construction. This is an **illustration, not a dynamics or gravity simulation**. The design is deliberately different from any referenced lab member's site.

## Folder structure

```text
robotics-portfolio-starter/
├── index.html                  Home, About, Research, Projects, Experience, CV, Contact
├── styles.css                  All visual styles and mobile layout
├── script.js                   Walker animation and navigation controls
├── .nojekyll                   Tells GitHub Pages to serve files directly
├── assets/
│   ├── favicon.svg
│   └── projects/                 Add your real JPG/PNG images here
├── projects/
│   ├── optimal-gearing.html
│   ├── pterosaur-glider.html
│   ├── robotic-arm.html
│   └── moonranger-interface.html
├── IMAGE_GUIDE.md               Image filenames and instructions
└── README.md
```

## 1. Preview it on your computer

1. Unzip this package.
2. Double-click `index.html` to open the website in your browser. All of its functionality works without installing anything (the optional Google Fonts will use system fonts if offline).
3. Click a project card to open an individual project page; use **Back to selected work** to return.

To use a local web server instead, from the unzipped folder run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## 2. Publish to GitHub Pages — recommended beginner method (GitHub Desktop)

1. Sign in to [GitHub](https://github.com/) (or create an account).
2. Make a new **public** repository named **`YOUR-USERNAME.github.io`**. Replace `YOUR-USERNAME` with your real GitHub username. Do not include the placeholder text literally. Initialize with a README if GitHub prompts you to; this package includes a README you can use instead.
3. Install [GitHub Desktop](https://desktop.github.com/) and **clone** that repository to a folder on your computer.
4. Copy the **contents** of this starter folder (`index.html`, `styles.css`, `script.js`, `projects`, `assets`, etc.) directly into the cloned repository folder. IMPORTANT: `index.html` must be at the root, not inside a second `robotics-portfolio-starter/` folder. If GitHub created a README, you can overwrite it with this one.
5. In GitHub Desktop, write a commit message such as `Add robotics portfolio starter`, click **Commit to main**, then **Push origin**.
6. In your repository on github.com, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, set the branch to `main` and folder to `/(root)`, then click **Save**.
7. Visit **`https://YOUR-USERNAME.github.io/`**. GitHub says initial publication or updates may take up to about 10 minutes. You can also use the **Visit site** link on the Pages settings screen.

**Alternative: terminal commands** (if you prefer Git): create an empty public `YOUR-USERNAME.github.io` repository *without* any initial files, open a terminal inside this starter folder, and run:

```sh
git init
git add .
git commit -m "Add robotics portfolio starter"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

Then complete step 6 above. You may need to authenticate with GitHub when pushing.

**Alternative: only GitHub in your browser:** create the repository, choose **Add file → Upload files**, and upload the site files. Preserve the `projects/` and `assets/` directory structure: GitHub's web uploader behavior for folders varies by browser; using GitHub Desktop is simpler if it does not preserve folders. Do not upload the ZIP as a ZIP—GitHub Pages needs the uncompressed files.

## 3. Personalize the website before sharing it

**Adding photos or scientific figures:** See [IMAGE_GUIDE.md](IMAGE_GUIDE.md). The site now automatically swaps selected placeholder illustrations with real files from `assets/projects/`, using filenames listed in the guide. The pterosaur homepage card now has a generic airfoil schematic rather than a possibly misleading creature silhouette.

**Start with `index.html`:**

- Search for `Chisom Obiora` and adjust the display name and page title if desired.
- Edit the main headline and introductory paragraph in the `hero` section.
- Update the About, Research, and Experience text.
- Edit the four project cards and descriptions in `#projects`.
- In `#cv`, replace the placeholder with a link like `<a href="assets/cv.pdf" target="_blank" rel="noopener">Download my CV ↗</a>` after placing your actual `cv.pdf` file in `assets/`.
- In `#contact`, replace the placeholder with a working mail link: `<a href="mailto:YOUR-EMAIL@EXAMPLE.COM">YOUR-EMAIL@EXAMPLE.COM</a>`. Use your real address.
- Optional: add GitHub, LinkedIn, Google Scholar, or ORCID links if they are yours.

**Then edit `projects/*.html`:**

- Replace placeholder image boxes with your actual project images. Put images under `assets/` and use paths like `<img src="../assets/my-photo.jpg" alt="Descriptive alt text">` from project detail pages.
- Write concise results and quantitative evidence, where you have them.
- Identify **your role**, team/collaborators, and the exact outcome.
- Confirm you have permission to publish images or details from coursework, industry internships, and lab work.

**Change colors/fonts in `styles.css`:** at the top, edit the `:root` variables (`--bg`, `--ink`, `--accent`, etc.). The fonts are DM Sans and Fraunces via Google Fonts; the site falls back to system fonts when unavailable.

## 4. Adjust the walking animation

Open `script.js` and look for:

- `specs`: the four leg locations and gait phase offsets.
- `stance = 0.62`: fraction of each cycle spent on the ground.
- `lift ... * 28`: how high the feet rise in swing.
- `t / 2.35`: walking animation cycle duration in seconds.
- `inverseKinematics`: calculates knee positions based on link lengths.

Open `index.html` to customize the robot body shapes and colors in the `#rover` SVG group. Make a backup before major edits.

## 5. Make future edits

Change files on your computer and in GitHub Desktop click **Commit to main → Push origin**. GitHub Pages will republish after the new commit. You do not need to redo Pages setup.

## Accessibility and design notes

- Semantic headings, keyboard focus styles, labeled navigation, Play/Pause and Show Joints buttons.
- Mobile navigation; responsive cards and sections.
- The animation starts paused for people who prefer reduced motion; Play still works.
- The walker is a **stylized concept**, not a measured or validated robotic gait.
- Placeholder CV/contact fields intentionally do **not** link to nonexistent files or fake contact addresses.
- No external code dependencies. Optional fonts use Google Fonts and are not essential.

## GitHub documentation

- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
