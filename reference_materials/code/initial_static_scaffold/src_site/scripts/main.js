(function () {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");
  const savedTheme = window.localStorage.getItem("joch-blog-theme");

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (label) {
      label.textContent = theme === "dark" ? "Dark" : "Light";
    }
    window.localStorage.setItem("joch-blog-theme", theme);
  }

  setTheme(savedTheme || "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const posts = Array.from(document.querySelectorAll("[data-tags]"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      posts.forEach(function (post) {
        const tags = post.dataset.tags.split(" ");
        post.hidden = filter !== "all" && !tags.includes(filter);
      });
    });
  });
})();
