const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");
const { splitShows, todayInTirana, showList } = require("../src/_site.cjs");
const root = path.join(__dirname, "..", "_site");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const pages = walk(root).filter(file => file.endsWith(".html"));
const redirects = new Map(read("_redirects").trim().split("\n").map(line => line.split(/\s+/)));
const pageUrl = file => "/" + path.relative(root, file).split(path.sep).join("/").replace(/(^|\/)index\.html$/, "$1");
const ids = new Map(pages.map(file => {
  const values = [...fs.readFileSync(file, "utf8").matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(values).size, values.length, `Duplicate IDs in ${file}`);
  return [file, new Set(values)];
}));
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  assert(!/<!-- (NAVIGATION|BAND_LINEUP|UPCOMING_SHOWS|CHRONICLES) -->/.test(html), `Unrendered data in ${file}`);
  assert.equal((html.match(/<title>/g) || []).length, 1, `Title count in ${file}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Canonical count in ${file}`);
  if (!html.includes('name="robots" content="noindex"')) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `H1 count in ${file}`);
    assert(html.includes('href="/press/"'), `Missing Press navigation in ${file}`);
    assert.equal((html.match(/name="description"/g) || []).length, 1, `Description count in ${file}`);
  }
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
  const references = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(match => match[1]);
  references.push(...[...html.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match => match[1]));
  for (const ref of references) {
    const url = new URL(ref.replace(/&amp;/g, "&"), "https://syrgjyn.com" + pageUrl(file));
    if (url.origin !== "https://syrgjyn.com") continue;
    let target = url;
    if (redirects.has(target.pathname)) target = new URL(redirects.get(target.pathname), url.origin);
    const pathname = decodeURIComponent(target.pathname);
    const destination = path.join(root, pathname, pathname.endsWith("/") ? "index.html" : "");
    assert(fs.existsSync(destination), `Broken local link in ${file}: ${ref}`);
    if (target.hash && destination.endsWith(".html")) {
      assert(ids.get(destination)?.has(decodeURIComponent(target.hash.slice(1))), `Missing anchor in ${file}: ${ref}`);
    }
  }
}
const home = read("index.html");
const about = read("about/index.html");
const press = read("press/index.html");
const shows = read("shows/index.html");
const band = require("../_data/band.json");
for (const member of band.members) {
  for (const html of [home, about, press]) assert(html.includes(member.name), `Missing shared member ${member.name}`);
}
assert(home.includes("Arvit Banishta") && !home.includes("TBA"));
assert(!/Oct 12, 2025|Nov 08, 2025|Dec 19, 2025/.test(home));
assert(!home.includes("Join via Email"));
const postFiles = fs.readdirSync(path.join(__dirname, "..", "content", "posts")).filter(file => file.endsWith(".md"));
for (const html of [home, read("blog.html")]) {
  assert.equal((html.match(/class="post-card"/g) || []).length, postFiles.length, "CMS card count must match articles");
  const links = [...html.matchAll(/class="post-link" href="(\/posts\/[^" ]+)"/g)].map(match => match[1]);
  assert.equal(new Set(links).size, links.length, "Duplicate article links");
}
assert(shows.includes("Check-In Fest") && shows.includes("2023-10-03"));
assert(fs.statSync(path.join(root, "images/syrgjyn-hero.webp")).size < 500000, "Hero size budget");
assert(!fs.existsSync(path.join(root, "images/hero-bg.jpg")));
assert.equal(redirects.get("/members/"), "/about/#lineup");
const sitemap = [...read("sitemap.xml").matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const expected = pages.filter(file => !fs.readFileSync(file, "utf8").includes('name="robots" content="noindex"')).map(file => "https://syrgjyn.com" + pageUrl(file));
assert.deepEqual([...sitemap].sort(), expected.sort(), "Sitemap must include all published canonical pages");
assert(!sitemap.some(url => /members|README|CHANGELOG/.test(url)));
const events = [
  { date: "2026-11-23", title: "Past", city: "Tirana" },
  { date: "2026-11-25", title: "Future", city: "Tirana" },
  { date: "2026-11-24", title: "Today", city: "Tirana" }
];
const split = splitShows({ events }, "2026-11-24");
assert.deepEqual(split.upcoming.map(event => event.title), ["Today", "Future"]);
assert.deepEqual(split.past.map(event => event.title), ["Past"]);
assert.equal(splitShows({ events }, "2026-11-26").upcoming.length, 0);
assert.equal(todayInTirana(new Date("2026-11-23T23:30:00Z")), "2026-11-24");
assert.throws(() => splitShows({ events: [{ date: "2026-02-30", title: "Invalid", city: "Tirana" }] }));
assert(!showList([{ ...events[0], title: '<script>alert("x")</script>' }]).includes("<script>"));
const cms = yaml.load(fs.readFileSync(path.join(__dirname, "..", ".pages.yml"), "utf8"));
for (const name of ["band", "shows"]) {
  const entry = cms.content.find(item => item.name === name);
  assert(entry && entry.format === "json");
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", entry.path), "utf8"));
  for (const field of entry.fields) assert(Object.hasOwn(data, field.name), `Missing CMS field ${name}.${field.name}`);
}
console.log(`Passed: ${pages.length} HTML pages, local links/anchors/assets, metadata, schemas, sitemap, redirects, lineup, CMS config, cards, date boundaries and hero size.`);
