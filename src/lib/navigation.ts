export interface NavLink {
  label: string;
  href: string;
}

/**
 * Single source of truth for site menu navigation.
 * Used by the header (desktop + mobile) and the footer.
 * Each href is an in-page anchor matching a section's id.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-us" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact-us" },
];
