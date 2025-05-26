document.addEventListener("DOMContentLoaded", function () {
  // Общие функции для всех страниц
  initNavigation();

  // Если мы на странице курсов, загружаем их
  if (document.getElementById("courses-container")) {
    loadCourses();
    setupFilters();
  }
});

// Инициализация навигации
function initNavigation() {
  const currentPage = location.pathname.split("/").pop();
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Загрузка курсов
function loadCourses(filterCategory = "all", filterPrice = "all") {
  const container = document.getElementById("courses-container");
  container.innerHTML = '<div class="loader">Загрузка курсов...</div>';

  // Здесь обычно был бы запрос к API, но для примера используем мок данные
  setTimeout(() => {
    const courses = getMockCourses();
    displayCourses(courses, filterCategory, filterPrice);
  }, 800);
}

// Отображение курсов
function displayCourses(courses, filterCategory, filterPrice) {
  const container = document.getElementById("courses-container");

  // Фильтрация
  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      filterCategory === "all" || course.category === filterCategory;
    const priceMatch =
      filterPrice === "all" ||
      (filterPrice === "free" && course.price === 0) ||
      (filterPrice === "paid" && course.price > 0);
    return categoryMatch && priceMatch;
  });

  // Очистка контейнера
  container.innerHTML = "";

  // Если нет курсов
  if (filteredCourses.length === 0) {
    container.innerHTML =
      '<div class="loader">Курсы не найдены. Попробуйте изменить фильтры.</div>';
    return;
  }

  // Добавление курсов
  filteredCourses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";

    courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.school}</p>
                <p>Длительность: ${course.duration}</p>
                <p class="course-price">${
                  course.price === 0 ? "Бесплатно" : `${course.price} ₽`
                }</p>
            </div>
        `;

    container.appendChild(courseCard);
  });
}

// Настройка фильтров
function setupFilters() {
  const applyBtn = document.getElementById("apply-filters");

  applyBtn.addEventListener("click", function () {
    const category = document.getElementById("category-filter").value;
    const price = document.getElementById("price-filter").value;
    loadCourses(category, price);
  });
}

// Мок данные курсов
function getMockCourses() {
  return [
    {
      title: "Веб-разработка с нуля",
      school: "Skillbox",
      category: "programming",
      duration: "12 месяцев",
      price: 60000,
      image: "https://via.placeholder.com/300x180?text=Web+Development",
    },
    {
      title: "Python для анализа данных",
      school: "Нетология",
      category: "programming",
      duration: "6 месяцев",
      price: 45000,
      image: "https://via.placeholder.com/300x180?text=Python+Data",
    },
    {
      title: "UX/UI дизайн",
      school: "GeekBrains",
      category: "design",
      duration: "8 месяцев",
      price: 50000,
      image: "https://via.placeholder.com/300x180?text=UX+UI+Design",
    },
    {
      title: "SMM-маркетинг",
      school: "Contented",
      category: "marketing",
      duration: "4 месяца",
      price: 35000,
      image: "https://via.placeholder.com/300x180?text=SMM+Marketing",
    },
    {
      title: "Основы JavaScript",
      school: "Stepik",
      category: "programming",
      duration: "2 месяца",
      price: 0,
      image: "https://via.placeholder.com/300x180?text=JavaScript+Basics",
    },
    {
      title: "Графический дизайн",
      school: "Skillbox",
      category: "design",
      duration: "10 месяцев",
      price: 55000,
      image: "https://via.placeholder.com/300x180?text=Graphic+Design",
    },
  ];
}
