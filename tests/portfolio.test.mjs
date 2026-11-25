import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SECTION_COLORS, createSpherePoints, createSphereEdges, scrollFraction, activeSectionIndex } from "../app/particle-sphere-utils.mjs";

const root = process.cwd();
const page = readFileSync(join(root, "app/page.tsx"), "utf8");
const css = readFileSync(join(root, "app/globals.css"), "utf8");
const features = page.match(/const featured: Project\[\] = \[([\s\S]*?)\n\];/);
assert.ok(features, "Featured projects array must be present");
const featuredNames = [...features[1].matchAll(/^\s+title:\s+"([^"]+)"/gm)].map((match) => match[1]);

test("all eight featured projects appear in the requested order", () => {
  assert.deepEqual(featuredNames, [
    "DOT AI",
    "Scene Studio",
    "LearnTranslate",
    "Deep Reinforcement Learning for Gaming",
    "Autonomous Driving Research",
    "Studly Prototype",
    "DragonLume",
    "PyDangeon",
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
    ["LearnTranslate", "https://github.com/Forkan01/learntranslate", false],
    ["Deep Reinforcement Learning for Gaming", "https://github.com/Forkan01/Automatic-Game-Playing-with-DL--Autonomous-Sys.-B", false],
    ["Autonomous Driving Research", "https://github.com/Forkan01/HSHL_Research", false],
    ["DragonLume", "https://github.com/Forkan01/Dragonlume", true],
    ["PyDangeon", "https://github.com/Forkan01/PyDangeon", true],
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


test("degree, screenshot and accessibility improvements are present", () => {
  assert.match(page, /B\.Eng\. \(in progress\)/);
  assert.doesNotMatch(page, /B\.Sc\./);
  assert.ok(existsSync(join(root, "public/projects/todo-flutter.png")));
  assert.ok(existsSync(join(root, "app/icon.svg")));
  assert.ok(existsSync(join(root, "app/opengraph-image.tsx")));
  assert.ok(!existsSync(join(root, "CVpic.png")));
  assert.match(page, /className="skip-link"/);
  assert.match(page, /role="status"/);
  assert.match(page, /fetchPriority="high"/);
});


test("particle sphere geometry is deterministic and bounded", () => {
  const points = createSpherePoints(130);
  assert.equal(points.length, 130);
  assert.deepEqual(points, createSpherePoints(130));
  assert.ok(points.every(p => Math.abs(p.x*p.x+p.y*p.y+p.z*p.z-1)<1e-10));
  const edges = createSphereEdges(points);
  assert.ok(edges.length > 0 && edges.length < 600);
  assert.ok(edges.every(([a,b]) => a>=0 && b<130 && a<b));
});

test("particle scroll state clamps progress and detects active sections", () => {
  assert.equal(scrollFraction(250,2000,1000),0.25);
  assert.equal(scrollFraction(-20,2000,1000),0);
  assert.equal(scrollFraction(2000,2000,1000),1);
  assert.equal(scrollFraction(0,1000,1000),0);
  assert.equal(scrollFraction(NaN,2000,1000),0);
  assert.equal(activeSectionIndex([0,100,200,300,400],250,false),2);
  assert.equal(activeSectionIndex([0,100,200,300,400],350,true),4);
  assert.equal(SECTION_COLORS.length,5);
});

test("header uses an accessible scroll-reactive particle sphere", () => {
  const sphere = readFileSync(join(root,"app/particle-sphere.tsx"),"utf8");
  assert.match(page, /<ParticleSphere \/>/);
  assert.doesNotMatch(page, /<ScrollProgress|className="nav-cta"/);
  for (const token of ["requestAnimationFrame","cancelAnimationFrame","ResizeObserver","prefers-reduced-motion","visibilitychange","Back to top","activeSectionIndex"]) assert.ok(sphere.includes(token), token);
  assert.doesNotMatch(sphere, /particle-sphere-toggle|toggleAnimation|Pause particle animation/);
  assert.doesNotMatch(css, /\.particle-sphere-toggle/);
  assert.match(css,/\.particle-sphere-canvas/);
  assert.doesNotMatch(css,/\.scroll-dial/);
});


test("Scene Studio links directly to its production website instead of a private repository", () => {
  const scene = features[1].split(/(?=^\s+title:\s+")/m).find(s => s.startsWith('    title: "Scene Studio"'));
  assert.ok(scene);
  assert.ok(scene.includes('demo: "https://scene-studio-beige.vercel.app/"'));
  assert.doesNotMatch(scene, /github:|githubPrivate:/);
});

test("PyDangeon has a featured game card with verified scope and dedicated artwork", () => {
  const entry = features[1].split(/(?=^\s+title:\s+")/m).find(s => s.startsWith('    title: "PyDangeon"'));
  assert.ok(entry);
  for (const label of ["Godot 4", "GDScript", "Python", "The First Spark", "The Rune Vault", "In development"]) assert.ok(entry.includes(label), label);
  assert.match(entry, /art: "pydangeon"/);
  assert.match(page, /project\.art === "pydangeon"/);
  assert.match(page, /Gamepad2, Code2\]\[index\]/);
  assert.match(page, /"EDTECH \+ GAME DEVELOPMENT"\]\[index\]/);
  assert.match(css, /\.art-pydangeon/);
});
