import { useState, useEffect, useRef } from 'react'
import './WhatsAppButton.css'

const PHONE = '923496287450'

const botMessages = [
  { id: 1, text: "Hi! Welcome to KHIRAAJ — Carry Elegance Everyday!", delay: 0 },
  { id: 2, text: "We have premium bags starting from Rs.1,499 🛍️ with free Cash on Delivery all across Pakistan!", delay: 1000 },
  { id: 3, text: "Would you like to explore our collection or need help with an order? 😊", delay: 2000 },
]

// ✅ cartOpen prop — jahan bhi WhatsAppButton use ho wahan se pass karo
export default function WhatsAppButton({ cartOpen = false }) {
  const [open, setOpen]         = useState(false)
  const [visible, setVisible]   = useState([])
  const [inputVal, setInputVal] = useState('')
  const [userMsgs, setUserMsgs] = useState([])
  const [replied, setReplied]   = useState(false)
  const [typing, setTyping]     = useState(false)
  const bodyRef                 = useRef(null)

  useEffect(() => {
    if (!open) return
    setVisible([])
    setUserMsgs([])
    setReplied(false)

    botMessages.forEach((msg) => {
      setTimeout(() => {
        setTyping(true)
        setTimeout(() => {
          setTyping(false)
          setVisible(prev => [...prev, msg.id])
        }, 700)
      }, msg.delay)
    })
  }, [open])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [visible, userMsgs, typing])

  const handleSend = () => {
    if (!inputVal.trim()) return
    const msg = inputVal.trim()
    setUserMsgs(prev => [...prev, msg])
    setInputVal('')

    if (!replied) {
      setReplied(true)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setUserMsgs(prev => [...prev, '__bot__Great! Let me connect you to WhatsApp where our team will assist you right away 💬'])
        setTimeout(() => {
          const encoded = encodeURIComponent(msg)
          window.open(`https://wa.me/${PHONE}?text=${encoded}`, '_blank')
        }, 1200)
      }, 1000)
    }
  }

  const handleQuick = (text) => {
    setInputVal(text)
    setTimeout(() => handleSend(), 100)
  }

  return (
    // ✅ cartOpen true ho to 'cart-open' class lag jaye — CSS shift trigger
    <div className={`wa-wrap ${cartOpen ? 'cart-open' : ''}`}>

      {/* Popup */}
      <div className={`wa-popup ${open ? 'wa-popup--open' : ''}`}>

        {/* Header */}
        <div className="wa-header">
          <div className="wa-header-avatar">K</div>
          <div className="wa-header-info">
            <span className="wa-header-name">KHIRAAJ</span>
            <span className="wa-header-status">
              <span className="wa-dot" /> We're online
            </span>
          </div>
          <button className="wa-x" onClick={() => setOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Chat Body */}
        <div className="wa-body" ref={bodyRef}>
          {botMessages.map((msg) => (
            visible.includes(msg.id) && (
              <div key={msg.id} className="wa-msg wa-msg--bot wa-msg--in">
                <div className="wa-bubble wa-bubble--bot">{msg.text}</div>
              </div>
            )
          ))}

          {typing && (
            <div className="wa-msg wa-msg--bot">
              <div className="wa-bubble wa-bubble--bot wa-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {visible.length === botMessages.length && !replied && (
            <div className="wa-quick-replies">
              <button onClick={() => handleQuick("I want to explore your bag collection 🛍️")}>Browse Collection</button>
              <button onClick={() => handleQuick("I need help with my order")}>Order Help</button>
              <button onClick={() => handleQuick("Tell me about your prices and deals")}>Prices & Deals</button>
            </div>
          )}

          {userMsgs.map((msg, i) => (
            msg.startsWith('__bot__') ? (
              <div key={i} className="wa-msg wa-msg--bot wa-msg--in">
                <div className="wa-bubble wa-bubble--bot">{msg.replace('__bot__', '')}</div>
              </div>
            ) : (
              <div key={i} className="wa-msg wa-msg--user wa-msg--in">
                <div className="wa-bubble wa-bubble--user">{msg}</div>
              </div>
            )
          ))}
        </div>

        {/* Input */}
        <div className="wa-input-row">
          <input
            className="wa-input"
            placeholder="Type a message..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="wa-send" onClick={handleSend}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <a
          href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hi KHIRAAJ! I want to know more about your bags..")}`}
          target="_blank"
          rel="noreferrer"
          className="wa-footer-link"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Start Chat on WhatsApp
        </a>
      </div>

      {/* FAB */}
      <button className={`wa-fab ${open ? 'wa-fab--open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className={`wa-fab-icon ${open ? 'wa-fab-icon--hide' : ''}`}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
        <span className={`wa-fab-icon ${!open ? 'wa-fab-icon--hide' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </span>
        {!open && <span className="wa-ping" />}
      </button>
    </div>
  )
}