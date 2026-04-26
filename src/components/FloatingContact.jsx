import './FloatingContact.css'

const contacts = [
  {
    id: 'phone',
    label: '+49 9542 7736-0',
    sub: 'Jetzt anrufen',
    href: 'tel:+4995427736060',
    color: '#13A538',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.5-1.5a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'info@bruchmann-gmbh.de',
    sub: 'E-Mail schreiben',
    href: 'mailto:info@bruchmann-gmbh.de',
    color: '#0057b8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Am Steinernen Kreuz 8',
    sub: '96110 Scheßlitz',
    href: 'https://maps.google.com/?q=Am+Steinernen+Kreuz+8,+96110+Sche%C3%9Flitz,+Germany',
    color: '#e53b3b',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Klaus Bruchmann GmbH',
    sub: 'Auf Facebook folgen',
    href: 'https://www.facebook.com/profile.php?id=61584717095028',
    color: '#1877f2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
]

export default function FloatingContact() {
  return (
    <div className="floating-contact">
      {contacts.map((c, i) => (
        <a
          key={c.id}
          className="float-item"
          href={c.href}
          target={c.href.startsWith('http') ? '_blank' : undefined}
          rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
          style={{ '--item-color': c.color, animationDelay: `${i * 0.08}s` }}
          aria-label={c.sub}
        >
          {/* Label slides out to the LEFT on hover */}
          <div className="float-label">
            <span className="float-label-main">{c.label}</span>
            <span className="float-label-sub">{c.sub}</span>
          </div>

          {/* Icon stays on the RIGHT edge */}
          <div className="float-icon">{c.icon}</div>
        </a>
      ))}
    </div>
  )
}
