"use client";

import { useState } from "react";

// Header: logo, top buttons and main menu with dropdowns (all from Django Admin)
export default function Header({ site, menu, topButtons, onLogout }) {
  // Opens/closes the menu on small screens
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-top">
        <a href="/" className="header-logo">
          {site.logo ? <img src={site.logo} alt={site.site_name} /> : <strong>{site.site_name}</strong>}
        </a>

        {/* Top bar buttons such as Apply / Get Involved */}
        <div className="top-buttons">
          {topButtons.map((btn, i) => (
            <a key={btn.id} href={btn.url} className={i === 0 ? "btn btn-red" : "btn btn-outline"}>
              {btn.title}
            </a>
          ))}
          <button className="btn btn-dark" onClick={onLogout}>
            Log out
          </button>
        </div>

        <button className="menu-toggle" aria-label="Open menu" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Main menu, children appear in a dropdown on hover */}
      <nav className={`main-nav ${open ? "is-open" : ""}`}>
        <ul className="container">
          {menu.map((item) => (
            <li key={item.id} className="nav-item">
              <a href={item.url}>
                {item.title}
                {item.children.length > 0 && <span className="caret">▾</span>}
              </a>
              {item.children.length > 0 && (
                <ul className="dropdown">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a href={child.url}>{child.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {/* Extra buttons inside the mobile menu */}
          <li className="mobile-only">
            {topButtons.map((btn) => (
              <a key={btn.id} href={btn.url}>
                {btn.title}
              </a>
            ))}
            <button onClick={onLogout}>Log out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
