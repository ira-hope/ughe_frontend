// Text + image block (e.g. "Explore Academics", "Study at UGHE")
export default function FeatureSection({ section }) {
  return (
    <section className={`section bg-${section.background}`}>
      {/* image_position (left/right) is chosen in Django Admin */}
      <div className={`container feature image-${section.image_position}`}>
        {section.image && (
          <div className="feature-image">
            <img src={section.image} alt={section.title} />
          </div>
        )}
        <div className="feature-text">
          <h2 className="section-title">{section.title}</h2>
          {section.body && <p>{section.body}</p>}
          {section.button_text && (
            <a href={section.button_url} className="btn btn-section">
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
