"use client";

import { useEffect, useRef, useState } from "react";
import Button, { WhatsAppIcon } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/navigation";
import { UI } from "@/lib/ui-strings";
import { whatsappHref, type Settings } from "@/sanity/content";

const MOBILE_MENU_ID = "mobile-menu";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 8h18" />
          <path d="M3 16h18" />
        </>
      )}
    </svg>
  );
}

/**
 * Site banner: primary nav overlaying the hero, the mobile menu dialog and the
 * sticky booking CTA. Unpositioned on purpose — a z-index here would create a
 * stacking context and trap the fixed menu (z-30) and sticky CTA (z-50) beneath it.
 */
export default function SiteHeader({ settings }: { settings: Settings | null }) {
  const bookingHref = whatsappHref(settings);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyCta, setStickyCta] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Return focus to the toggle, except after a link click (the browser is moving to an anchor)
  const closeMenu = (returnFocus = true) => {
    setMobileMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  // Sticky CTA scroll trigger
  useEffect(() => {
    const onScroll = () => {
      setStickyCta(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Mobile menu behaves as a modal: focus the first link, close on Escape, keep Tab inside the panel
  useEffect(() => {
    if (!mobileMenuOpen) return;
    firstLinkRef.current?.focus();

    // The menu is md:hidden — close it if the viewport grows past md, or the scroll lock would stick
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // Focus escaped the panel (click on a blank area, AT focus move): pull it back in
      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="text-paper">
      {/* ── Nav ── */}
      <nav
        aria-label={UI.primaryNav}
        className="anim-fade absolute top-0 right-0 left-0 z-20 flex items-center justify-between border-b border-paper/20 px-6 py-5 md:px-16 lg:px-20"
      >
        <a href="#home" className="type-subheading">
          {settings?.siteName}
        </a>

        {/* Desktop: center nav links */}
        <div className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline type-caption px-4 text-paper/80 transition-colors hover:text-paper lg:px-[30px]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: Book a Session — hands off to the sticky on scroll */}
        <div
          className={`hidden transition-all duration-400 md:inline-flex ${
            stickyCta ? "pointer-events-none invisible opacity-0" : "opacity-100"
          }`}
        >
          {bookingHref && (
            <Button
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              tone="ink"
              icon={<WhatsAppIcon />}
            >
              {settings?.bookingLabel}
            </Button>
          )}
        </div>

        {/* Mobile: menu toggle */}
        <button
          ref={toggleRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors active:bg-paper/10 md:hidden"
          aria-label={mobileMenuOpen ? UI.closeMenu : UI.openMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          <MenuIcon open={mobileMenuOpen} />
        </button>
      </nav>

      {/* ── Sticky booking CTA — desktop after scroll, always on mobile ── */}
      {bookingHref && (
        <div
          className={`fixed right-6 bottom-6 z-50 transition-all duration-400 md:right-8 md:bottom-8 ${
            stickyCta
              ? "opacity-100 md:translate-y-0"
              : "opacity-100 md:pointer-events-none md:invisible md:translate-y-3 md:opacity-0"
          }`}
        >
          <Button
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            icon={<WhatsAppIcon />}
          >
            {settings?.bookingLabel}
          </Button>
        </div>
      )}

      {/* ── Mobile Menu Overlay — inert while closed so hidden links are never focusable ── */}
      <div
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-30 transition-opacity duration-400 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop — pointer-only dismissal; Escape and the close button cover keyboard users */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ink-pure/60"
          onClick={() => closeMenu()}
        />
        {/* Panel */}
        <div
          ref={panelRef}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label={UI.menu}
          className={`absolute top-0 right-0 flex h-full w-[280px] flex-col border-l border-paper/20 bg-ink transition-transform duration-400 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-paper/20 px-6 py-5">
            <span className="type-meta text-paper/50">{UI.menu}</span>
            <button
              onClick={() => closeMenu()}
              className="flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors active:bg-paper/10"
              aria-label={UI.closeMenu}
            >
              <MenuIcon open={true} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-6 py-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => closeMenu(false)}
                className="type-heading border-b border-paper/20 py-4 text-paper/80 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
