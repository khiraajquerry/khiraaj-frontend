import './PolicyPage.css'

export default function TermsConditions() {
  return (
    <div className="policy-page">
      <div className="policy-container">

        <div className="policy-hero">
          <h1 className="policy-title">Terms & Conditions</h1>
          <p className="policy-updated">Last updated: August 22, 2025</p>
        </div>

        <div className="policy-content">

          <div className="policy-section">
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using the KHIRAAJ website (khiraaj.pk), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.</p>
          </div>

          <div className="policy-section">
            <h2>Products & Pricing</h2>
            <ul>
              <li>All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes.</li>
              <li>We reserve the right to change prices at any time without prior notice.</li>
              <li>Product images are for illustration purposes only; actual colors may slightly vary due to screen settings.</li>
              <li>We reserve the right to limit quantities or refuse orders at our discretion.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Orders & Payments</h2>
            <ul>
              <li>Orders are confirmed only after verification via phone/WhatsApp.</li>
              <li>Cash on Delivery (COD) is the primary payment method. Prepayment options are also available.</li>
              <li>We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspected fraud.</li>
              <li>In case of cancellation, any prepaid amount will be refunded within 5–7 business days.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Shipping & Delivery</h2>
            <ul>
              <li>Delivery times are estimates and may vary due to courier delays or force majeure events.</li>
              <li>KHIRAAJ is not responsible for delays caused by courier companies or incorrect addresses provided by the customer.</li>
              <li>Delivery charges are shown at checkout and may vary by location.</li>
              <li>Risk of loss and title for items pass to you upon delivery.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Returns & Exchanges</h2>
            <p>Please refer to our <a href="/refund-policy" style={{color:'var(--brown)'}}>Return & Refund Policy</a> for detailed information on returns and exchanges.</p>
          </div>

          <div className="policy-section">
            <h2>Intellectual Property</h2>
            <ul>
              <li>All content on this website — including logos, images, text, and designs — is the property of KHIRAAJ.</li>
              <li>You may not reproduce, distribute, or use any content without our written permission.</li>
              <li>Unauthorized use of our brand or content may result in legal action.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>User Conduct</h2>
            <ul>
              <li>You agree not to use our website for any unlawful or fraudulent purpose.</li>
              <li>You must not submit false or misleading information when placing an order.</li>
              <li>We reserve the right to block access to users who violate these terms.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Limitation of Liability</h2>
            <ul>
              <li>KHIRAAJ shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.</li>
              <li>Our maximum liability shall not exceed the amount paid for the specific order in question.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Discount Codes & Promotions</h2>
            <ul>
              <li>Only one discount code may be applied per order.</li>
              <li>Discount codes cannot be combined with other offers unless stated.</li>
              <li>We reserve the right to withdraw or modify promotions at any time.</li>
              <li>Misuse of discount codes may result in order cancellation.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Governing Law</h2>
            <p>These Terms & Conditions are governed by the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Pakistan.</p>
          </div>

          <div className="policy-section">
            <h2>Changes to Terms</h2>
            <p>We reserve the right to update these Terms & Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the revised terms.</p>
          </div>

          <div className="policy-contact">
            <h2>Contact Us</h2>
            <p>For any questions regarding these Terms & Conditions:</p>
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
