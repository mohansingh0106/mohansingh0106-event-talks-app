document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const scheduleItems = document.querySelectorAll('.schedule-item');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    scheduleItems.forEach(item => {
      const categories = item.dataset.categories.toLowerCase();
      if (categories.includes(searchTerm) || item.classList.contains('break')) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});
