document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("creditChart").getContext("2d");

  const data = {
    labels: ["Payment History", "Credit Utilization", "Length of Credit", "Types of Credit", "New Credit"],
    datasets: [
      {
        label: "Credit Score Components",
        data: [35, 30, 20, 10, 5],
        backgroundColor: [
          "rgba(252, 46, 32, 0.8)",
          "rgba(253, 127, 32, 0.8)",
          "rgba(253, 211, 32, 0.8)",
          "rgba(127, 253, 32, 0.8)",
          "rgba(32, 253, 127, 0.8)",
        ],
        borderWidth: 2,
        borderColor: "#333",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // غیرفعال کردن توضیحات پیش‌فرض
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });

  // ساخت توضیحات سفارشی
  const legendContainer = document.getElementById("customLegend");
  legendContainer.innerHTML = data.labels
    .map((label, index) => {
      return `
        <div class="legend-item">
          <span class="legend-color" style="background-color:${data.datasets[0].backgroundColor[index]}"></span>
          ${label}
        </div>`;
    })
    .join("");
  
  // مدیریت فرم ویرایش پروفایل
  document.getElementById('editProfileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('editProfileName').value;
    const email = document.getElementById('editProfileEmail').value;
    document.getElementById('profileName').innerText = name;
    document.getElementById('profileEmail').innerText = `Lender | ${email}`;
    new bootstrap.Modal(document.getElementById('editProfileModal')).hide();
  });

  // مدیریت حذف تراکنش
  window.removeTransaction = function (button) {
    const listItem = button.closest('li');
    listItem.remove();
  };

  // مدیریت خروج
  document.getElementById('logoutButton').addEventListener('click', function () {
    const confirmation = confirm('Are you sure you want to log out?');
    if (confirmation) {
      window.location.href = 'homePage.html';
    }
  });
});
