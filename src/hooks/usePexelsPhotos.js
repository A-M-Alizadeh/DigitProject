import { useEffect, useState } from 'react'
import { fetchPexelsPhotos } from '../services/pexelsApi'

function mapPhotos(photos) {
  return photos.map((photo, index) => ({
    id: photo.id,
    title: `Image ${index + 1}`,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    mainSrc: photo.src.large2x || photo.src.large || photo.src.original,
    thumbSrc: photo.src.medium || photo.src.small || photo.src.tiny,
  }))
}

export function usePexelsPhotos(topic) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadPhotos() {
      setLoading(true)
      setError('')

      try {
        const data = await fetchPexelsPhotos(topic)
        if (!isCancelled) {
          setPhotos(mapPhotos(data.photos || []))
        }
      } catch (err) {
        if (!isCancelled) {
          setPhotos([])
          setError(err instanceof Error ? err.message : 'Something went wrong.')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadPhotos()

    return () => {
      isCancelled = true
    }
  }, [topic])

  return { photos, loading, error }
}
