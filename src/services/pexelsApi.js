const PEXELS_ENDPOINT = 'https://api.pexels.com/v1/search'

export async function fetchPexelsPhotos(topic, page = 1, perPage = 10) {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY

  if (!apiKey) {
    throw new Error('Missing VITE_PEXELS_API_KEY in environment.')
  }

  const url = new URL(PEXELS_ENDPOINT)
  url.searchParams.set('query', topic)
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
  })

  if (!response.ok) {
    throw new Error('Could not fetch images from Pexels.')
  }

  return response.json()
}
