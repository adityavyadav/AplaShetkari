
"use strict";

// AplaShetkari Homepage JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Update the footer year automatically.
    const yearElements = document.querySelectorAll("[data-current-year]");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Mobile navigation toggle, if the matching elements exist.
    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute("aria-expanded", String(!isExpanded));
            navigation.classList.toggle("is-open", !isExpanded);
        });
    }

    // Smooth scrolling for on-page links.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    console.log("AplaShetkari homepage script loaded.");
});
