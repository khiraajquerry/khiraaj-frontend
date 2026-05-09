import { Link } from 'react-router-dom'
import './Footer.css'

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/khiraaj.official_?igsh=MWg4cWNyZWtteGFuOQ==',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@khiraaj4?_r=1&_t=ZS-96DgXQGJ1hn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">KHIRAAJ</span>
          <span className="footer-tagline">CARRY ELEGANCE EVERYDAY</span>
          <p className="footer-desc">Pakistan's finest bag store with premium quality collections crafted for the modern woman.</p>
          <div className="footer-socials">
            {socials.map(s => (
              <a key={s.name} href={s.href} title={s.name} className="social-icon" target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/bags">All Bags</Link></li>
            <li><Link to="/new-arrival">New Arrivals</Link></li>
            <li><Link to="/fragrances">Fragrance</Link></li>
            <li><Link to="/bags">Sale</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4>Help & Info</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/order-tracking">Order Tracking</Link></li>
            <li><Link to="/refund-policy">Returns & Refund Policy</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Khiraaj.pk. All rights reserved.</p>
        <p>Cash on Delivery · Free Delivery </p>
      </div>
    </footer>
  )
}