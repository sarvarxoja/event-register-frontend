export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__org">{t.footerOrg}</span>
        <a className="footer__email" href={`mailto:${t.footerEmail}`}>
          ✉ {t.footerEmail}
        </a>
      </div>
    </footer>
  )
}
