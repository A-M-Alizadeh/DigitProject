import { useState } from 'react'

function TopicSearch({ initialTopic, onSubmit }) {
  const [value, setValue] = useState(initialTopic)

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextTopic = value.trim()
    if (!nextTopic) {
      return
    }
    onSubmit(nextTopic)
  }

  return (
    <form className="topic-search" onSubmit={handleSubmit}>
      <div className="topic-search-field">
        <input
          id="topic-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Topic"
        />
        <button className="topic-search-icon" type="submit" aria-label="Search topic">
          🔍
        </button>
      </div>
    </form>
  )
}

export default TopicSearch
