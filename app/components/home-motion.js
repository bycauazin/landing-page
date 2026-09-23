"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-home-motion]");
    if (!root) return undefined;

    const media = gsap.matchMedia();
    let active = true;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const find = (selector) => root.querySelector(selector);
        const all = (selector) => gsap.utils.toArray(selector, root);
        const hero = find(`.${styles.hero}`);
        const heroLines = all("#hero-title [data-motion-line]");

        gsap.set(heroLines, { yPercent: 115, autoAlpha: 0, rotationX: 7, transformOrigin: "50% 100%" });
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .fromTo(find(`.${styles.eyebrow}`), { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55 }, 0.14)
          .to(heroLines, { yPercent: 0, autoAlpha: 1, rotationX: 0, duration: 0.88, stagger: 0.12 }, 0.3)
          .fromTo(find(`.${styles.heroText}`), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.73)
          .fromTo(find(`.${styles.heroActions}`), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.9)
          .fromTo(find(`.${styles.heroVisual}`), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 1.02)
          .fromTo(find(`.${styles.scrollHint}`), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.32);

        gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.55 } })
          .to(find(`.${styles.heroCopy}`), { y: -48, ease: "none" }, 0)
          .to(find(`.${styles.heroText}`), { autoAlpha: 0.18, ease: "none" }, 0)
          .to(find(`.${styles.heroActions}`), { y: 24, opacity: 0, ease: "none" }, 0)
          .to(find(`.${styles.avatarFrame}`), { y: 92, scale: 1.075, rotation: 1.2, ease: "none" }, 0)
          .to(find(`.${styles.visualGrid}`), { y: 26, opacity: 0.1, ease: "none" }, 0)
          .to(find(`.${styles.scrollHint}`), { autoAlpha: 0, ease: "none" }, 0);

        const tech = find(`.${styles.techSection}`);
        gsap.timeline({ scrollTrigger: { trigger: tech, start: "top 82%", end: "top 15%", scrub: 0.35 } })
          .from(find("[data-motion-tech-label]"), { x: -26, autoAlpha: 0, duration: 0.35 }, 0)
          .from(all("#tech-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, rotationX: 5, stagger: 0.12, duration: 0.6, ease: "power3.out" }, 0.12)
          .from(all("[data-motion-tech]"), { y: 20, scale: 0.93, autoAlpha: 0, filter: "blur(5px)", stagger: 0.055, duration: 0.38, ease: "power3.out" }, 0.34);

        const services = find(`.${styles.servicesSection}`);
        gsap.timeline({ scrollTrigger: { trigger: services, start: "top 78%", once: true } })
          .from(find(`[data-motion-services-intro] .${styles.kicker}`), { x: -20, autoAlpha: 0, duration: 0.5 })
          .from(all("#services-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, rotationX: 5, stagger: 0.11, duration: 0.76, ease: "power4.out" }, "-=0.28");

        all("[data-motion-service]").forEach((card, index) => {
          gsap.from(card, {
            x: index % 2 === 0 ? 38 : -32,
            y: 18,
            rotation: index % 2 === 0 ? 0.7 : -0.7,
            opacity: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
          gsap.from(card.querySelector(`.${styles.cardTop} span`), {
            scale: 1.35,
            autoAlpha: 0,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 78%", once: true },
          });
        });

        const projects = find(`.${styles.casesSection}`);
        gsap.timeline({ scrollTrigger: { trigger: projects, start: "top 78%", once: true } })
          .from(find(`[data-motion-project-intro] .${styles.kicker}`), { x: -22, autoAlpha: 0, duration: 0.45 })
          .from(all("#cases-title [data-motion-line]"), { yPercent: 112, rotationX: 6, autoAlpha: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }, "-=0.16")
          .from([find(`.${styles.sectionSubtitle}`), find(`.${styles.sectionAside}`)], { y: 18, autoAlpha: 0, stagger: 0.1, duration: 0.58 }, "-=0.34");

        all("[data-motion-project]").forEach((card, index) => {
          gsap.from(card, {
            y: 64,
            x: index % 2 === 0 ? -15 : 15,
            scale: 0.965,
            rotationX: 4,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
        gsap.from(find("[data-motion-project-cta]"), { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: "[data-motion-project-cta]", start: "top 90%", once: true } });

        const about = find(`.${styles.aboutSection}`);
        gsap.timeline({ scrollTrigger: { trigger: about, start: "top 75%", once: true } })
          .from(find("[data-motion-social-post]"), { x: -42, scale: 0.97, autoAlpha: 0, duration: 0.95, ease: "power3.out" })
          .from(find(`[data-motion-about-copy] .${styles.kicker}`), { x: 24, autoAlpha: 0, duration: 0.46 }, "-=0.62")
          .from(all("#about-title [data-motion-line]"), { xPercent: -10, autoAlpha: 0, filter: "blur(4px)", stagger: 0.12, duration: 0.86, ease: "power4.out" }, "-=0.28")
          .from(all(`[data-motion-about-copy] > p:not(.${styles.kicker})`), { y: 16, autoAlpha: 0, stagger: 0.09, duration: 0.58 }, "-=0.4");
        gsap.fromTo(find(`.${styles.socialMedia} img`), { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: about, start: "top bottom", end: "bottom top", scrub: 0.6 } });

        const socials = find(`.${styles.socialsSection}`);
        gsap.timeline({ scrollTrigger: { trigger: socials, start: "top 78%", once: true } })
          .from(all("#socials-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, stagger: 0.12, duration: 0.76, ease: "power4.out" })
          .from(find(`.${styles.socialsSubtitle}`), { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.38")
          .from(all("[data-motion-social-link]"), { x: -20, opacity: 0, stagger: 0.1, duration: 0.58, ease: "power3.out" }, "-=0.1");

        const contact = find("[data-motion-contact]");
        gsap.timeline({ scrollTrigger: { trigger: contact, start: "top 76%", once: true } })
          .from(find(`[data-motion-contact] .${styles.kicker}`), { y: 18, autoAlpha: 0, duration: 0.48 })
          .from(all("#contact-title [data-motion-line]"), { yPercent: 105, scale: 0.96, autoAlpha: 0, filter: "blur(4px)", stagger: 0.12, duration: 0.86, ease: "power4.out" }, "-=0.16")
          .from(find(`[data-motion-contact] > p:not(.${styles.kicker})`), { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.3")
          .from(find(`.${styles.contactButton}`), { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.16")
          .from(find(`.${styles.contactAura}`), { scale: 0.72, autoAlpha: 0, duration: 1.15, ease: "power2.out" }, 0);

        gsap.fromTo(find("[data-motion-progress]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 } });
      }, root);
      return () => context.revert();
    });

    media.add("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root.querySelectorAll("[data-motion-service]").forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: ({ isActive }) => { if (isActive) card.dataset.motionActive = ""; else delete card.dataset.motionActive; },
          });
        });
      }, root);

      const listeners = [];
      root.querySelectorAll("[data-motion-project]").forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.32, ease: "power2.out" });
        const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.32, ease: "power2.out" });
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          rotateX((0.5 - (event.clientY - rect.top) / rect.height) * 2.4);
          rotateY((((event.clientX - rect.left) / rect.width) - 0.5) * 2.4);
        };
        const leave = () => { rotateX(0); rotateY(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        listeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          rotateX.tween?.kill();
          rotateY.tween?.kill();
          delete card.dataset.motionActive;
        });
      });
      return () => { listeners.forEach((remove) => remove()); context.revert(); };
    });

    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);

  return null;
}
