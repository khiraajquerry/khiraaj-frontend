import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import AnnouncementBar from '../components/AnnouncementBar'
import { getProducts } from '../api'
import './Bags.css'
import { useNavigate } from 'react-router-dom'

function BagCard({ product, onAddToCart, added }) {
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
      className={`bag-card ${!product.inStock ? 'out-of-stock' : ''}`}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {product.discount > 0 && <div className="bag-discount">-{product.discount}%</div>}
      {!product.inStock && <div className="bag-oos-badge">Out of Stock</div>}

      <div className="bag-img-wrap">
        {allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className={`bag-img-slide ${i === imgIndex ? 'active' : ''}`}
          />
        ))}
        {allImages.length > 1 && (
          <div className="bag-img-dots">
            {allImages.map((_, i) => (
              <span key={i} className={`bag-img-dot ${i === imgIndex ? 'active' : ''}`} />
            ))}
          </div>
        )}
      </div>

      <div className="bag-info">
        <p className="bag-name">{product.name}</p>
        {product.color && (
          <div className="bag-color-wrap">
            <span className="bag-color-dot" style={{ background: product.colorHex }} />
            <span className="bag-color-name">{product.color}</span>
          </div>
        )}
        <div className="bag-prices">
          <span className="bag-old">Rs.{product.oldPrice?.toLocaleString()}.00</span>
          <span className="bag-new">Rs.{product.price?.toLocaleString()}.00</span>
        </div>
      </div>

      <button
        className={`bag-cart-btn ${added ? 'added' : ''} ${!product.inStock ? 'disabled' : ''}`}
        onClick={(e) => { e.stopPropagation(); onAddToCart(e, product) }}
        disabled={!product.inStock}
      >
        <span className="bag-btn-content">
          {!product.inStock ? 'OUT OF STOCK' : added ? 'ADDED ✓' : 'ADD TO CART'}
        </span>
      </button>
    </div>
  )
}

export default function Bags() {
  const { addToCart } = useCart()
  const [apiProducts, setApiProducts] = useState([])
  const [added, setAdded]             = useState({})
  const [filterOpen, setFilterOpen]   = useState(false)
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false })
  const [priceRange, setPriceRange]   = useState([0, 5000])
  const [activeColor, setActiveColor] = useState(null)
  const [colorDropOpen, setColorDropOpen] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    getProducts()
      .then(data => {
        const formatted = data.filter(p => p.category !== 'accessories').map(p => ({
          id: `api_${p.id}`, name: p.name, price: p.price,
          oldPrice: p.old_price, discount: p.discount, img: p.image,
          color: p.color || '', colorHex: p.color_hex || '#888',
          inStock: p.in_stock, gallery: p.gallery || [],
        }))
        setApiProducts(formatted)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const allProducts = apiProducts
  const colors = [...new Map(allProducts.filter(p => p.colorHex).map(p => [p.color, { name: p.color, hex: p.colorHex }])).values()]

  const filtered = allProducts.filter(p => {
    if (availability.inStock || availability.outOfStock) {
      if (availability.inStock && availability.outOfStock) {}
      else if (availability.inStock && !p.inStock) return false
      else if (availability.outOfStock && p.inStock) return false
    }
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false
    if (activeColor && p.color !== activeColor) return false
    return true
  })

  const inStockCount  = allProducts.filter(p => p.inStock).length
  const outStockCount = allProducts.filter(p => !p.inStock).length

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })
    setAdded(p => ({ ...p, [product.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [product.id]: false })), 1500)
  }

  return (
    <div className="bags-page">
      <AnnouncementBar />

      <div className="bags-hero">
        <h1 className="bags-title">ALL BAGS</h1>
        <p className="bags-subtitle">Discover our complete collection</p>
      </div>

      <div className="bags-toolbar" ref={filterRef}>
        <div className="toolbar-left">
          <button className={`filter-btn ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            FILTER
            {(availability.inStock || availability.outOfStock || activeColor || priceRange[1] < 5000) && <span className="filter-dot" />}
          </button>

          {(availability.inStock || availability.outOfStock || activeColor || priceRange[1] < 5000) && (
            <button className="reset-btn" onClick={() => { setAvailability({ inStock: false, outOfStock: false }); setPriceRange([0, 5000]); setActiveColor(null) }}>
              ✕ RESET
            </button>
          )}

          <div className={`filter-drawer ${filterOpen ? 'open' : ''}`}>
            <div className="filter-drawer-inner">
              <div className="filter-section">
                <div className="filter-section-title">
                  AVAILABILITY
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
                </div>
                <label className="filter-check">
                  <input type="checkbox" checked={availability.inStock} onChange={e => setAvailability(a => ({ ...a, inStock: e.target.checked }))} />
                  <span>In stock ({inStockCount})</span>
                </label>
                <label className="filter-check">
                  <input type="checkbox" checked={availability.outOfStock} onChange={e => setAvailability(a => ({ ...a, outOfStock: e.target.checked }))} />
                  <span>Out of stock ({outStockCount})</span>
                </label>
              </div>
              <div className="filter-divider" />
              <div className="filter-section">
                <div className="filter-section-title">
                  PRICE
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
                </div>
                <div className="price-labels">
                  <span>Rs.{priceRange[0].toLocaleString()}</span>
                  <span>Rs.{priceRange[1].toLocaleString()}</span>
                </div>
                <input type="range" min="0" max="5000" step="100" value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])} className="price-slider" />
              </div>
              <div className="filter-divider" />
              <button className="filter-apply" onClick={() => setFilterOpen(false)}>APPLY</button>
            </div>
          </div>
        </div>

        <div className="color-box-wrap">
          <button className={`color-preview-box ${colorDropOpen ? 'active' : ''}`} onClick={() => setColorDropOpen(!colorDropOpen)}>
            {colors.slice(0, 4).map(c => <span key={c.name} className="cp-dot" style={{ background: c.hex }} title={c.name} />)}
          </button>
          <div className={`color-drop-list ${colorDropOpen ? 'open' : ''}`}>
            <button className={`color-drop-item ${!activeColor ? 'selected' : ''}`} onClick={() => { setActiveColor(null); setColorDropOpen(false) }}>
              <span className="cd-all" />
            </button>
            {colors.map(c => (
              <button key={c.name} className={`color-drop-item ${activeColor === c.name ? 'selected' : ''}`}
                onClick={() => { setActiveColor(c.name); setColorDropOpen(false) }} title={c.name}>
                <span className="cd-dot" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bags-count">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        {activeColor && <span className="active-filter-tag">{activeColor} <button onClick={() => setActiveColor(null)}>×</button></span>}
      </div>

      {filtered.length === 0 ? (
        <div className="bags-empty">
          <p>No products found for selected filters.</p>
          <button onClick={() => { setAvailability({ inStock: false, outOfStock: false }); setPriceRange([0, 5000]); setActiveColor(null) }}>Clear Filters</button>
        </div>
      ) : (
        <div className="bags-grid">
          {filtered.map(product => (
            <BagCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              added={!!added[product.id]}
            />
          ))}
        </div>
      )}
    </div>
  )
}