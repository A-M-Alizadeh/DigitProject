import { useEffect, useState } from 'react'
import { fetchPexelsPhotos } from '../services/pexelsApi'

function mapPhotos(photos, startIndex = 0) {
  return photos.map((photo, index) => ({
    id: photo.id,
    title: `Image ${startIndex + index + 1}`,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    mainSrc: photo.src.large2x || photo.src.large || photo.src.original,
    thumbSrc: photo.src.medium || photo.src.small || photo.src.tiny,
  }))
}

export function usePexelsPhotos(topic) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPage(1)
  }, [topic])

  useEffect(() => {
    let isCancelled = false

    async function loadPhotos() {
      const isFirstPage = page === 1
      if (isFirstPage) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      setError('')

      try {
        const data = await fetchPexelsPhotos(topic, page)
        const fetchedPhotos = data.photos || []
        if (!isCancelled) {
          setHasMore(Boolean(data.next_page))
          setPhotos((prev) => {
            if (isFirstPage) {
              return mapPhotos(fetchedPhotos, 0)
            }
            const mappedPhotos = mapPhotos(fetchedPhotos, prev.length)
            return [...prev, ...mappedPhotos]
          })
        }
      } catch (err) {
        if (!isCancelled) {
          if (page === 1) {
            setPhotos([])
          }
          setError(err instanceof Error ? err.message : 'Something went wrong.')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
          setLoadingMore(false)
        }
      }
    }

    loadPhotos()

    return () => {
      isCancelled = true
    }
  }, [topic, page])

  const loadMore = () => {
    if (loading || loadingMore || !hasMore) {
      return
    }
    setPage((prev) => prev + 1)
  }

  return { photos, loading, loadingMore, error, hasMore, loadMore }
}
