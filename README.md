# Digit Gallery

Simple React gallery app using the Pexels API.

## Run

1. Create `.env` in the project root:
   `cp .env.example .env`
2. Add your Pexels key in `.env`:
   `VITE_PEXELS_API_KEY=your_key_here`
   Or create/write it directly from terminal:
   `echo "VITE_PEXELS_API_KEY=your_real_key" > .env`
3. Install dependencies:
   `npm install`
4. Start development server:
   `npm run dev`

## What It Does

- Shows a selectable image list on the left
- Shows a large preview and thumbnails on the right
- Scrolls each list to the selected index
- Supports topic search and load more

## Used

- props
- children
- state (`useState`)
- effects (`useEffect`)
- refs (`useRef`)
- REST API calls (`fetch`)
- conditional rendering
- component composition
