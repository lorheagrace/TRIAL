document.addEventListener("DOMContentLoaded", function () {


    /* ==============================
       EMAIL MARKETING CAROUSEL
    ================================= */

    const slides =
        document.querySelectorAll(".email-slide");

    const dots =
        document.querySelectorAll(".carousel-dot");

    const prevButton =
        document.querySelector(".carousel-prev");

    const nextButton =
        document.querySelector(".carousel-next");


    let currentSlide = 0;


    function updateCarousel() {

        slides.forEach(function (slide, index) {

            slide.classList.remove(
                "active",
                "previous",
                "next"
            );


            if (index === currentSlide) {

                slide.classList.add("active");

            }

            else if (
                index ===
                (currentSlide - 1 + slides.length) %
                slides.length
            ) {

                slide.classList.add("previous");

            }

            else if (
                index ===
                (currentSlide + 1) %
                slides.length
            ) {

                slide.classList.add("next");

            }

        });


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* NEXT BUTTON */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                currentSlide =
                    (currentSlide + 1) %
                    slides.length;

                updateCarousel();

            }
        );

    }


    /* PREVIOUS BUTTON */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                currentSlide =
                    (currentSlide - 1 + slides.length) %
                    slides.length;

                updateCarousel();

            }
        );

    }


    /* DOTS */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                currentSlide = index;

                updateCarousel();

            }
        );

    });


    /* INITIAL STATE */

    if (slides.length > 0) {

        updateCarousel();

    }



    /* ==============================
       EMAIL UPCLOSE MODAL
    ================================= */

    const emailModal =
        document.getElementById("emailModal");

    const emailUpclose =
        document.getElementById("emailUpclose");

    const emailModalClose =
        document.getElementById("emailModalClose");

    const emailModalPrev =
        document.getElementById("emailModalPrev");

    const emailModalNext =
        document.getElementById("emailModalNext");

    const emailModalSlides =
        document.querySelectorAll(
            ".email-modal-slide"
        );

    const emailModalCounter =
        document.getElementById(
            "emailModalCounter"
        );

    const emailModalTitle =
        document.getElementById(
            "emailModalTitle"
        );

    const emailModalOverlay =
        document.querySelector(
            ".email-modal-overlay"
        );


    let currentModalSlide = 0;


    const modalTitles = [
        "Email Concept 01",
        "Email Concept 02",
        "Email Concept 03"
    ];



    /* ==============================
       UPDATE MODAL
    ================================= */

    function updateModal() {

        emailModalSlides.forEach(
            function (slide, index) {

                slide.classList.toggle(
                    "active",
                    index === currentModalSlide
                );

            }
        );


        if (emailModalCounter) {

            emailModalCounter.textContent =
                String(
                    currentModalSlide + 1
                ).padStart(2, "0") +
                " / " +
                String(
                    emailModalSlides.length
                ).padStart(2, "0");

        }


        if (emailModalTitle) {

            emailModalTitle.textContent =
                modalTitles[currentModalSlide];

        }


        /*
         * Reset the current email's
         * scroll position to the top.
         */

        emailModalSlides.forEach(
            function (slide, index) {

                if (
                    index === currentModalSlide
                ) {

                    slide.scrollTop = 0;

                }

            }
        );

    }



    /* ==============================
       OPEN MODAL
    ================================= */

    if (emailUpclose && emailModal) {

        emailUpclose.addEventListener(
            "click",
            function () {

                /*
                 * Open the same email that
                 * is currently selected in
                 * the main carousel.
                 */

                currentModalSlide =
                    currentSlide;


                emailModal.classList.add(
                    "active"
                );


                emailModal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.classList.add(
                    "email-modal-open"
                );


                updateModal();

            }
        );

    }



    /* ==============================
       CLOSE MODAL
    ================================= */

    function closeEmailModal() {

        if (!emailModal) {
            return;
        }


        emailModal.classList.remove(
            "active"
        );


        emailModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "email-modal-open"
        );

    }


    /* CLOSE BUTTON */

    if (emailModalClose) {

        emailModalClose.addEventListener(
            "click",
            closeEmailModal
        );

    }


    /* CLICK OUTSIDE */

    if (emailModalOverlay) {

        emailModalOverlay.addEventListener(
            "click",
            closeEmailModal
        );

    }



    /* ==============================
       MODAL NEXT
    ================================= */

    if (emailModalNext) {

        emailModalNext.addEventListener(
            "click",
            function () {

                currentModalSlide =
                    (currentModalSlide + 1) %
                    emailModalSlides.length;


                updateModal();

            }
        );

    }



    /* ==============================
       MODAL PREVIOUS
    ================================= */

    if (emailModalPrev) {

        emailModalPrev.addEventListener(
            "click",
            function () {

                currentModalSlide =
                    (
                        currentModalSlide -
                        1 +
                        emailModalSlides.length
                    ) %
                    emailModalSlides.length;


                updateModal();

            }
        );

    }



    /* ==============================
       KEYBOARD CONTROLS
    ================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !emailModal ||
                !emailModal.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            /* ESC = CLOSE */

            if (
                event.key === "Escape"
            ) {

                closeEmailModal();

            }


            /* LEFT ARROW = PREVIOUS */

            if (
                event.key === "ArrowLeft"
            ) {

                currentModalSlide =
                    (
                        currentModalSlide -
                        1 +
                        emailModalSlides.length
                    ) %
                    emailModalSlides.length;


                updateModal();

            }


            /* RIGHT ARROW = NEXT */

            if (
                event.key === "ArrowRight"
            ) {

                currentModalSlide =
                    (
                        currentModalSlide + 1
                    ) %
                    emailModalSlides.length;


                updateModal();

            }

        }
    );



    /* ==============================
       ABOUT PHOTO STACK
       Click (or Enter / Space) sends the front photo to the back.
       Works with any number of photos and loops forever.
    ================================= */

    const photoStack =
        document.getElementById("photoStack");

    if (photoStack) {

        const photos =
            Array.from(
                photoStack.querySelectorAll(".stack-photo")
            );

        let order = photos.slice();   // order[0] is the front photo
        let flipping = false;


        function layoutPhotos() {

            order.forEach(function (photo, index) {

                photo.dataset.pos =
                    String(Math.min(index, 2));

            });

        }


        function showNextPhoto() {

            if (flipping || photos.length < 2) {
                return;
            }

            flipping = true;

            const front = order.shift();

            /* lift the front photo out of the pile */
            front.dataset.pos = "out";

            /* the others move forward */
            order.forEach(function (photo, index) {

                photo.dataset.pos =
                    String(Math.min(index, 2));

            });

            /* then tuck it behind the pile */
            setTimeout(function () {

                order.push(front);

                front.dataset.pos =
                    String(Math.min(order.length - 1, 2));

                setTimeout(function () {
                    flipping = false;
                }, 450);

            }, 320);

        }


        photoStack.addEventListener(
            "click",
            showNextPhoto
        );

        photoStack.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    showNextPhoto();

                }

            }
        );

        layoutPhotos();

    }



    /* ==============================
       MOBILE NAVIGATION
    ================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            function () {

                menuToggle.classList.toggle(
                    "active"
                );

                navLinks.classList.toggle(
                    "active"
                );

            }
        );


        /* Close menu when a link is clicked */

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        menuToggle.classList.remove(
                            "active"
                        );

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }



    /* ==============================
       TECH MEMORY GAME
    ================================= */

    const board =
        document.getElementById(
            "memoryBoard"
        );

    const movesDisplay =
        document.getElementById(
            "moves"
        );

    const pairsDisplay =
        document.getElementById(
            "pairs"
        );
    const timerDisplay =
        document.getElementById(
            "timer"
        );
    const timerStat =
        document.getElementById(
            "timerStat"
        );

    const message =
        document.getElementById(
            "memoryMessage"
        );

    const resetButton =
        document.getElementById(
            "memoryReset"
        );


    if (
        board &&
        movesDisplay &&
        pairsDisplay &&
        message &&
        resetButton
    ) {


        /* ==============================
           TECHNOLOGIES
        ================================= */

        const technologies = [

            {
                name: "Python",
                icon: "python.png"
            },

            {
                name: "Android",
                icon: "android.png"
            },

            {
                name: "Java",
                icon: "java.png"
            },

            {
                name: "GitHub",
                icon: "github.png"
            },

            {
                name: "HTML",
                icon: "html.png"
            },

            {
                name: "CSS",
                icon: "css.png"
            },

            {
                name: "Kotlin",
                icon: "kotlin.png"
            },

            {
                name: "Firebase",
                icon: "firebase.png"
            }

        ];


        let firstCard = null;

        let secondCard = null;

        let locked = false;

        let moves = 0;

        let pairs = 0;
        let seconds = 0;
        let timerId = null;

        let gameId = 0;



        /* ==============================
           SHUFFLE
        ================================= */

        function shuffle(array) {

            for (
                let i = array.length - 1;
                i > 0;
                i--
            ) {

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        (i + 1)
                    );


                [
                    array[i],
                    array[randomIndex]
                ] = [
                    array[randomIndex],
                    array[i]
                ];

            }


            return array;

        }



        /* ==============================
           CREATE DECK
        ================================= */

        function createDeck() {

            const deck = [];


            technologies.forEach(
                function (
                    technology,
                    index
                ) {

                    deck.push({
                        ...technology,
                        id: index
                    });


                    deck.push({
                        ...technology,
                        id: index
                    });

                }
            );


            return shuffle(deck);

        }



        /* ==============================
           CREATE CARD
        ================================= */

        function createCard(
            technology,
            index
        ) {

            const card =
                document.createElement(
                    "div"
                );


            card.setAttribute("role", "button");

            card.tabIndex = 0;


            card.className =
                "memory-card";


            card.dataset.id =
                technology.id;


            card.setAttribute(
                "aria-label",
                "Hidden technology card " +
                (index + 1)
            );


            /*
             * Uses Django's static path
             * from the data attribute.
             */

            const iconPath =
                board.dataset.iconPath ||
                "/static/images/tech-icons/";


            card.innerHTML = `

                <span class="memory-card-inner">

                    <span class="memory-card-front">

                        <img
                            src="${iconPath}${technology.icon}"
                            alt="${technology.name} icon"
                        >

                        <span class="memory-card-name">
                            ${technology.name}
                        </span>

                    </span>


                    <span
                        class="memory-card-back"
                        aria-hidden="true"
                    >
                    </span>

                </span>

            `;


            card.addEventListener(
                "click",
                function () {

                    flipCard(
                        card,
                        technology
                    );

                }
            );


            card.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        flipCard(
                            card,
                            technology
                        );

                    }

                }
            );


            return card;

        }
        /* ==============================
           TIMER
           starts on the first flip,
           stops when every pair is matched
        ================================= */

        function formatTime(total) {
            const m = Math.floor(total / 60);
            const s = total % 60;
            return m + ":" + (s < 10 ? "0" : "") + s;
        }

        function updateTimer() {
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(seconds);
            }
        }

        function startTimer() {
            if (timerId !== null) {
                return;
            }
            timerId = setInterval(function () {
                seconds++;
                updateTimer();
            }, 1000);
        }

        function stopTimer() {
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
        }




        /* ==============================
           FLIP CARD
        ================================= */

        function flipCard(
            card,
            technology
        ) {

            if (locked) {
                return;
            }


            if (
                card.classList.contains(
                    "flipped"
                ) ||
                card.classList.contains(
                    "matched"
                )
            ) {

                return;

            }


            startTimer();


            card.classList.add(
                "flipped"
            );


            card.setAttribute(
                "aria-label",
                technology.name
            );


            if (!firstCard) {

                firstCard = {

                    element: card,

                    technology: technology

                };


                return;

            }


            secondCard = {

                element: card,

                technology: technology

            };


            moves++;


            movesDisplay.textContent =
                moves;


            locked = true;



            /* ==============================
               MATCH
            ================================= */

            if (
                firstCard.technology.id ===
                secondCard.technology.id
            ) {

                firstCard.element.classList.add(
                    "matched"
                );


                secondCard.element.classList.add(
                    "matched"
                );


                pairs++;


                pairsDisplay.textContent =
                    pairs + "/" + technologies.length;


                message.textContent =
                    "Nice match! Keep going.";


                firstCard = null;

                secondCard = null;

                locked = false;


                if (pairs === technologies.length) {
                    stopTimer();
                    if (timerStat) {
                        timerStat.classList.add("is-done");
                    }

                    message.textContent =
                        "All pairs matched! Great job.";

                    const winToken = gameId;

                    setTimeout(function () {
                        if (winToken === gameId) {
                            showWin();
                        }
                    }, 750);

                }

            }



            /* ==============================
               NOT A MATCH
            ================================= */

            else {

                message.textContent =
                    "Not a match. Try again.";


                const flipA = firstCard;
                const flipB = secondCard;
                const gameToken = gameId;

                setTimeout(
                    function () {

                        if (gameToken !== gameId) {
                            return;
                        }

                        firstCard.element
                            .classList
                            .remove(
                                "flipped"
                            );


                        secondCard.element
                            .classList
                            .remove(
                                "flipped"
                            );


                        firstCard.element
                            .setAttribute(
                                "aria-label",
                                "Hidden technology card"
                            );


                        secondCard.element
                            .setAttribute(
                                "aria-label",
                                "Hidden technology card"
                            );


                        firstCard = null;

                        secondCard = null;

                        locked = false;

                    },
                    800
                );

            }

        }




        /* ==============================
           ALL PAIRS MATCHED: POPUP + CONFETTI
        ================================= */

        const winModal = document.getElementById("memoryWin");
        const winTime = document.getElementById("winTime");
        const winMoves = document.getElementById("winMoves");
        const winRetry = document.getElementById("memoryWinRetry");

        let confettiFrame = null;

        function launchConfetti() {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }

            const canvas = document.createElement("canvas");
            canvas.className = "confetti-canvas";
            canvas.setAttribute("aria-hidden", "true");
            document.body.appendChild(canvas);

            const ctx = canvas.getContext("2d");
            const colors = ["#a98a4d", "#e8d29b", "#c62835", "#9e1b29", "#ffffff", "#e9dcc3"];
            const dpr = window.devicePixelRatio || 1;

            function resize() {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            resize();

            const w = window.innerWidth;
            const h = window.innerHeight;
            const pieces = [];

            function burst(originX, originY, angleMin, angleMax, count) {
                for (let i = 0; i < count; i++) {
                    const angle =
                        (angleMin + Math.random() * (angleMax - angleMin)) *
                        (Math.PI / 180);
                    const speed = 9 + Math.random() * 11;

                    pieces.push({
                        x: originX,
                        y: originY,
                        vx: Math.cos(angle) * speed,
                        vy: -Math.sin(angle) * speed,
                        size: 6 + Math.random() * 7,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        rotation: Math.random() * Math.PI * 2,
                        spin: (Math.random() - 0.5) * 0.4,
                        tilt: Math.random() * Math.PI * 2,
                        tiltSpeed: 0.05 + Math.random() * 0.12,
                        round: Math.random() < 0.25
                    });
                }
            }

            /* two cannons from the bottom corners + a shower from the top */
            burst(0, h, 40, 80, 90);
            burst(w, h, 100, 140, 90);

            for (let i = 0; i < 70; i++) {
                pieces.push({
                    x: Math.random() * w,
                    y: -20 - Math.random() * h * 0.5,
                    vx: (Math.random() - 0.5) * 3,
                    vy: 2 + Math.random() * 3,
                    size: 6 + Math.random() * 6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 0.3,
                    tilt: Math.random() * Math.PI * 2,
                    tiltSpeed: 0.05 + Math.random() * 0.1,
                    round: Math.random() < 0.25
                });
            }

            const start = performance.now();
            const duration = 5200;

            function draw(now) {
                const elapsed = now - start;

                ctx.clearRect(0, 0, w, h);

                const fade = elapsed > duration - 1200
                    ? Math.max(0, (duration - elapsed) / 1200)
                    : 1;

                pieces.forEach(function (p) {
                    p.vx *= 0.992;
                    p.vy += 0.28;
                    p.vy *= 0.992;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rotation += p.spin;
                    p.tilt += p.tiltSpeed;

                    ctx.save();
                    ctx.globalAlpha = fade;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.scale(1, Math.cos(p.tilt));
                    ctx.fillStyle = p.color;

                    if (p.round) {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                    }

                    ctx.restore();
                });

                if (elapsed < duration) {
                    confettiFrame = window.requestAnimationFrame(draw);
                } else {
                    canvas.remove();
                    confettiFrame = null;
                }
            }

            if (confettiFrame !== null) {
                window.cancelAnimationFrame(confettiFrame);
            }

            confettiFrame = window.requestAnimationFrame(draw);

            /* stored so closing the popup can clear it early */
            launchConfetti.canvas = canvas;
        }

        function stopConfetti() {
            if (confettiFrame !== null) {
                window.cancelAnimationFrame(confettiFrame);
                confettiFrame = null;
            }

            if (launchConfetti.canvas) {
                launchConfetti.canvas.remove();
                launchConfetti.canvas = null;
            }
        }

        function showWin() {
            if (!winModal) {
                return;
            }

            if (winTime) {
                winTime.textContent = formatTime(seconds);
            }

            if (winMoves) {
                winMoves.textContent = moves;
            }

            winModal.classList.add("active");
            winModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("memory-win-open");

            launchConfetti();

            if (winRetry) {
                winRetry.focus();
            }
        }

        function hideWin() {
            if (!winModal) {
                return;
            }

            winModal.classList.remove("active");
            winModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("memory-win-open");

            stopConfetti();
        }

        if (winRetry) {
            winRetry.addEventListener("click", function () {
                startGame();
            });
        }

        if (winModal) {
            winModal.addEventListener("click", function (event) {
                if (event.target.classList.contains("memory-win-overlay")) {
                    hideWin();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape" && winModal.classList.contains("active")) {
                    hideWin();
                }
            });
        }

        /* ==============================
           START / RESET GAME
        ================================= */

        function startGame() {

            gameId++;
            hideWin();
            stopTimer();
            seconds = 0;
            updateTimer();
            if (timerStat) {
                timerStat.classList.remove("is-done");
            }

            firstCard = null;

            secondCard = null;

            locked = false;

            moves = 0;

            pairs = 0;


            movesDisplay.textContent =
                "0";


            pairsDisplay.textContent =
                "0/8";


            message.textContent =
                "Find all 8 technology pairs.";


            board.innerHTML = "";


            const deck =
                createDeck();


            deck.forEach(
                function (
                    technology,
                    index
                ) {

                    const card =
                        createCard(
                            technology,
                            index
                        );


                    board.appendChild(
                        card
                    );

                }
            );

        }


        resetButton.addEventListener(
            "click",
            startGame
        );


        startGame();

    }

    /* ==============================
       NAV: HIGHLIGHT CURRENT SECTION (scroll spy)
    ================================= */
    (function () {
        const spyLinks = Array.prototype.slice.call(
            document.querySelectorAll('.nav-links a[href^="#"]')
        );

        const spyItems = spyLinks
            .map(function (link) {
                return {
                    link: link,
                    section: document.querySelector(link.getAttribute("href"))
                };
            })
            .filter(function (item) {
                return item.section;
            });

        if (!spyItems.length) {
            return;
        }

        let ticking = false;

        function updateActiveLink() {
            ticking = false;

            const line = window.innerHeight * 0.35;
            let current = spyItems[0];

            spyItems.forEach(function (item) {
                if (item.section.getBoundingClientRect().top <= line) {
                    current = item;
                }
            });

            /* bottom of the page always counts as the last section */
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4
            ) {
                current = spyItems[spyItems.length - 1];
            }

            spyItems.forEach(function (item) {
                const on = item === current;
                item.link.classList.toggle("is-active", on);

                if (on) {
                    item.link.setAttribute("aria-current", "true");
                } else {
                    item.link.removeAttribute("aria-current");
                }
            });
        }

        function requestUpdate() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateActiveLink);
            }
        }

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        updateActiveLink();
    })();


    /* ==============================
       ABOUT HEADING: BLUR-IN WORD REVEAL
    ================================= */
    (function () {
        const heading = document.querySelector(".about-content h2");

        if (!heading) {
            return;
        }

        const text = heading.textContent.replace(/\s+/g, " ").trim();

        heading.setAttribute("aria-label", text);
        heading.textContent = "";

        text.split(" ").forEach(function (word, index) {
            const span = document.createElement("span");
            span.className = "blur-word";
            span.setAttribute("aria-hidden", "true");
            span.style.setProperty("--i", index);
            span.textContent = word;

            heading.appendChild(span);
            heading.appendChild(document.createTextNode(" "));
        });

        heading.classList.add("blur-reveal");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            heading.classList.add("in-view");
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.4 }
            );

            observer.observe(heading);
        } else {
            heading.classList.add("in-view");
        }
    })();

    /* ==============================
       INTERACTIVE: THINKING CHARACTER LOOP
    ================================= */
    (function () {
        const character = document.querySelector(".memory-character img");

        if (!character) {
            return;
        }

        const altSrc = character.getAttribute("data-alt-src");

        if (!altSrc) {
            return;
        }

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const frames = [character.getAttribute("src"), altSrc];

        /* preload both frames so the swap never flickers */
        frames.forEach(function (src) {
            const preload = new Image();
            preload.src = src;
        });

        let current = 0;

        setInterval(function () {
            current = 1 - current;
            character.setAttribute("src", frames[current]);
        }, 800);
    })();

    /* ==============================
       PROJECT MODAL (View Project)
    ================================= */
    (function () {
        const modal = document.getElementById("projectModal");
        const modalTitle = document.getElementById("projectModalTitle");
        const modalBody = document.getElementById("projectModalBody");
        const closeButton = document.getElementById("projectModalClose");
        const overlay = document.getElementById("projectModalOverlay");
        const triggers = document.querySelectorAll("[data-project]");

        if (!modal || !modalTitle || !modalBody || !closeButton || !triggers.length) {
            return;
        }

        const projects = {
            ordering: {
                title: "Ordering & Management System for MSMEs",
                demo: "P31W1VeOcSo",
                github: "https://github.com/lorheagrace/Ordering-and-Management-System-for-MSMEs",
                wireframe: "https://makiphotography.my.canva.site/digital-ordering-and-management-system"
            },

            borrowing: {
                title: "Laboratory Equipment Borrowing System",
                demo: "fqLLZcGy5dU",
                github: "https://github.com/lorheagrace/TUPCLaboratoryEquipmentBorrowingSystem",
                wireframe: null
            },

            testcard: {
                title: "LTC 4125 and LT1714 Test Card",
                datasheets: [
                    {
                        name: "LTC 4125",
                        url: "https://www.analog.com/en/products/ltc4125.html"
                    },
                    {
                        name: "LT1714",
                        url: "https://www.analog.com/en/products/lt1714.html"
                    }
                ]
            },

            borrowlab: {
                title: "BorrowLab Mobile App",
                demo: "pYtHfROe7js",
                github: "https://github.com/lorheagrace/Borrow-Lab-Mobile-App",
                wireframe: "https://makiphotography.my.canva.site/borrowlab-laboratory-equipment-borrowing-mob-app"
            }
        };

        let lastFocused = null;

        function make(tag, className, text) {
            const node = document.createElement(tag);

            if (className) {
                node.className = className;
            }

            if (text) {
                node.textContent = text;
            }

            return node;
        }

        function externalLink(className, href, iconClass, label) {
            const link = make("a", className);
            link.href = href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const icon = make("i", iconClass);
            icon.setAttribute("aria-hidden", "true");

            link.appendChild(icon);
            link.appendChild(document.createTextNode(label));

            return link;
        }

    function buildDemo(videoId, title) {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(
            make("p", "project-modal-section", "Demo")
        );

        const wrapper = make("div", "project-modal-video");
        const frame = document.createElement("iframe");

        frame.src =
            "https://www.youtube.com/embed/" + videoId +
            "?autoplay=1&rel=0&modestbranding=1&playsinline=1";

        frame.title = title + " demo video";

        frame.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        frame.allowFullscreen = true;

        wrapper.appendChild(frame);
        fragment.appendChild(wrapper);

        return fragment;
    }

        function buildActions(project) {
            const actions = make("div", "project-modal-actions");

            actions.appendChild(
                externalLink(
                    "pm-btn pm-btn-primary",
                    project.github,
                    "fa-brands fa-github",
                    "View on GitHub"
                )
            );

            if (project.wireframe) {
                actions.appendChild(
                    externalLink(
                        "pm-btn pm-btn-outline",
                        project.wireframe,
                        "fa-solid fa-pen-ruler",
                        "View Wireframe"
                    )
                );
            } else {
                const disabled = make("button", "pm-btn pm-btn-disabled");
                disabled.type = "button";
                disabled.disabled = true;

                const icon = make("i", "fa-solid fa-ban");
                icon.setAttribute("aria-hidden", "true");

                disabled.appendChild(icon);
                disabled.appendChild(
                    document.createTextNode("Wireframe not available")
                );

                actions.appendChild(disabled);
            }

            return actions;
        }

        function buildDatasheets(list) {
            const fragment = document.createDocumentFragment();

            fragment.appendChild(make("p", "project-modal-section", "Datasheets"));

            const grid = make("div", "project-modal-datasheets");

            list.forEach(function (sheet) {
                const card = make("a", "pm-datasheet");
                card.href = sheet.url;
                card.target = "_blank";
                card.rel = "noopener noreferrer";

                const icon = make("i", "fa-solid fa-microchip");
                icon.setAttribute("aria-hidden", "true");

                card.appendChild(icon);
                card.appendChild(make("span", "pm-datasheet-tag", "DATASHEET"));
                card.appendChild(make("span", "pm-datasheet-name", sheet.name));
                card.appendChild(
                    make("span", "pm-datasheet-open", "Open on analog.com \u2197")
                );

                grid.appendChild(card);
            });

            fragment.appendChild(grid);

            return fragment;
        }

        function openModal(key, trigger) {
            const project = projects[key];

            if (!project) {
                return;
            }

            lastFocused = trigger;

            modalTitle.textContent = project.title;
            modalBody.textContent = "";

            if (project.datasheets) {
                modalBody.appendChild(buildDatasheets(project.datasheets));
            } else {
                modalBody.appendChild(buildDemo(project.demo, project.title));
                modalBody.appendChild(buildActions(project));
            }

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("project-modal-open");

            closeButton.focus();
        }

        function closeModal() {
            if (!modal.classList.contains("active")) {
                return;
            }

            /* removing the iframe stops the video immediately */
            modalBody.querySelectorAll("iframe").forEach(function (frame) {
                frame.remove();
            });

            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("project-modal-open");

            if (lastFocused && lastFocused.focus) {
                lastFocused.focus();
            }
        }

        triggers.forEach(function (trigger) {
            trigger.addEventListener("click", function (event) {
                event.preventDefault();
                openModal(trigger.getAttribute("data-project"), trigger);
            });
        });

        closeButton.addEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);

        document.addEventListener("keydown", function (event) {
            if (!modal.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {
                closeModal();
                return;
            }

            /* keep keyboard focus inside the modal */
            if (event.key === "Tab") {
                const focusable = modal.querySelectorAll(
                    'a[href], button:not([disabled]), iframe'
                );

                if (!focusable.length) {
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    })();


});
