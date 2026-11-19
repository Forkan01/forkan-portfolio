import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "app/page.tsx"), "utf8");
const css = readFileSync(join(root, "app/globals.css"), "utf8");
const features = page.match(/const featured: Project\[\] = \[([\s\S]*?)\n\];/);
assert.ok(features, "Featured projects array must be present");
const featuredNames = [...features[1].matchAll(/^\s+title:\s+"([^"]+)"/gm)].map((match) => match[1]);

test("all seven featured projects appear in the requested order", () => {
  assert.deepEqual(featuredNames, [
    "DOT AI",
    "Scene Studio",
    "LearnTranslate",
    "Deep Reinforcement Learning for Gaming",
    "Autonomous Driving Research",
    "Studly Prototype",
    "DragonLume",
  ]);
});

test("requested titles and status descriptions are present", () => {
  for (const label of ["Snake AI local", "Studly Prototype", "In development", "JSON-powered infographic video maker"]) {
    assert.ok(page.includes(label), "Missing: " + label);
  }
});

test("About navigation targets the hero, and research link targets experience", () => {
  assert.match(page, /<section className="hero-wrapper" id="about"/);
  assert.match(page, /className="experience-card" id="research"/);
  assert.doesNotMatch(page, /className="section about-section"/);
});

test("uploaded CV portrait is served from the Next.js public directory", () => {
  assert.ok(existsSync(join(root, "public/CVpic.png")), "CVpic.png must be in public/");
  assert.match(page, /"\/CVpic\.png"/);
});

test("project galleries have no missing local image references", () => {
  const imagePaths = [...page.matchAll(/image:\s+"(\/projects\/[^"]+)"/g)].map(x => x[1]);
  for (const asset of imagePaths) {
    assert.ok(existsSync(join(root, "public", asset.replace(/^\//, ""))), asset + " is missing");
  }
});

test("category filters and accessible mobile navigation are provided", () => {
  for (const label of ["Web Apps", "Games", "AI / ML", "Systems", "Embedded", "Research", "Mobile Apps"]) {
    assert.ok(page.includes(label));
  }
  assert.match(page, /aria-pressed=\{filter === f\}/);
  assert.match(page, /aria-controls="primary-navigation"/);
  assert.match(page, /event\.key === "Escape"/);
});

test("desktop gallery is four columns and hero name stays printable", () => {
  assert.match(css, /featured-grid.*more-grid.*grid-template-columns: repeat\(4,minmax\(0,1fr\)\)/s);
  assert.match(css, /@media print[\s\S]*?\.hero h1 span/);
});


test("verified GitHub links are attached to the corresponding featured project", () => {
  const matches = [
    ["DOT AI", "https://github.com/Forkan01/dot-ai", true],
    ["Scene Studio", "https://github.com/Forkan01/SceneStudio", true],
    ["LearnTranslate", "https://github.com/Forkan01/learntranslate", false],
    ["Deep Reinforcement Learning for Gaming", "https://github.com/Forkan01/Automatic-Game-Playing-with-DL--Autonomous-Sys.-B", false],
    ["Autonomous Driving Research", "https://github.com/Forkan01/HSHL_Research", false],
    ["DragonLume", "https://github.com/Forkan01/Dragonlume", true],
  ];
  for (const [title, url, privateRepo] of matches) {
    const entry = features[1].split(/(?=^\s+title:\s+")/m).find(s => s.startsWith("    title: " + JSON.stringify(title)));
    assert.ok(entry, "Missing project: " + title);
    assert.ok(entry.includes("github: " + JSON.stringify(url)), "Missing GitHub URL for " + title);
    assert.equal(entry.includes("githubPrivate: true"), privateRepo, "Incorrect visibility for " + title);
  }
  assert.match(page, /Private GitHub repositories can only be viewed by authorized accounts/);
});

test("More Projects show labeled links rather than icon-only actions", () => {
  assert.match(page, /<ExternalLink size=\{14\}\/><span>Demo<\/span>/);
  assert.match(page, /<Github size=\{14\}\/><span>GitHub<\/span>/);
  assert.match(css, /\.mini-links a\s*\{/);
});
