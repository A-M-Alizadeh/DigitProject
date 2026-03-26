import PanelText from './PanelText'

function LeftImageList({ items, selectedIndex, onSelect }) {
  return (
    <aside className="left-panel" aria-label="Image list">
      {items.map((item, index) => (
        <button
          key={item.id}
          className={`left-item ${selectedIndex === index ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelect(index)}
        >
          <PanelText>{item.title}</PanelText>
        </button>
      ))}
    </aside>
  )
}

export default LeftImageList
