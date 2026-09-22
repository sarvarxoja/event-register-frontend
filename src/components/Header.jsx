export default function Header({ lang, setLang, t }) {
  const backUrl = lang === 'ru' ? 'https://pnk.uz/ru/' : 'https://pnk.uz/uz/'

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href={backUrl}>
          <img
            src="/NEW-logo2-UZB.png.webp"
            alt="Soliq Maslahatchilar Palatasi"
            className="header__logo-img"
          />
        </a>

        <nav className="header__nav">
          <button
            className={`lang-btn ${lang === 'uz' ? 'lang-btn--active' : ''}`}
            onClick={() => setLang('uz')}
          >
            UZ
          </button>
          <button
            className={`lang-btn ${lang === 'ru' ? 'lang-btn--active' : ''}`}
            onClick={() => setLang('ru')}
          >
            RU
          </button>
          <a className="header__back" href={backUrl}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8 2L4 6.5L8 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.backLabel}
          </a>
        </nav>
      </div>
    </header>
  )
}
