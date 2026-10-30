import { youtubeEmbed, youtubeId } from "@/lib/media";

// Video block (e.g. "Experience Our Impact"): text on the left, video on the right
export default function VideoSection({ section }) {
  const id = youtubeId(section.video_url);

  return (
    <section className={`section bg-${section.background}`}>
      <div className="container feature image-right">
        <div className="feature-image video-frame">
          {/* YouTube links are embedded, other links are played as a normal video file */}
          {id ? (
            <iframe src={youtubeEmbed(id)} title={section.title} allowFullScreen />
          ) : (
            section.video_url && <video src={section.video_url} controls />
          )}
        </div>
        <div className="feature-text">
          <h2 className="section-title">{section.title}</h2>
          {section.body && <p>{section.body}</p>}
          {section.button_text && (
            <a href={section.button_url} className="btn btn-gold" target="_blank" rel="noreferrer">
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
