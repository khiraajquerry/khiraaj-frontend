import { useState } from 'react'
import { trackOrder } from '../api'
import './OrderTracking.css'

const STATUS_STEPS = ['pending', 'confirmed', 'shipped', 'delivered']

const STATUS_LABELS = {
  pending:   'Order Placed',
  confirmed: 'Confirmed',
  shipped:   'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const STATUS_DESC = {
  pending:   'Your order has been received and is being processed.',
  confirmed: 'Your order has been confirmed and is being prepared.',
  shipped:   'Your order is on the way! You will receive an SMS with tracking details.',
  delivered: 'Your order has been delivered. Enjoy your KHIRAAJ bag! 🛍️',
  cancelled: 'Your order has been cancelled. Contact us for more info.',
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [phone,   setPhone]   = useState('')
  const [order,   setOrder]   = useState(null)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!orderId.trim() || !phone.trim()) {
      setError('Please enter both Order ID and phone number.')
      return
    }
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res = await trackOrder(orderId.trim(), phone.trim())
      if (res.error) {
        setError(res.error)
      } else {
        setOrder(res)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1

  return (
    <div className="track-page">
      <div className="track-hero">
        <h1 className="track-title">ORDER TRACKING</h1>
        <p className="track-subtitle">Enter your order details to track your delivery</p>
      </div>

      <div className="track-container">

        {/* Form */}
        <div className="track-form">
          <div className="track-input-group">
            <label>Order ID</label>
            <input
              type="text"
              placeholder="e.g. 1234"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
          </div>
          <div className="track-input-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 03001234567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
          </div>
          <button className="track-btn" onClick={handleTrack} disabled={loading}>
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
          {error && <p className="track-error">{error}</p>}
        </div>

        {/* Result */}
        {order && (
          <div className="track-result">

            {/* Order Info */}
            <div className="track-info-box">
              <div className="track-info-row">
                <span>Order ID</span>
                <strong>#{order.order_id}</strong>
              </div>
              <div className="track-info-row">
                <span>Customer</span>
                <strong>{order.name}</strong>
              </div>
              <div className="track-info-row">
                <span>City</span>
                <strong>{order.city}</strong>
              </div>
              <div className="track-info-row">
                <span>Order Date</span>
                <strong>{order.created_at}</strong>
              </div>
              <div className="track-info-row">
                <span>Total</span>
                <strong>Rs. {order.total?.toLocaleString()}</strong>
              </div>
            </div>

            {/* Status Steps */}
            {order.status !== 'cancelled' ? (
              <div className="track-steps">
                {STATUS_STEPS.map((step, i) => (
                  <div key={step} className={`track-step ${i <= currentStep ? 'track-step--done' : ''} ${i === currentStep ? 'track-step--active' : ''}`}>
                    <div className="track-step-circle">
                      {i < currentStep ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`track-step-line ${i < currentStep ? 'track-step-line--done' : ''}`} />
                    )}
                    <p className="track-step-label">{STATUS_LABELS[step]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="track-cancelled">
                ❌ Order Cancelled
              </div>
            )}

            {/* Status Message */}
            <div className="track-status-msg">
              <p>{STATUS_DESC[order.status]}</p>
            </div>

            {/* Items */}
            <div className="track-items">
              <h3>Order Items</h3>
              {order.items?.map((item, i) => (
                <div key={i} className="track-item">
                  <span>{item.name}</span>
                  <span>x{item.qty}</span>
                  <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Help */}
        <div className="track-help">
          <p>Need help with your order?</p>
          <a href="https://wa.me/923192345678" target="_blank" rel="noreferrer" className="track-wa-btn">
            💬 Chat on WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}
