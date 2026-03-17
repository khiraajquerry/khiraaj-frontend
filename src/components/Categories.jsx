import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  { name: 'Tote Bags',      link: '/category/tote-bags',      img: '/ist.png' },
  { name: 'Hand Bag',       link: '/category/hand-bags',     img: '/hand.png' },
  { name: 'Clutch Bags',    link: '/category/clutch-bags',    img: '/clutch.png' },
  { name: '3 Piece Bags',   link: '/category/3-piece-bags',   img: '/3piece.png' },
  { name: 'Crossbody Bags', link: '/category/crossbody-bags', img: '/cross.png' },
]

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="cat-heading">
        <span className="cat-line" />
        <h2 className="cat-title">SHOP BY CATEGORY</h2>
        <span className="cat-line" />
      </div>

      <div className="categories-row">
        {categories.map((cat, i) => (
          <Link to={cat.link} key={i} className="category-item">
            <div className="cat-img-wrap circle-bg">
              <img src={cat.img} alt={cat.name} className="cat-image" />
            </div>
            <p className="cat-name">{cat.name.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}