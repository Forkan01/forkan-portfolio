# Abdullah Al Forkan — Portfolio

A responsive personal portfolio in a **light infographic / Google-inspired** visual style.

## Preview and development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open the forwarded **3000** port in GitHub Codespaces.

## Layout

- Compact hero with photo, social links, and a light background
- Featured Projects: four cards per desktop row, two on tablets, one on phones
- More Projects: searchable-by-category filter buttons (client-side)
- Skills, About, Education & Experience, and Contact

All project links point to publicly identified projects or live prototypes. The planned Linux System Monitor & Auto-Healer is **not** represented as completed work.

## Local images

The original Codespaces project has locally uploaded images not yet committed to \`main\`. The design expects these optional paths:

\`\`\`text
public/profile/abdullah.png
public/projects/studly.png
public/projects/note-taking.png
public/projects/todo-flutter.png
public/projects/dragon-slayer.png
\`\`\`

Optional featured screenshots:

\`\`\`text
public/projects/dot-ai.png
public/projects/snake-ai.png
public/projects/autonomous-driving.png
\`\`\`

Missing project images show built-in *illustrative previews* rather than broken image boxes. Missing portrait falls back to the public GitHub avatar.

For professional applications, replace generated mockup screenshots with real app captures whenever available.

## Important: original local Codespace

At the time this redesign was prepared, the remote \`main\` branch contained **only a README**. Do not discard the original Codespace's uncommitted files or locally uploaded image assets. This design is committed on a **separate review branch**.

To preview this new version without disturbing your old Codespace, create a **new Codespace on the \`design/light-infographic-portfolio\` branch** and run \`npm install && npm run dev\`.

To integrate your local images later, copy or commit them from the original Codespace into this branch.

## Contact links

The contact email is currently the user's HSHL student address. Update it if a different professional email should be used. There is no broken Download CV button; add a real PDF before enabling a download action.
