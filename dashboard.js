// InternLink Student Dashboard Interactions & Charts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Vector Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Set current date dynamically
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
  }

  // 3. Notification Dropdown Toggle
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('open');
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', () => {
      notifDropdown.classList.remove('open');
    });

    notifDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 4. Data Visualizations via Chart.js
  
  // Custom font configurations to match typography system
  const defaultFontConfig = {
    family: "'Inter', sans-serif",
    size: 11
  };

  // --- Chart 1: Weekly Activity (Line Chart) ---
  const lineCtx = document.getElementById('weeklyActivityChart');
  if (lineCtx) {
    // Create gradient fill for chart area
    const ctx = lineCtx.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.4)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Applications',
          data: [4, 8, 6, 15, 10, 12],
          borderColor: '#4F46E5',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06B6D4',
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#9ca3af', font: defaultFontConfig }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af', font: defaultFontConfig }
          }
        }
      }
    });
  }

  // --- Chart 2: Application Progress (Doughnut Chart) ---
  const doughnutCtx = document.getElementById('progressChart');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Applied', 'OA completed', 'Interview', 'Offer', 'Rejections'],
        datasets: [{
          data: [12, 5, 3, 2, 4],
          backgroundColor: [
            '#4F46E5', // Indigo (Applied)
            '#06B6D4', // Cyan (OA)
            '#3b82f6', // Blue (Interview)
            '#10B981', // Emerald (Offer)
            '#EF4444'  // Rose (Rejections)
          ],
          borderWidth: 2,
          borderColor: '#1e293b' // Matches card background
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#9ca3af',
              font: defaultFontConfig,
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        },
        cutout: '70%'
      }
    });
  }
});
