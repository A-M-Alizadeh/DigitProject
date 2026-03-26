import LargeImage from './LargeImage'

function MainPreview({ item }) {
  return (
    <section className="main-preview" aria-label="Selected image">
      <p className="photographer">
        Photographer:{' '}
        <a href={item.photographerUrl} target="_blank" rel="noreferrer">
          {item.photographer}
        </a>
      </p>
      <LargeImage src={item.mainSrc} alt={item.title} />
    </section>
  )
}

export default MainPreview
