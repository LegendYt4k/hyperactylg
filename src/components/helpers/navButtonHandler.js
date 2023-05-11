const NavButtonHandler = () => {
    const sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper");
    const mainWrapper = document.querySelector(".main-wrapper");
    const menuToggleButton = document.getElementById("menu-toggle");
    const menuToggleButtonIcon = document.getElementById("menu-toggle i");
    const overlay = document.querySelector(".overlay");

    const toggleMenu = () => {
      sidebarNavWrapper.classList.toggle("active");
      overlay.classList.add("active");
      mainWrapper.classList.toggle("active");

      if (document.body.clientWidth > 1200) {
        if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
          menuToggleButtonIcon.classList.remove("lni-chevron-left");
          menuToggleButtonIcon.classList.add("lni-menu");
        } else {
          menuToggleButtonIcon.classList.remove("lni-menu");
          menuToggleButtonIcon.classList.add("lni-chevron-left");
        }
      } else {
        if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
          menuToggleButtonIcon.classList.remove("lni-chevron-left");
          menuToggleButtonIcon.classList.add("lni-menu");
        }
      }
    };

    const closeMenu = () => {
      sidebarNavWrapper.classList.remove("active");
      overlay.classList.remove("active");
      mainWrapper.classList.remove("active");
    };

    menuToggleButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);

    return () => {
      menuToggleButton.removeEventListener("click", toggleMenu);
      overlay.removeEventListener("click", closeMenu);
    };
}

export default NavButtonHandler