/* =====================================================
   BOOT SEQUENCE
===================================================== */

const boot = document.querySelector("#boot");
const bootFill = document.querySelector("#bootFill");
const bootLines = document.querySelectorAll(".boot-line");

function runBoot() {

    const tl = gsap.timeline({
        onComplete: () => {
            boot.style.display = "none";
            initPageAnimations();
        }
    });

    tl.to(bootLines, {
        opacity: 1,
        duration: .25,
        stagger: .35
    })
    .to(bootFill, {
        width: "100%",
        duration: 1,
        ease: "power2.inOut"
    }, "-=.4")
    .to(boot, {
        opacity: 0,
        duration: .5,
        ease: "power2.inOut"
    }, "+=.15");

}

runBoot();


/* =====================================================
   CLOCK
===================================================== */

const clockValue = document.querySelector("#clockValue");

function updateClock() {

    if (!clockValue) return;

    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    clockValue.textContent = time;

}

updateClock();
setInterval(updateClock, 1000);


/* =====================================================
   PANEL SWITCHING
===================================================== */

const panelLinks = document.querySelectorAll("[data-panel-link]");
const panels = document.querySelectorAll(".panel");
const railItems = document.querySelectorAll(".rail-item");

function goToPanel(name) {

    const targetPanel = document.querySelector(`.panel[data-panel="${name}"]`);
    const currentPanel = document.querySelector(".panel.active");

    if (!targetPanel || targetPanel === currentPanel) return;

    railItems.forEach((item) => {
        item.classList.toggle(
            "active",
            item.dataset.panelLink === name
        );
    });

    const tl = gsap.timeline();

    if (currentPanel) {

        tl.to(currentPanel, {
            opacity: 0,
            y: 12,
            duration: .25,
            ease: "power2.in",
            onComplete: () => {
                currentPanel.classList.remove("active");
            }
        });

    }

    tl.add(() => {

        targetPanel.classList.add("active");

        gsap.fromTo(targetPanel,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: .4, ease: "power2.out" }
        );

        if (name === "skills") {
            animateSkillBars();
        }

    });

    /* scroll the stage back to top on mobile when switching */
    document.querySelector(".stage")?.scrollTo({ top: 0, behavior: "instant" });

}

panelLinks.forEach((link) => {

    link.addEventListener("click", (e) => {
        e.preventDefault();
        goToPanel(link.dataset.panelLink);
    });

});


/* =====================================================
   TYPEWRITER (HOME — FOCUS)
===================================================== */

const typewriterEl = document.querySelector("#typewriter");

const focusWords = [
    "Web Design",
    "Brand Identity",
    "Creative Direction",
    "Front-End Development",
    "Social & Content"
];

let wordIndex = 0;
let charIndex = focusWords[0].length;
let deleting = false;

function typeLoop() {

    if (!typewriterEl) return;

    const currentWord = focusWords[wordIndex];

    if (!deleting) {

        charIndex++;

        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }

    } else {

        charIndex--;

        if (charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % focusWords.length;
            charIndex = 0;
        }

    }

    typewriterEl.textContent = currentWord.slice(0, charIndex);

    setTimeout(typeLoop, deleting ? 35 : 65);

}

setTimeout(typeLoop, 1200);


/* =====================================================
   SIGNAL WAVE (idle animation)
===================================================== */

function initPageAnimations() {

    const wave = document.querySelector("#wavePath");

    if (wave) {

        gsap.to(wave, {
            attr: {
                d: "M0,30 Q37.5,50 75,30 T150,30 T225,30 T300,30"
            },
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }

    gsap.from(".intro-card > *, .signal-card", {
        opacity: 0,
        y: 20,
        duration: .7,
        stagger: .08,
        ease: "power3.out"
    });

}


/* =====================================================
   SKILLS BARS
===================================================== */

function animateSkillBars() {

    document.querySelectorAll(".skill-row").forEach((row) => {

        const level = row.dataset.level || 0;
        const fill = row.querySelector(".skill-fill");

        if (!fill) return;

        gsap.fromTo(fill,
            { width: "0%" },
            { width: `${level}%`, duration: 1, ease: "power3.out" }
        );

    });

}


/* =====================================================
   WORK FILTERS
===================================================== */

const filterChips = document.querySelectorAll(".filter-chip");
const workCards = document.querySelectorAll(".work-card");

filterChips.forEach((chip) => {

    chip.addEventListener("click", () => {

        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        const filter = chip.dataset.filter;

        workCards.forEach((card) => {

            const match =
                filter === "all" ||
                card.dataset.category === filter;

            card.classList.toggle("is-hidden", !match);

        });

    });

});


/* =====================================================
   WORK CARD DETAIL OVERLAY (text projects)
===================================================== */

const detailOverlay = document.querySelector("#detailOverlay");
const detailClose = document.querySelector("#detailClose");
const detailTitle = document.querySelector("#detailTitle");
const detailDesc = document.querySelector("#detailDesc");
const detailTag = document.querySelector("#detailTag");

function closeDetail() {
    detailOverlay?.classList.remove("active");
}

detailClose?.addEventListener("click", closeDetail);

detailOverlay?.addEventListener("click", (e) => {
    if (e.target === detailOverlay) closeDetail();
});


/* =====================================================
   LIGHTBOX (photo / video / certificate cards)
===================================================== */

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector("#lightboxClose");

function openLightbox(src, caption) {

    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";

    lightbox.classList.add("active");

}

function closeLightbox() {
    lightbox?.classList.remove("active");
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});


/* =====================================================
   WIRE UP: work cards + certificate cards
===================================================== */

document.querySelectorAll(".work-card").forEach((card) => {

    card.addEventListener("click", () => {

        if (card.classList.contains("gallery-card")) {

            const img = card.querySelector(".gallery-thumb img");
            const caption = card.querySelector(".gallery-caption")?.textContent;

            openLightbox(img?.src, caption);

        } else {

            const tagText = card.querySelector(".tag")?.textContent || "";

            detailTitle.textContent = card.dataset.title || "";
            detailDesc.textContent = card.dataset.desc || "";
            detailTag.textContent = tagText;

            detailOverlay.classList.add("active");

        }

    });

});

document.querySelectorAll(".cert-card").forEach((card) => {

    card.addEventListener("click", () => {

        const img = card.querySelector(".cert-thumb img");
        const name = card.querySelector(".cert-info h3")?.textContent;
        const meta = card.querySelector(".cert-info p")?.textContent;

        openLightbox(img?.src, `${name} — ${meta}`);

    });

});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDetail();
        closeLightbox();
    }
});

