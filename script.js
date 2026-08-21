/* =====================================================
   MOTIVEX AUTOMOTIVE
   COMPLETE SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            mobileMenu.classList.toggle("active");

            const isOpen = mobileMenu.classList.contains("active");

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });


        /* Close menu when a link is clicked */

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                mobileMenu.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            });

        });

    }


    /* =================================================
       QUOTE FORM
    ================================================= */

    const quoteForm = document.getElementById("quoteForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = document.getElementById("submitButton");

    if (quoteForm) {

        quoteForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            /* Prevent double submissions */

            if (submitButton.disabled) {
                return;
            }


            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            formMessage.textContent = "";
            formMessage.style.color = "";


            const formData = new FormData(quoteForm);


            try {

                const response = await fetch(
                    quoteForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (response.ok) {

                    formMessage.textContent =
                        "✓ Your quote request has been sent successfully. We'll get back to you soon.";

                    formMessage.style.color = "#35d07f";

                    quoteForm.reset();

                    submitButton.textContent = "Request Sent ✓";


                    /* Return button to normal after 5 seconds */

                    setTimeout(function () {

                        submitButton.disabled = false;
                        submitButton.textContent = "Send Quote Request";

                    }, 5000);


                } else {

                    throw new Error("Form submission failed.");

                }


            } catch (error) {

                formMessage.textContent =
                    "Something went wrong. Please call MOTIVEX on 0478 494 507.";

                formMessage.style.color = "#ff4d4d";

                submitButton.disabled = false;
                submitButton.textContent = "Send Quote Request";

            }

        });

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const currentYear = new Date().getFullYear();

    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {

        footerYear.innerHTML =
            `© ${currentYear} MOTIVEX Automotive. All rights reserved.`;

    }


    /* =================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener("click", function (event) {

        if (!mobileMenu || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            mobileMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileMenu.classList.remove("active");

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    });

});