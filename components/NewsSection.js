import { formatDate } from "@/lib/media";

// "News & Updates" section: heading from the section, cards from the News items
export default function NewsSection({ section, news }) {
  return (
    <section className={`section bg-${section.background}`}>
      <div className="container">
        <div className="news-header">
          <h2 className="section-title">{section.title}</h2>
          {section.button_text && (
            <a href={section.button_url} className="link-arrow">
              {section.button_text} →
            </a>
          )}
        </div>
        {section.body && <p className="section-intro">{section.body}</p>}

        <div className="news-grid">
          {news.map((item) => (
            <a key={item.id} href={item.link || "#"} className="news-card">
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="news-body">
                <span className="news-meta">
                  {item.category && <strong>{item.category}</strong>} {formatDate(item.date)}
                </span>
                <h3>{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
