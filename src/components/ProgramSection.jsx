export default function ProgramSection({ t }) {
  return (
    <section className="program">
      <div className="program__inner">
        <p className="program__title">{t.programTitle}</p>
        <div className="program__grid">
          {t.schedule.map((item, index) => (
            <div
              key={index}
              className={`program-card ${index === t.schedule.length - 1 ? 'program-card--highlight' : ''}`}
            >
              <span className="program-card__time">{item.time}</span>
              <p className="program-card__text">
                <span className="program-card__dot" />
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
