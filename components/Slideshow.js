"use client";

import { useEffect, useState } from "react";
import { youtubeEmbed, youtubeId } from "@/lib/media";

// Time each slide stays on screen (milliseconds)
const SLIDE_DURATION = 7000;

// Hero slideshow: supports one or many slides, each being an image or a video
export default function Slideshow({ slides }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // Move to the next slide automatically when there is more than one
  useEffect(() => {
    if (total < 2) return;
    const timer = setTimeout(() => setCurrent((current + 1) % total), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, total]);

  if (total === 0) return null;

  const go = (step) => setCurrent((current + step + total) % total);

  return (
    <section className="slideshow">
      {slides.map((slide, i) => (
        <div key={slide.id} className={`slide ${i === current ? "is-active" : ""}`}>
          <SlideMedia slide={slide} active={i === current} />
          <div className="slide-overlay" />
          {(slide.title || slide.subtitle) && (
            <div className="container slide-caption">
              {slide.title && <h1>{slide.title}</h1>}
              {slide.subtitle && <p>{slide.subtitle}</p>}
              {slide.button_text && (
                <a href={slide.button_url} className="btn btn-gold">
                  {slide.button_text}
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Arrows and dots are only shown when there are several slides */}
      {total > 1 && (
        <>
          <button className="slide-arrow prev" aria-label="Previous slide" onClick={() => go(-1)}>
            ‹
          </button>
          <button className="slide-arrow next" aria-label="Next slide" onClick={() => go(1)}>
            ›
          </button>
          <div className="slide-dots">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                aria-label={`Go to slide ${i + 1}`}
                className={i === current ? "is-active" : ""}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// Draws the media of one slide: image, YouTube video or MP4 video
function SlideMedia({ slide, active }) {
  if (slide.media_type === "video") {
    const id = youtubeId(slide.media);
    // Only load the YouTube player for the visible slide so it starts from the beginning
    if (id) {
      return active ? (
        <iframe
          className="slide-media"
          src={youtubeEmbed(id, true)}
          title={slide.title || "UGHE video"}
          allow="autoplay; encrypted-media"
        />
      ) : null;
    }
    return <video className="slide-media" src={slide.media} autoPlay muted loop playsInline />;
  }
  return <img className="slide-media" src={slide.media} alt={slide.title || "UGHE"} />;
}
