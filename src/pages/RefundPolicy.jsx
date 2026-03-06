import './PolicyPage.css'

export default function RefundPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-container">

        <div className="policy-hero">
          <h1 className="policy-title">Return & Refund Policy</h1>
          <p className="policy-updated">Last updated: August 22, 2025</p>
        </div>

        <div className="policy-content">

          <div className="policy-section">
            <h2>Our Commitment</h2>
            <p>At KHIRAAJ, every product is thoroughly inspected before dispatch. We take full responsibility for any item that arrives damaged, defective, or incorrect.</p>
          </div>

          <div className="policy-section">
            <h2>Exchange Policy</h2>
            <ul>
              <li>All products are thoroughly checked prior to dispatching/shipping. Any item received damaged or faulty can be exchanged by contacting us via WhatsApp.</li>
              <li>If you are not satisfied with the Quality / Size / Material, you may exchange it with any available product on our store.</li>
              <li>In the event of an exchange, the difference in price and shipping cost is borne by the customer.</li>
              <li>Exchange requests must be made within <strong>7 days</strong> of delivery.</li>
              <li>Item must be unused, unwashed, with original tags and packaging intact.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Refund Policy</h2>
            <ul>
              <li>Refunds are only issued for items that are <strong>defective or incorrect</strong> and cannot be replaced.</li>
              <li>Sale and clearance items are <strong>exchange-only</strong> — no cash refunds.</li>
              <li>Refunds are processed within 5–7 business days via the original payment method.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Damaged or Incorrect Items</h2>
            <ul>
              <li>Contact us within <strong>48 hours</strong> of receiving your order.</li>
              <li>Please provide an unboxing photo or video as proof.</li>
              <li>We will arrange a pickup or guide you through the return process.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Non-Returnable Items</h2>
            <ul>
              <li>Items that have been used, washed, or damaged by the customer.</li>
              <li>Items without original tags or packaging.</li>
              <li>Sale / clearance / discounted items (exchange only).</li>
              <li>Items reported after 7 days of delivery.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>How to Request a Return / Exchange</h2>
            <ol>
              <li>WhatsApp us at <strong>+92 319 2345678</strong></li>
              <li>Share your <strong>order number</strong></li>
              <li>Share the <strong>reason</strong> and <strong>photos/video</strong> of the item</li>
              <li>Our team will respond within 24 hours with next steps</li>
            </ol>
          </div>

          <div className="policy-contact">
            <h2>Need Help?</h2>
            <p>Our support team is available <strong>Mon–Sat, 10am–7pm</strong></p>
            <div className="policy-contact-links">
              <a href="https://wa.me/923192345678" target="_blank" rel="noreferrer" className="policy-btn policy-btn--green">
                💬 WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
