"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearToken, fetchHome, getToken, logout } from "@/lib/api";
import Header from "@/components/Header";
import Slideshow from "@/components/Slideshow";
import StatsSection from "@/components/StatsSection";
import FeatureSection from "@/components/FeatureSection";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

// Home page: everything shown here comes from Django Admin through the /api/home/ endpoint
export default function HomePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    // Not logged in, send the user to the login page
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchHome(token)
      .then(setData)
      .catch((err) => {
        // Token expired or invalid, log in again
        if (err.message === "UNAUTHORIZED") {
          clearToken();
          router.replace("/login");
        } else {
          setError(err.message);
        }
      });
  }, [router]);

  async function handleLogout() {
    await logout(getToken());
    clearToken();
    router.replace("/login");
  }

  if (error) return <p className="page-message">{error}</p>;
  if (!data) return <p className="page-message">Loading...</p>;

  // Pick the right component for each section type chosen in Django Admin
  function renderSection(section) {
    switch (section.section_type) {
      case "stats":
        return <StatsSection key={section.id} section={section} stats={data.stats} />;
      case "news":
        return <NewsSection key={section.id} section={section} news={data.news} />;
      case "video":
        return <VideoSection key={section.id} section={section} />;
      default:
        return <FeatureSection key={section.id} section={section} />;
    }
  }

  return (
    <>
      <Header
        site={data.site}
        menu={data.main_menu}
        topButtons={data.top_buttons}
        onLogout={handleLogout}
      />
      <main>
        <Slideshow slides={data.slides} />
        {data.sections.map(renderSection)}
      </main>
      <Footer site={data.site} links={data.footer_links} socials={data.social_links} />
    </>
  );
}
