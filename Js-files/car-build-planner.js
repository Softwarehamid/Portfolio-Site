const storageKey = "dream-car-build-v1";

const state = {
  car: { name: "Chevrolet Camaro SS 1LE", price: 0, otd: 0, down: 15000 },
  parts: []
};

const sampleParts = [
  { category: "Labor", name: "Engine labor for stage 2", price: 4500, link: "" },
  { category: "Power", name: "Whipple supercharger", price: 8449.99, link: "https://whipplesuperchargers.com" },
  { category: "Power", name: "DSX Flex Fuel Kit + E85", price: 393.75, link: "" },
  { category: "Interior", name: "Carbon fiber steering wheel", price: 1987.96, link: "" }
];

function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    state.parts = [...sampleParts];
    return;
  }
  const parsed = JSON.parse(raw);
  state.car = parsed.car || state.car;
  state.parts = Array.isArray(parsed.parts) ? parsed.parts : [];
}

function renderCarSummary() {
  const summary = document.getElementById("car-summary");
  const { name, price, otd, down } = state.car;
  const financeGap = (otd || price) - down;
  summary.innerHTML = `
    <span><strong>Car:</strong> ${name || "Not set"}</span>
    <span><strong>Price:</strong> ${formatCurrency(price)}</span>
    <span><strong>Out-the-door:</strong> ${formatCurrency(otd)}</span>
    <span><strong>Down Payment:</strong> ${formatCurrency(down)}</span>
    <span><strong>Remaining:</strong> ${formatCurrency(financeGap)}</span>
  `;
}

function renderParts() {
  const byCategory = state.parts.reduce((acc, part, idx) => {
    acc[part.category] ??= [];
    acc[part.category].push({ ...part, idx });
    return acc;
  }, {});

  const root = document.getElementById("list-root");
  root.innerHTML = "";

  Object.entries(byCategory)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, items]) => {
      const subtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
      const card = document.createElement("article");
      card.className = "category";
      card.innerHTML = `
        <h3>${category}<span>${formatCurrency(subtotal)}</span></h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (i) => `<tr>
                  <td>${i.name}</td>
                  <td>${formatCurrency(i.price)}</td>
                  <td>${i.link ? `<a href="${i.link}" target="_blank" rel="noreferrer">Open</a>` : "—"}</td>
                  <td class="item-actions"><button data-delete="${i.idx}">Remove</button></td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      `;
      root.appendChild(card);
    });

  const partsTotal = state.parts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  document.getElementById("totals").innerHTML = `<span><strong>Mods total:</strong> ${formatCurrency(partsTotal)}</span><span><strong>Car + Mods (OTD based):</strong> ${formatCurrency((state.car.otd || state.car.price) + partsTotal)}</span>`;

  root.querySelectorAll("button[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-delete"));
      state.parts.splice(index, 1);
      save();
      renderParts();
    });
  });
}

function bootstrapForms() {
  const carForm = document.getElementById("car-form");
  const partForm = document.getElementById("part-form");

  document.getElementById("car-name").value = state.car.name || "";
  document.getElementById("car-price").value = state.car.price || "";
  document.getElementById("car-otd").value = state.car.otd || "";
  document.getElementById("car-down").value = state.car.down || "";

  carForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.car = {
      name: document.getElementById("car-name").value.trim(),
      price: Number(document.getElementById("car-price").value) || 0,
      otd: Number(document.getElementById("car-otd").value) || 0,
      down: Number(document.getElementById("car-down").value) || 0
    };
    save();
    renderCarSummary();
    renderParts();
  });

  partForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.parts.push({
      category: document.getElementById("part-category").value,
      name: document.getElementById("part-name").value.trim(),
      price: Number(document.getElementById("part-price").value) || 0,
      link: document.getElementById("part-link").value.trim()
    });
    partForm.reset();
    save();
    renderParts();
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    state.car = { name: "Chevrolet Camaro SS 1LE", price: 0, otd: 0, down: 15000 };
    state.parts = [...sampleParts];
    document.getElementById("car-name").value = state.car.name;
    document.getElementById("car-price").value = "";
    document.getElementById("car-otd").value = "";
    document.getElementById("car-down").value = state.car.down;
    renderCarSummary();
    renderParts();
  });
}

load();
bootstrapForms();
renderCarSummary();
renderParts();
