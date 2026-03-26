import { useEffect, useRef } from 'react'
import PanelText from './PanelText'

function LeftImageList({ items, selectedIndex, onSelect, topContent }) {
  const itemRefs = useRef([])

  useEffect(() => {
    const activeItem = itemRefs.current[selectedIndex]
    if (!activeItem) {
      return
    }

    activeItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [selectedIndex])

  return (
    <aside className="left-panel" aria-label="Image list">
      {topContent ? <div className="left-sticky-top">{topContent}</div> : null}

      {items.map((item, index) => (
        <button
          key={item.id}
          className={`left-item ${selectedIndex === index ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelect(index)}
          ref={(element) => {
            itemRefs.current[index] = element
          }}
        >
          <PanelText>{item.title}</PanelText>
        </button>
      ))}
    </aside>
  )
}

export default LeftImageList
