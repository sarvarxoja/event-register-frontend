import { useState } from 'react'
import axios from 'axios'

function isValidUzPhone(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('998')) return true
  if (digits.length === 9) return true
  return false
}

export default function RegistrationForm({ t }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attendForum, setAttendForum] = useState(null)
  const [attendDinner, setAttendDinner] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [touched, setTouched] = useState({ name: false, phone: false, forum: false, dinner: false })

  const errors = {
    name: touched.name && !name.trim(),
    phone: touched.phone && !isValidUzPhone(phone),
    forum: touched.forum && !attendForum,
    dinner: touched.dinner && attendForum === 'yes' && !attendDinner,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, phone: true, forum: true, dinner: true })

    const hasError =
      !name.trim() ||
      !isValidUzPhone(phone) ||
      !attendForum ||
      (attendForum === 'yes' && !attendDinner)

    if (hasError) return

    setLoading(true)
    setServerError(null)

    try {
      await axios.post('https://localhost:3000/api/register', {
        full_name: name.trim(),
        phone: phone.trim(),
        attend_forum: attendForum === 'yes',
        attend_dinner: attendDinner === 'yes',
      })
      setSubmitted(true)
    } catch {
      setServerError(t.errorMsg ?? "Xatolik yuz berdi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-section" id="registration-form">
      <div className="form-card">
        <p className="form-card__title">{t.formTitle}</p>

        {submitted ? (
          <p className="success-msg">✓ {t.successMsg}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t.nameLabel}</label>
              <input
                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => { setName(e.target.value); setTouched(p => ({ ...p, name: true })) }}
                onBlur={() => setTouched(p => ({ ...p, name: true }))}
              />
              {errors.name && <span className="form-input-error-msg">{t.nameError ?? "Ism majburiy"}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">{t.phoneLabel}</label>
              <input
                className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                type="tel"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setTouched(p => ({ ...p, phone: true })) }}
                onBlur={() => setTouched(p => ({ ...p, phone: true }))}
              />
              {errors.phone && <span className="form-input-error-msg">{t.phoneError}</span>}
            </div>

            <div className="form-group">
              <p className={`form-question ${errors.forum ? 'form-question--error' : ''}`}>{t.q1}</p>
              <div className="form-options">
                <button
                  type="button"
                  className={`option-btn ${attendForum === 'yes' ? 'option-btn--yes-active' : ''}`}
                  onClick={() => { setAttendForum('yes'); setTouched(p => ({ ...p, forum: true })) }}
                >
                  ✓ {t.yes}
                </button>
                <button
                  type="button"
                  className={`option-btn ${attendForum === 'no' ? 'option-btn--no-active' : ''}`}
                  onClick={() => { setAttendForum('no'); setAttendDinner(null); setTouched(p => ({ ...p, forum: true })) }}
                >
                  ✕ {t.no1}
                </button>
              </div>
              {errors.forum && <span className="form-input-error-msg">{t.forumError ?? "Javob tanlang"}</span>}
            </div>

            {attendForum === 'yes' && (
              <div className="form-group">
                <p className="form-question form-question--highlight">{t.q2}</p>
                <div className="form-options">
                  <button
                    type="button"
                    className={`option-btn ${attendDinner === 'yes' ? 'option-btn--yes-active' : ''}`}
                    onClick={() => { setAttendDinner('yes'); setTouched(p => ({ ...p, dinner: true })) }}
                  >
                    ✓ {t.yes}
                  </button>
                  <button
                    type="button"
                    className={`option-btn ${attendDinner === 'no' ? 'option-btn--no-active' : ''}`}
                    onClick={() => { setAttendDinner('no'); setTouched(p => ({ ...p, dinner: true })) }}
                  >
                    ✕ {t.no2}
                  </button>
                </div>
                {errors.dinner && <span className="form-input-error-msg">{t.dinnerError ?? "Javob tanlang"}</span>}
              </div>
            )}

            {serverError && <p className="form-input-error-msg" style={{ marginBottom: 12 }}>{serverError}</p>}

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? '...' : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.submit}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
