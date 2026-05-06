(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tabs = Array.from(document.querySelectorAll(".terminal-tabs button"));
    const snippets = document.querySelectorAll(".snippet");

    const activate = (tab, focus = false) => {
        const target = tab.dataset.tab;
        tabs.forEach((other) => {
            const selected = other === tab;
            other.setAttribute("aria-selected", selected ? "true" : "false");
            other.setAttribute("tabindex", selected ? "0" : "-1");
        });
        snippets.forEach((snippet) => {
            snippet.hidden = snippet.dataset.snippet !== target;
        });
        if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => activate(tab));
        tab.addEventListener("keydown", (e) => {
            const last = tabs.length - 1;
            let next = -1;
            if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
            else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = last;
            if (next !== -1) {
                e.preventDefault();
                activate(tabs[next], true);
            }
        });
    });

    const reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        reveals.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
})();
