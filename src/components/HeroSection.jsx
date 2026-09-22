function CalendarIcon() {
  return (
    <svg className="info-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="info-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="info-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function HeroSection({ t }) {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__image">
          <img src="/Gemini_Generated_Image_emem3jemem3jemem.jfif" alt="Forum" />
        </div>

        <div className="hero__content">
          <p className="hero__greeting">{t.greeting}</p>
          <h1 className="hero__title">{t.title}</h1>
          <p className="hero__desc">{t.description}</p>

          <div className="hero__badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6.5" stroke="#22c55e" strokeWidth="1.2"/>
              <path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.note}
          </div>

          <div className="hero__info">
            <div className="info-card">
              <CalendarIcon />
              <span className="info-card__value">{t.date}</span>
            </div>
            <div className="info-card">
              <LocationIcon />
              <span className="info-card__value">{t.location}</span>
            </div>
            <div className="info-card">
              <ClockIcon />
              <span className="info-card__value">{t.time}</span>
            </div>
          </div>

          <button className="hero__btn" onClick={scrollToForm}>
            {t.registerBtn} →
          </button>
        </div>
      </div>
    </section>
  )
}