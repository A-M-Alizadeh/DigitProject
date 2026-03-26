import { useState } from 'react'
import './App.css'
import LeftImageList from './components/LeftImageList'
import MainPreview from './components/MainPreview'
import ThumbnailStrip from './components/ThumbnailStrip'
import TopicSearch from './components/TopicSearch'
import { usePexelsPhotos } from './hooks/usePexelsPhotos'

function App() {
  const [topic, setTopic] = useState('nature')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { photos, loading, loadingMore, error, hasMore, loadMore } =
    usePexelsPhotos(topic)
  const safeIndex = Math.min(selectedIndex, Math.max(photos.length - 1, 0))
  const selectedPhoto = photos[safeIndex]

  const handleTopicSubmit = (nextTopic) => {
    setTopic(nextTopic)
    setSelectedIndex(0)
  }

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
            selectedIndex={safeIndex}
            onSelect={setSelectedIndex}
            onLoadMore={loadMore}
            canLoadMore={hasMore}
            loadingMore={loadingMore}
            topContent={
              <TopicSearch initialTopic={topic} onSubmit={handleTopicSubmit} />
            }
          />

          <section className="right-panel">
            <MainPreview item={selectedPhoto} />
            <ThumbnailStrip
              items={photos}
              selectedIndex={safeIndex}
              onSelect={setSelectedIndex}
              onLoadMore={loadMore}
              canLoadMore={hasMore}
              loadingMore={loadingMore}
            />
          </section>
        </section>
      )}
    </main>
  )
}

export default App
