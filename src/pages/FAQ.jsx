import { useState, useEffect } from 'react'
import { ShoppingBag, Truck, RefreshCw, Package, Shield, Tag, Headphones } from 'lucide-react'
import { getFAQs } from '../api'
import './FAQ.css'

const LABELS = {
  orders:   'Orders & Payments',
  shipping: 'Shipping & Delivery',
  returns:  'Returns & Exchanges',
  product:  'Product & Sizing',
  care:     'Care & Warranty',
  payments: 'Payments, Discounts & Gifts',
  support:  'Support',
}

const ICONS = {
  orders:   <ShoppingBag size={15} />,
  shipping: <Truck size={15} />,
  returns:  <RefreshCw size={15} />,
  product:  <Package size={15} />,
  care:     <Shield size={15} />,
  payments: <Tag size={15} />,
  support:  <Headphones size={15} />,
}

const hardcodedFAQs = [
  { id:1,  category:'orders',   question:'Do you offer Cash on Delivery (COD)?',              answer:'Yes, COD is available across Pakistan. You can also prepay via bank transfer/Easypaisa/JazzCash.' },
  { id:2,  category:'orders',   question:'How do I place an order?',                           answer:'Choose your product → Add to Cart → Checkout → enter address & phone → choose COD → place order.' },
  { id:3,  category:'orders',   question:'Can I change/cancel my order?',                      answer:'Message us on WhatsApp within 2 hours of placing the order. Dispatched orders cannot be changed.' },
  { id:4,  category:'orders',   question:'Can I open the parcel before paying?',               answer:"Couriers don't allow open parcel before payment. You can inspect after payment; if anything's wrong, we'll fix it." },
  { id:5,  category:'shipping', question:'How long does delivery take?',                       answer:"Most cities: 2–7 working days. Remote areas: 4–8 working days. You'll get an SMS/WhatsApp with tracking once dispatched." },
  { id:6,  category:'shipping', question:'What are the delivery charges?',                     answer:'Shown at checkout. Free delivery above a certain order amount.' },
  { id:7,  category:'shipping', question:'Do you ship internationally?',                       answer:"Currently Pakistan only. For overseas requests, DM us and we'll advise." },
  { id:8,  category:'returns',  question:"What's your return/exchange policy?",                answer:'Exchange within 7 days of delivery if unused, with tags & original packaging. Wrong/defective items are replaced or refunded.' },
  { id:9,  category:'returns',  question:'How do I request an exchange/return?',               answer:"WhatsApp us with your order number + reason + product photos. We'll share the pickup or drop-off method." },
  { id:10, category:'returns',  question:'Item arrived damaged or incorrect — what now?',      answer:"Contact us within 48 hours with an unboxing photo/video. We'll prioritize a replacement or refund." },
  { id:11, category:'returns',  question:'Are sale items returnable?',                         answer:'Sale/clearance items are exchange-only (no refunds), unless the item is defective.' },
  { id:12, category:'product',  question:'Are your bags genuine leather?',                     answer:'Material is listed on each product page. Many styles use premium vegan leather (PU) unless stated otherwise.' },
  { id:13, category:'product',  question:'Will this bag fit a laptop/tablet?',                 answer:'Check the dimensions on the product page. Compare with your device size (allow ~1–2 cm margin).' },
  { id:14, category:'product',  question:'Colors look slightly different — why?',              answer:'Lighting and screen settings can change how colors appear. We try to match real colors as closely as possible.' },
  { id:15, category:'care',     question:'How do I care for my bag?',                          answer:'Wipe with a soft damp cloth, avoid harsh cleaners/perfume spill, store in a dust bag, and keep away from direct heat/sun.' },
  { id:16, category:'care',     question:'Do you offer warranty?',                             answer:'Manufacturing defects reported within 7 days are eligible for repair/replacement. Wear & tear is not covered.' },
  { id:17, category:'payments', question:'Do you offer discounts or bundles?',                 answer:'Yes — look for Bundle & Save offers and seasonal codes. Only one discount code can be applied per order.' },
  { id:18, category:'payments', question:'An item is sold out — will it restock?',             answer:"Often! DM us on WhatsApp and we'll alert you when it's back." },
  { id:19, category:'payments', question:'Do you take custom or bulk orders?',                 answer:'For corporate/bulk gifting or reseller inquiries, WhatsApp us or email support@khiraaj.pk.' },
  { id:20, category:'support',  question:'How can I contact you?',                             answer:'WhatsApp: +923192345678 | Email: support@khiraaj.pk | Hours: Mon–Sat, 10am–7pm' },
]

export default function FAQ() {
  const [faqs, setFaqs]           = useState([])
  const [activeTab, setActiveTab] = useState('orders')
  const [openId, setOpenId]       = useState(null)
  const [search, setSearch]       = useState('')

  useEffect(() => {
    getFAQs()
      .then(data => setFaqs(data.length ? data : hardcodedFAQs))
      .catch(() => setFaqs(hardcodedFAQs))
  }, [])

  const categories = [...new Set(faqs.map(f => f.category))]

  const filtered = faqs.filter(f => {
    if (search) {
      return (
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase())
      )
    }
    return f.category === activeTab
  })

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1 className="faq-title">FAQs</h1>
        <p className="faq-subtitle">Everything you need to know</p>
        <div className="faq-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="faq-search"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="faq-search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
      </div>

      <div className="faq-layout">
        {!search && (
          <div className="faq-sidebar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`faq-tab ${activeTab === cat ? 'faq-tab--active' : ''}`}
                onClick={() => { setActiveTab(cat); setOpenId(null) }}
              >
                <span className="faq-tab-icon">{ICONS[cat]}</span>
                <span className="faq-labels">{LABELS[cat] || cat}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`faq-list ${search ? 'faq-list--full' : ''}`}>
          {search && <p className="faq-search-results">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</p>}

          {filtered.length === 0 ? (
            <div className="faq-empty">
              <p>No questions found.</p>
              <button onClick={() => setSearch('')}>Clear Search</button>
            </div>
          ) : filtered.map(faq => (
            <div
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'faq-item--open' : ''}`}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-chevron">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
              {openId === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="faq-contact">
        <p>Still have questions?</p>
        <a href="https://wa.me/923192345678" target="_blank" rel="noreferrer" className="faq-contact-btn">
          Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}