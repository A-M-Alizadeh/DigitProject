import { useEffect, useRef } from 'react'
import ThumbImage from './ThumbImage'
import ThumbText from './ThumbText'

function ThumbnailStrip({
  items,
  selectedIndex,
  onSelect,
  onLoadMore,
  canLoadMore,
  loadingMore,
}) {
  const itemRefs = useRef([])
  const stripRef = useRef(null)

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

  const scrollThumbnails = (direction) => {
    const strip = stripRef.current
    if (!strip) return

    strip.scrollBy({
      left: direction * 220,
      behavior: 'smooth',
    })
  }

  return (
    <section className="thumbnail-strip-shell" aria-label="Image thumbnails">
      <button
        className="thumb-move-btn left"
        type="button"
        aria-label="Move thumbnails left"
        onClick={() => scrollThumbnails(-1)}
      >
        &lt;
      </button>

      <div className="thumbnail-strip" ref={stripRef}>
        {items.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
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

        {canLoadMore ? (
          <button
            className="list-load-more horizontal"
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load more'}
          </button>
        ) : null}
      </div>

      <button
        className="thumb-move-btn right"
        type="button"
        aria-label="Move thumbnails right"
        onClick={() => scrollThumbnails(1)}
      >
        &gt;
      </button>
    </section>
  )
}

export default ThumbnailStrip
