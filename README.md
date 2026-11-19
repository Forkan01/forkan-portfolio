# Abdullah Al Forkan — Personal Portfolio

A light, infographic-style, responsive personal portfolio built with Next.js, React and TypeScript.

## Run locally

Requires Node.js 22 or later.

\`\`\`bash
npm install
npm test
npm run typecheck
npm run build
npm run dev
\`\`\`

Open http://localhost:3000.

The site deliberately avoids API keys, databases and live generation calls.

## Page structure

1. **About / Hero** — introduction, profile picture, social links and quick facts
2. **Featured Projects** — seven selected projects, four per row on most laptop/desktop screens
3. **More Projects** — compact category-filtered gallery
4. **Skills & Technologies**
5. **Education & Experience** — includes a research anchor for autonomous driving
6. **Contact & footer**

The **About** navbar link returns to the hero rather than jumping below projects. Mobile navigation closes on link selection or Escape.

## Featured projects

1. DOT AI — in development
2. Scene Studio — JSON-powered infographic/video editor
3. LearnTranslate — in development
4. Deep Reinforcement Learning for Gaming — *Snake AI local*
5. Autonomous Driving Research — links to research experience
6. Studly Prototype — live prototype link
7. DragonLume — original game in development (no public source or demo link claimed)

Descriptions indicate development/prototype status where relevant. Links point to existing GitHub repositories or published prototypes.

## Profile picture

The uploaded \`CVpic.png\` has been copied to \`public/CVpic.png\` so Next.js can serve it at \`/CVpic.png\`. The original repository-root copy is retained. If the picture fails to load, the hero falls back to the public GitHub avatar.

## Project artwork

The design uses hand-built CSS/HTML illustrations where project screenshots have not been committed. This deliberately avoids broken image icons or pretending illustrations are exact product screenshots.

To replace a card's illustrative art with a real screenshot, put the image under \`public/projects/\` and add \`image: "/projects/name.png"\` to the corresponding project object in \`app/page.tsx\`.

## Verification

Run \`npm test\` to verify requested featured-project order, anchored navigation, photo path, filter UI and local image references. Run \`npm run typecheck\` and \`npm run build\` for full TypeScript and production checks.

No deployment or GitHub Actions workflow is required to preview locally.

## Contact

Portfolio email uses the HSHL student address. Update the links if you prefer another contact email. No placeholder Download CV button is presented; add a PDF before enabling that action.
