import { useState, useEffect } from 'react'
import './AnnouncementBar.css'

const defaultMessages = [
  'EID SALE — UP TO 50% OFF • Shop Now',
  'NEW ARRIVALS ARE HERE • Explore the Latest Collection',
  'FREE DELIVERY AVAILABLE • All Across Pakistan',
]

export default function AnnouncementBar() {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % defaultMessages.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="announcement-bar">
      <p
        className={`announcement-text ${visible ? 'visible' : 'hidden'}`}
      >
        {defaultMessages[index]}
      </p>
    </div>
  )
}