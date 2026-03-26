import { useEffect, useState } from 'react'
import './App.css'
import LeftImageList from './components/LeftImageList'
import MainPreview from './components/MainPreview'
import ThumbnailStrip from './components/ThumbnailStrip'
import { usePexelsPhotos } from './hooks/usePexelsPhotos'

function App() {
  const topic = 'nature'
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { photos, loading, error } = usePexelsPhotos(topic)
  const selectedPhoto = photos[selectedIndex]

  useEffect(() => {
    setSelectedIndex(0)
  }, [photos])

  return (
    <main className="gallery-page">
      {loading && <p className="status-text">Loading photos...</p>}
      {error && <p className="status-text">{error}</p>}

      {!loading && !error && photos.length === 0 && (
        <p className="status-text">No photos found.</p>
      )}

      {!loading && !error && photos.length > 0 && (
        <section className="gallery-content">
          <LeftImageList
            items={photos}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />

          <section className="right-panel">
            <MainPreview item={selectedPhoto} />
            <ThumbnailStrip
              items={photos}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </section>
        </section>
      )}
    </main>
  )
}

export default App
