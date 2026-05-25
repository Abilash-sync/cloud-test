// Demo Sales Dashboard - Vanilla JS + Chart.js
// Generates mock data, provides filtering, sorting, CSV export, and charts

// ---------- Utilities ----------
const fmtCurrency = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const fmtNumber = (n) => n.toLocaleString();

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// ---------- Mock Data Generation ----------
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateMockData({ days = 180, seed = 42 } = {}) {
  // Simple LCG for repeatable mock data
  let s = seed;
  const rand = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  const weighted = (weights) => {
    const sum = weights.reduce((a,b)=>a+b.w,0);
    const r = rand() * sum;
    let c = 0;
    for (const item of weights) { c += item.w; if (r <= c) return item.v; }
    return weights[weights.length-1].v;
  };

  const regions = ['North', 'South', 'East', 'West'];
  const categories = ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports'];
  const products = {
    Electronics: ['Phone', 'Laptop', 'Headphones', 'Camera', 'Tablet'],
    Apparel: ['T-Shirt', 'Jeans', 'Sneakers', 'Jacket', 'Hat'],
    Home: ['Vacuum', 'Air Purifier', 'Mixer', 'Coffee Maker', 'Lamp'],
    Beauty: ['Serum', 'Moisturizer', 'Shampoo', 'Perfume', 'Mask'],
    Sports: ['Dumbbells', 'Yoga Mat', 'Bike Helmet', 'Tennis Racket', 'Football'],
  };

  const start = new Date();
  start.setDate(start.getDate() - days);

  const rows = [];
  for (let i = 0; i < days * 20; i++) {
    const date = new Date(start.getTime() + randomInt(0, days) * 24*3600*1000 + randomInt(0, 23)*3600*1000);
    const category = weighted(categories.map(c => ({ v: c, w: 1 + (c === 'Electronics' ? 1 : 0) + (c === 'Apparel' ? 0.5 : 0) })));
    const product = randomChoice(products[category]);
    const region = weighted(regions.map(r => ({ v: r, w: 1 })));
    const price = Math.round((50 + rand() * 900));
    const quantity = 1 + Math.floor(rand() * 5);
    const revenue = price * quantity;
    rows.push({ id: i+1, date: date.toISOString(), region, category, product, quantity, price, revenue });
  }

  return { rows, regions, categories };
}

// ---------- State ----------
const state = {
  allRows: [],
  filteredRows: [],
  sort: { key: 'date', dir: 'desc' },
  filters: { from: null, to: null, region: 'all', category: 'all', q: '' },
  charts: { time: null, category: null },
};

// ---------- Filtering & Aggregation ----------
function applyFilters() {
  const { from, to, region, category, q } = state.filters;
  const qLower = q.trim().toLowerCase();
  state.filteredRows = state.allRows.filter(r => {
    const d = new Date(r.date);
    if (from && d < from) return false;
    if (to && d > to) return false;
    if (region !== 'all' && r.region !== region) return false;
    if (category !== 'all' && r.category !== category) return false;
    if (qLower && !r.product.toLowerCase().includes(qLower)) return false;
    return true;
  });
}

function sortRows() {
  const { key, dir } = state.sort;
  const mul = dir === 'asc' ? 1 : -1;
  state.filteredRows.sort((a, b) => {
    let va = a[key];
    let vb = b[key];
    if (key === 'date') { va = new Date(va).getTime(); vb = new Date(vb).getTime(); }
    return (va > vb ? 1 : va < vb ? -1 : 0) * mul;
  });
}

function computeKPIs() {
  const revenue = state.filteredRows.reduce((s, r) => s + r.revenue, 0);
  const orders = state.filteredRows.length;
  const units = state.filteredRows.reduce((s, r) => s + r.quantity, 0);
  const aov = orders ? revenue / orders : 0;
  document.getElementById('kpiRevenue').textContent = fmtCurrency(revenue);
  document.getElementById('kpiOrders').textContent = fmtNumber(orders);
  document.getElementById('kpiUnits').textContent = fmtNumber(units);
  document.getElementById('kpiAov').textContent = fmtCurrency(aov);
}

function groupByDay(rows) {
  const map = new Map();
  for (const r of rows) {
    const day = new Date(r.date);
    day.setHours(0,0,0,0);
    const key = day.toISOString();
    map.set(key, (map.get(key) || 0) + r.revenue);
  }
  const entries = [...map.entries()].sort((a,b)=> new Date(a[0]) - new Date(b[0]));
  return { labels: entries.map(e => e[0]), values: entries.map(e => e[1]) };
}

function groupByCategory(rows) {
  const map = new Map();
  for (const r of rows) {
    map.set(r.category, (map.get(r.category) || 0) + r.revenue);
  }
  const entries = [...map.entries()].sort((a,b)=> b[1] - a[1]);
  return { labels: entries.map(e => e[0]), values: entries.map(e => e[1]) };
}

// ---------- Rendering ----------
function renderTable() {
  const tbody = document.querySelector('#ordersTable tbody');
  tbody.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const r of state.filteredRows.slice(0, 500)) { // cap to 500 rows for perf
    const tr = document.createElement('tr');
    const cells = [
      new Date(r.date).toLocaleString(), r.region, r.category, r.product,
      r.quantity, fmtCurrency(r.price), fmtCurrency(r.revenue)
    ];
    for (const c of cells) {
      const td = document.createElement('td');
      td.textContent = c;
      tr.appendChild(td);
    }
    frag.appendChild(tr);
  }
  tbody.appendChild(frag);
}

