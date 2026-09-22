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
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [attendForum, setAttendForum] = useState(null)
  const [attendDinner, setAttendDinner] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const phoneError = phoneTouched && phone.length > 0 && !isValidUzPhone(phone)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPhoneTouched(true)
    if (!name.trim() || !isValidUzPhone(phone) || !attendForum) return

    setLoading(true)
    setError(null)

    try {
      await axios.post('http://localhost:3000/api/register', {
        full_name: name.trim(),
        phone: phone.trim(),
        attend_forum: attendForum === 'yes',
        attend_dinner: attendDinner === 'yes',
      })
      setSubmitted(true)
    } catch {
      setError(t.errorMsg ?? "Xatolik yuz berdi. Qayta urinib ko'ring.")
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
                className="form-input"
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.phoneLabel}</label>
              <input
                className={`form-input ${phoneError ? 'form-input--error' : ''}`}
                type="tel"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setPhoneTouched(true)
                }}
                onBlur={() => setPhoneTouched(true)}
              />
              {phoneError && (
                <span className="form-input-error-msg">{t.phoneError}</span>
              )}
            </div>

            <div className="form-group">
              <p className="form-question">{t.q1}</p>
              <div className="form-options">
                <button
                  type="button"
                  className={`option-btn ${attendForum === 'yes' ? 'option-btn--yes-active' : ''}`}
                  onClick={() => setAttendForum('yes')}
                >
                  ✓ {t.yes}
                </button>
                <button
                  type="button"
                  className={`option-btn ${attendForum === 'no' ? 'option-btn--no-active' : ''}`}
                  onClick={() => { setAttendForum('no'); setAttendDinner(null) }}
                >
                  ✕ {t.no1}
                </button>
              </div>
            </div>

            {attendForum === 'yes' && (
              <div className="form-group">
                <p className="form-question form-question--highlight">{t.q2}</p>
                <div className="form-options">
                  <button
                    type="button"
                    className={`option-btn ${attendDinner === 'yes' ? 'option-btn--yes-active' : ''}`}
                    onClick={() => setAttendDinner('yes')}
                  >
                    ✓ {t.yes}
                  </button>
                  <button
                    type="button"
                    className={`option-btn ${attendDinner === 'no' ? 'option-btn--no-active' : ''}`}
                    onClick={() => setAttendDinner('no')}
                  >
                    ✕ {t.no2}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="form-input-error-msg" style={{ marginBottom: 12 }}>{error}</p>}

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
