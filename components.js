// Shared header/footer snippets are inlined in HTML; this file holds page-specific enhancements.

document.querySelectorAll("[data-counter]").forEach((el) => {
  const target = parseInt(el.dataset.counter, 10);
  if (Number.isNaN(target)) return;
  el.textContent = `${target}+`;
});
