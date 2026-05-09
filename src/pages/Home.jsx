import AnnouncementBar  from '../components/AnnouncementBar'
import HeroSlider       from '../components/HeroSlider'
import MarqueeStrip     from '../components/MarqueeStrip'
import Categories       from '../components/Categories'
import BestSeller       from '../components/BestSeller'
import ShopByStyle      from '../components/ShopByStyle'
import BrandStory       from '../components/BrandStory'
import ReviewsSection from '../components/ReviewsSection'

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <HeroSlider />
      <MarqueeStrip />
      <Categories />
      <BestSeller />
      <ShopByStyle />
      <BrandStory />
      <ReviewsSection />
    </>
  )
}
