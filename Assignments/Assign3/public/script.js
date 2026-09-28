// ==============================
// CONTACT FORM
// ==============================

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(form);

    const data = {

        name: formData.get("name"),

        email: formData.get("email"),

        message: formData.get("message")

    };


    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        const result = await response.json();


        if (result.success) {

            formMessage.textContent =
                "Message sent successfully.";

            form.reset();

        } else {

            formMessage.textContent =
                result.message;

        }

    }

    catch (error) {

        formMessage.textContent =
            "Unable to send message right now.";

    }

});



// ==============================
// SMALL SCROLL REVEAL
// ==============================

const revealElements =
    document.querySelectorAll(
        ".project, .journey-card, .info-box"
    );


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});