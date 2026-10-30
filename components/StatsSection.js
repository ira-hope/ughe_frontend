// "Facts & Stats" section: title from the section, numbers from the Stat items
export default function StatsSection({ section, stats }) {
  return (
    <section className={`section bg-${section.background}`}>
      <div className="container">
        <h2 className="section-title center">{section.title}</h2>
        {section.body && <p className="section-intro center">{section.body}</p>}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat">
              <span className="stat-value">
                {stat.value}
                {stat.suffix && <sup>{stat.suffix}</sup>}
              </span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
