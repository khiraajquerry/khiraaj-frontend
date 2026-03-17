import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api'
import { useNavigate } from 'react-router-dom'
import './ShopByStyle.css'

const categories = [
  { label: 'Tote Bags',      value: 'tote-bags'      },
  { label: 'Hand Bags',      value: 'hand-bags'       },
  { label: '3 Piece Bags',   value: '3-piece-bags'    },
  { label: 'Crossbody Bags', value: 'crossbody-bags'  },
  { label: 'Clutch Bags',    value: 'clutch-bags'     },
]

function SBSCard({ product, onAddToCart, added }) {
  const navigate = useNavigate()
  const [imgIndex, setImgIndex] = useState(0)
  const intervalRef = useRef(null)
  const touchStartX = useRef(null)

  const allImages = [
    product.img,
    ...((product.gallery || []).map(g => g.image || g))
  ].filter(Boolean)

  const startSlideshow = () => {
    if (allImages.length <= 1) return
    intervalRef.current = setInterval(() => {
      setImgIndex(i => (i + 1) % allImages.length)
    }, 900)
  }

  const stopSlideshow = () => {
    setImgIndex(0)
    clearInterval(intervalRef.current)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) setImgIndex(i => (i + 1) % allImages.length)
    else if (diff < -40) setImgIndex(i => (i - 1 + allImages.length) % allImages.length)
    touchStartX.current = null
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div
      className="sbs-card"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {product.discount > 0 && (
        <div className="sbs-discount">-{product.discount}%</div>
      )}

      <div className="sbs-img-wrap">
        {allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className={`sbs-img-slide ${i === imgIndex ? 'active' : ''}`}
          />
        ))}

        {allImages.length > 1 && (
          <div className="sbs-img-dots">
            {allImages.map((_, i) => (
              <span key={i} className={`sbs-img-dot ${i === imgIndex ? 'active' : ''}`} />
            ))}
          </div>
        )}
      </div>

      <div className="sbs-info">
        <p className="sbs-name">{product.name}</p>
        <div className="sbs-prices">
          <span className="sbs-old">Rs.{product.oldPrice?.toLocaleString()}.00</span>
          <span className="sbs-new">Rs.{product.price?.toLocaleString()}.00</span>
        </div>
      </div>

      <button
        className={`sbs-cart-btn ${added ? 'added' : ''}`}
        onClick={(e) => { e.stopPropagation(); onAddToCart(e, product) }}
      >
        <span className="sbs-btn-content">
          {added ? 'ADDED ✓' : 'ADD TO CART'}
        </span>
      </button>
    </div>
  )
}

export default function ShopByStyle() {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState(categories[0].value)
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [added, setAdded]         = useState({})

  useEffect(() => {
    setLoading(true)
    setProducts([])
    getProducts(activeTab)
      .then(data => {
        const formatted = data.map(p => ({
          id: `api_${p.id}`, name: p.name, price: p.price,
          oldPrice: p.old_price, discount: p.discount, img: p.image,
          gallery: p.gallery || [],
        }))
        setProducts(formatted)
        setLoading(false)
      })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [activeTab])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product)
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <section className="sbs-section">
      <div className="sbs-heading">
        <span className="sbs-line" />
        <h2 className="sbs-title">Shop By Style</h2>
        <span className="sbs-line" />
      </div>

      <div className="sbs-tabs">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`sbs-tab ${activeTab === cat.value ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="sbs-grid">
          {[1,2,3,4].map(i => <div key={i} className="sbs-skeleton" />)}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="sbs-empty">
          <p>No products found in this category yet.</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="sbs-grid">
          {products.map(product => (
            <SBSCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              added={!!added[product.id]}
            />
          ))}
        </div>
      )}
    </section>
  )
}