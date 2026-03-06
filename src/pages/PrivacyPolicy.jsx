import './PolicyPage.css'

export default function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-container">

        <div className="policy-hero">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-updated">Last updated: August 22, 2025</p>
        </div>

        <div className="policy-content">

          <div className="policy-section">
            <h2>Introduction</h2>
            <p>KHIRAAJ ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit khiraaj.pk or place an order with us.</p>
          </div>

          <div className="policy-section">
            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Personal Information:</strong> Name, phone number, email address, and delivery address when you place an order.</li>
              <li><strong>Payment Information:</strong> We do not store any payment details. Cash on Delivery orders require no financial data.</li>
              <li><strong>Usage Data:</strong> Browser type, pages visited, and time spent on our website (via analytics tools).</li>
              <li><strong>Communication Data:</strong> Messages sent to us via WhatsApp or email.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To process and deliver your orders.</li>
              <li>To send order confirmations and delivery updates via SMS/WhatsApp/email.</li>
              <li>To respond to your queries and provide customer support.</li>
              <li>To send promotional offers and discount codes (only if you opt in).</li>
              <li>To improve our website and customer experience.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Sharing of Information</h2>
            <ul>
              <li>We do <strong>not</strong> sell, trade, or rent your personal information to third parties.</li>
              <li>We share your delivery address and phone number with our courier partners solely for order fulfillment.</li>
              <li>We may share data with service providers (e.g., email/SMS platforms) who assist in operating our website.</li>
              <li>We may disclose information if required by law or government authority.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Data Security</h2>
            <ul>
              <li>We implement appropriate security measures to protect your personal data.</li>
              <li>Our website uses HTTPS encryption to secure data transmission.</li>
              <li>Access to your personal data is restricted to authorized personnel only.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Cookies</h2>
            <ul>
              <li>We use cookies to improve your browsing experience and remember your cart items.</li>
              <li>You can disable cookies in your browser settings, though some features may not function properly.</li>
              <li>We do not use cookies to track you across other websites.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Your Rights</h2>
            <ul>
              <li>You have the right to access, update, or delete your personal information at any time.</li>
              <li>You can opt out of marketing emails/messages by contacting us.</li>
              <li>You may request a copy of the data we hold about you.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.</p>
          </div>

          <div className="policy-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. Continued use of our website constitutes acceptance of the updated policy.</p>
          </div>

          <div className="policy-contact">
            <h2>Questions?</h2>
            <p>If you have any questions about this Privacy Policy, contact us:</p>
            <div className="policy-contact-links">
              <a href="https://wa.me/923192345678" target="_blank" rel="noreferrer" className="policy-btn policy-btn--green">💬 WhatsApp</a>
              <a href="mailto:support@khiraaj.pk" className="policy-btn policy-btn--black">✉ Email Us</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
