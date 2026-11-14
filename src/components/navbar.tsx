"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * The navbar needs the current path to highlight the right tab. On pages
 * rendered on demand (a project added after the last deploy) the path is only
 * known at request time, so it is read inside a Suspense boundary and the
 * navbar still appears instantly.
 */
export function Navbar({ brand }: { brand: string }) {
  return (
    <Suspense fallback={<NavbarView brand={brand} pathname="/projects" />}>
      <NavbarWithPath brand={brand} />
    </Suspense>
  );
}

function NavbarWithPath({ brand }: { brand: string }) {
  return <NavbarView brand={brand} pathname={usePathname()} />;
}

function NavbarView({ brand, pathname }: { brand: string; pathname: string }) {
  const onHome = pathname === "/";
  const [section, setSection] = useState("home");
  // Away from the home page, the Projects tab stays highlighted.
  const active = onHome ? section : "projects";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSection(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 pl-5 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-line bg-surface/80 shadow-soft"
            : "border-transparent bg-surface/40"
        }`}
      >
        <Link href="/#home" className="flex items-baseline gap-0.5 text-lg font-extrabold tracking-tight text-ink">
          {brand}
          <span className="text-brand">.</span>
          <span className="ml-1 font-mono text-xs font-medium text-muted">/dev</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id} className="relative">
              <Link
                href={`/#${link.id}`}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.id ? "text-brand-strong" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-brand-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-brand-soft hover:text-brand-strong md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-line bg-surface/95 p-2 shadow-lift backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium ${
                    active === link.id ? "bg-brand-soft text-brand-strong" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
