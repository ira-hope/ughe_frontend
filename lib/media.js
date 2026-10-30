// Get the video id from a YouTube link (watch?v=, youtu.be/ or /embed/), or null
export function youtubeId(url = "") {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Build the YouTube embed link; background mode = autoplay, muted, looping, no controls
export function youtubeEmbed(id, background = false) {
  if (!background) return `https://www.youtube.com/embed/${id}`;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0`;
}

// Turn "2026-09-30" into "September 30, 2026"
export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
