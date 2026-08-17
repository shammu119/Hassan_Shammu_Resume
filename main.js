(function () {
  document.querySelectorAll('.duration[data-start]').forEach(function (el) {
    var start = new Date(el.dataset.start + 'T00:00:00');
    var now = new Date();
    var months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months--;
    months = Math.max(months, 0);

    var years = Math.floor(months / 12);
    var remMonths = months % 12;
    var parts = [];
    if (years) parts.push(years + (years === 1 ? ' yr' : ' yrs'));
    if (remMonths || !years) parts.push(remMonths + (remMonths === 1 ? ' mo' : ' mos'));
    el.textContent = '· ' + parts.join(' ');
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  if (!reduceMotion) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  var printBtn = document.getElementById('download-pdf');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
})();
