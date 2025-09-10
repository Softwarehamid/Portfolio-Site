(function () {
  // calc age from YYYY-MM-DD using local time
  function calcAge(dobStr, now = new Date()) {
    const [y, m, d] = dobStr.split('-').map(Number);
    let age = now.getFullYear() - y;
    const month = now.getMonth() + 1, day = now.getDate();
    if (month < m || (month === m && day < d)) age--;
    return age;
  }

  function updateAge() {
    const el = document.getElementById('age');
    if (!el) return;
    const dob = el.dataset.dob || '2005-05-27';
    el.textContent = calcAge(dob);
  }

  // schedule next update at local midnight so it flips on your birthday
  function scheduleMidnightUpdate() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    const ms = next - now;
    setTimeout(function tick() {
      updateAge();
      // afterwards, update every 24h at midnight
      setInterval(updateAge, 24 * 60 * 60 * 1000);
    }, ms);
  }

  // run now, then schedule nightly
  updateAge();
  scheduleMidnightUpdate();
})();
