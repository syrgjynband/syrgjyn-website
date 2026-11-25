const { escapeHtml: e } = require("./_cards.cjs");

function navigation() {
  const links = [
    ["Home", "/"], ["Music", "/discography/"], ["Shows", "/shows/"],
    ["Blog", "/blog.html"], ["Gallery", "/gallery/"], ["About", "/about/"], ["Press / EPK", "/press/"],
    ["Merch", "/#merch"], ["Newsletter", "/newsletter/"], ["Contact", "/#contact"]
  ];
  return `<div class="navlinks">${links.map(([label, url]) => `<a href="${url}">${label}</a>`).join("\n")}</div>`;
}

function lineup(band) {
  return `<div class="list">${band.members.map(member => `<div>${e(member.name)} — ${e(member.role)}</div>`).join("\n")}</div>`;
}

function todayInTirana(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Tirane", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(now);
  const part = type => parts.find(item => item.type === type).value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function splitShows(shows, today = todayInTirana()) {
  const events = shows.events || [];
  for (const event of events) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date) ||
        Number.isNaN(Date.parse(event.date)) ||
        new Date(event.date).toISOString().slice(0, 10) !== event.date) {
      throw new Error(`Invalid show date: ${event.date}. Use YYYY-MM-DD.`);
    }
    if (!event.title || !event.city) throw new Error("Every show needs a title and city.");
  }
  return {
    upcoming: events.filter(event => event.date >= today).sort((a, b) => a.date.localeCompare(b.date)),
    past: events.filter(event => event.date < today).sort((a, b) => b.date.localeCompare(a.date))
  };
}

function showList(events, empty = "No upcoming concert dates have been announced. Check back for updates.") {
  if (!events.length) return `<p class="lead">${e(empty)}</p>`;
  return `<div class="list">${events.map(event => {
    const date = new Date(event.date + "T12:00:00Z").toLocaleDateString("en-GB", {
      timeZone: "Europe/Tirane", day: "numeric", month: "short", year: "numeric"
    });
    return `<div class="show"><div><strong><time datetime="${e(event.date)}">${e(date)}</time></strong> — ${e(event.title)} — ${e(event.city)}${event.venue ? ` — ${e(event.venue)}` : ""}${event.details ? `<br><small>${e(event.details)}</small>` : ""}</div></div>`;
  }).join("\n")}</div>`;
}

function section(heading, content, id = "") {
  return `<section${id ? ` id="${e(id)}"` : ""}><div class="wrap"><h2>${e(heading)}</h2>${content}</div></section>`;
}

module.exports = { navigation, lineup, todayInTirana, splitShows, showList, section };
