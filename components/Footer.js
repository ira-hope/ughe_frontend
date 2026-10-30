// Small text labels for each social platform saved in Django Admin
const SOCIAL_LABELS = { facebook: "f", x: "X", instagram: "IG", linkedin: "in", youtube: "▶" };

// Footer: logo, contacts, quick links and social links (all from Django Admin)
export default function Footer({ site, links, socials }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          {site.footer_logo && <img src={site.footer_logo} alt={site.site_name} className="footer-logo" />}
          {site.footer_tagline && <p>{site.footer_tagline}</p>}
        </div>

        <div>
          <h4>Campus</h4>
          {site.campus_address && <p>{site.campus_address}</p>}
          {site.office_hours && <p>Office Hours: {site.office_hours}</p>}
          {site.phone && <p>Phone: {site.phone}</p>}
          {site.email && (
            <p>
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
        </div>

        <div>
          <h4>Kigali Office</h4>
          {site.kigali_office && <p>{site.kigali_office}</p>}
          <h4>Connect With Us</h4>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform}>
                {SOCIAL_LABELS[s.platform] || s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>{site.copyright_text}</span>
          <nav>
            {links.map((link) => (
              <a key={link.id} href={link.url}>
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
