import { useEffect, useRef } from 'react'
import ThumbImage from './ThumbImage'
import ThumbText from './ThumbText'

function ThumbnailStrip({ items, selectedIndex, onSelect }) {
  const itemRefs = useRef([])

  useEffect(() => {
    const activeItem = itemRefs.current[selectedIndex]
    if (!activeItem) {
      return
    }

    activeItem.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'nearest',
    })
  }, [selectedIndex])

  return (
    <section className="thumbnail-strip" aria-label="Image thumbnails">
      {items.map((item, index) => (
        <button
          key={item.id}
          className={`thumbnail-item ${selectedIndex === index ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelect(index)}
          ref={(element) => {
            itemRefs.current[index] = element
          }}
        >
          <ThumbImage src={item.thumbSrc} alt={item.title} />
          <ThumbText>{item.title}</ThumbText>
        </button>
      ))}
    </section>
  )
}

export default ThumbnailStrip