function renderCharts() {
  const timeAgg = groupByDay(state.filteredRows);
  const catAgg = groupByCategory(state.filteredRows);

  // Time series chart
  const ctx1 = document.getElementById('revenueOverTime');
  if (state.charts.time) state.charts.time.destroy();
  state.charts.time = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: timeAgg.labels,
      datasets: [{
        label: 'Revenue',
        data: timeAgg.values,
        borderColor: '#6ea8fe',
        backgroundColor: 'rgba(110, 168, 254, 0.2)',
        borderWidth: 2,
        tension: 0.25,
        fill: true,
        pointRadius: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: 'time', time: { unit: 'day' }, grid: { color: '#24304e' }, ticks: { color: '#9aa3b2' } },
        y: { grid: { color: '#24304e' }, ticks: { color: '#9aa3b2', callback: v => '$' + (v/1000) + 'k' } }
      },
      plugins: { legend: { labels: { color: '#e6e8ef' } }, tooltip: { callbacks: { label: ctx => 'Revenue: ' + fmtCurrency(ctx.parsed.y) } } }
    }
  });

  // Category bar chart
  const ctx2 = document.getElementById('revenueByCategory');
  if (state.charts.category) state.charts.category.destroy();
  state.charts.category = new Chart(ctx2, {
    type: 'bar',
    data: { labels: catAgg.labels, datasets: [{ label: 'Revenue', data: catAgg.values, backgroundColor: '#22c55e' }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: '#9aa3b2' } },
        y: { grid: { color: '#24304e' }, ticks: { color: '#9aa3b2', callback: v => '$' + (v/1000) + 'k' } }
      },
      plugins: { legend: { labels: { color: '#e6e8ef' } }, tooltip: { callbacks: { label: ctx => 'Revenue: ' + fmtCurrency(ctx.parsed.y) } } }
    }
  });
}

function updateUI() {
  applyFilters();
  sortRows();
  computeKPIs();
  renderTable();
  renderCharts();
}

// ---------- Interactions ----------
function initFilters() {
  const regions = [...new Set(state.allRows.map(r => r.region))];
  const categories = [...new Set(state.allRows.map(r => r.category))];

  const regionSelect = document.getElementById('regionSelect');
  for (const r of regions) {
    const opt = document.createElement('option'); opt.value = r; opt.textContent = r; regionSelect.appendChild(opt);
  }
  const categorySelect = document.getElementById('categorySelect');
  for (const c of categories) {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c; categorySelect.appendChild(opt);
  }

  const minDate = new Date(Math.min(...state.allRows.map(r => new Date(r.date).getTime())));
  const maxDate = new Date(Math.max(...state.allRows.map(r => new Date(r.date).getTime())));
  const fromEl = document.getElementById('dateFrom');
  const toEl = document.getElementById('dateTo');
  fromEl.valueAsDate = minDate; toEl.valueAsDate = maxDate;
  state.filters.from = new Date(fromEl.value);
  state.filters.to = new Date(toEl.value); state.filters.to.setHours(23,59,59,999);

  regionSelect.addEventListener('change', () => { state.filters.region = regionSelect.value; updateUI(); });
  categorySelect.addEventListener('change', () => { state.filters.category = categorySelect.value; updateUI(); });
  fromEl.addEventListener('change', () => { state.filters.from = fromEl.value ? new Date(fromEl.value) : null; updateUI(); });
  toEl.addEventListener('change', () => { state.filters.to = toEl.value ? new Date(new Date(toEl.value).setHours(23,59,59,999)) : null; updateUI(); });
  document.getElementById('searchInput').addEventListener('input', (e) => { state.filters.q = e.target.value; updateUI(); });

  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    regionSelect.value = 'all'; categorySelect.value = 'all';
    fromEl.valueAsDate = minDate; toEl.valueAsDate = maxDate;
    state.filters = { from: minDate, to: new Date(maxDate.setHours(23,59,59,999)), region: 'all', category: 'all', q: '' };
    document.getElementById('searchInput').value = '';
    updateUI();
  });

  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const headers = ['Date','Region','Category','Product','Quantity','Price','Revenue'];
    const lines = [headers.join(',')];
    for (const r of state.filteredRows) {
      lines.push([
        new Date(r.date).toISOString(), r.region, r.category, r.product,
        r.quantity, r.price, r.revenue
      ].map(v => typeof v === 'string' && v.includes(',') ? '"' + v + '"' : v).join(','));
    }
    download('orders.csv', lines.join('\n'));
  });

  // Sortable headers
  document.querySelectorAll('#ordersTable thead th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-key');
      if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
      else { state.sort.key = key; state.sort.dir = 'asc'; }
      updateUI();
    });
  });
}

// ---------- Bootstrap ----------
window.addEventListener('DOMContentLoaded', () => {
  const { rows } = generateMockData({ days: 240, seed: 123 });
  state.allRows = rows;
  initFilters();
  updateUI();
});
