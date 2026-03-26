import ThumbImage from './ThumbImage'
import ThumbText from './ThumbText'

function ThumbnailStrip({ items, selectedIndex, onSelect }) {
  return (
    <section className="thumbnail-strip" aria-label="Image thumbnails">
      {items.map((item, index) => (
        <button
          key={item.id}
          className={`thumbnail-item ${selectedIndex === index ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelect(index)}
        >
          <ThumbImage src={item.thumbSrc} alt={item.title} />
          <ThumbText>{item.title}</ThumbText>
        </button>
      ))}
    </section>
  )
}

export default ThumbnailStrip
