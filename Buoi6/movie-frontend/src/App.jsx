import { useCallback, useEffect, useState } from 'react'
import movieApi from './api/movieApi'
import './App.css'

const initialForm = {
  title: '',
  description: '',
  duration: '',
  genre: '',
  showTime: '',
  price: '',
}

function extractErrorMessage(error, fallbackMessage) {
  if (!error || typeof error !== 'object' || !('isAxiosError' in error)) {
    return fallbackMessage
  }

  const responseData = error.response?.data

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData
  }

  if (
    responseData &&
    typeof responseData === 'object' &&
    typeof responseData.message === 'string' &&
    responseData.message.trim()
  ) {
    return responseData.message
  }

  if (error.message) {
    return error.message
  }

  return fallbackMessage
}

function formatShowTimeForApi(value) {
  return value ? `${value}:00` : ''
}

function formatShowTimeForDisplay(value) {
  if (!value) {
    return 'Chua cap nhat'
  }

  return value.replace('T', ' ').replace('Z', '').slice(0, 16)
}

function formatPrice(value) {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return 'Chua cap nhat'
  }

  return `${numericValue.toLocaleString('vi-VN')} VND`
}

function App() {
  const [movies, setMovies] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const loadMovies = useCallback(async () => {
    setIsLoading(true)
    setFetchError('')

    try {
      const response = await movieApi.get('/movies')
      setMovies(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setFetchError(
        extractErrorMessage(
          error,
          'Khong the tai danh sach phim. Hay kiem tra backend Movie Service.',
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadMovies()
  }, [loadMovies])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))

    if (submitError) {
      setSubmitError('')
    }

    if (submitMessage) {
      setSubmitMessage('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitMessage('')

    try {
      await movieApi.post('/movies', {
        title: formData.title.trim(),
        description: formData.description.trim(),
        duration: Number(formData.duration),
        genre: formData.genre.trim(),
        showTime: formatShowTimeForApi(formData.showTime),
        price: Number(formData.price),
      })

      setFormData(initialForm)
      setSubmitMessage('Them phim thanh cong.')
      await loadMovies()
    } catch (error) {
      setSubmitError(
        extractErrorMessage(
          error,
          'Khong the them phim moi. Hay kiem tra du lieu nhap vao va backend.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-banner">
        <div className="hero-card">
          <span className="eyebrow">Event-Driven Architecture</span>
          <h1>Movie Service Frontend</h1>
          <p className="hero-copy">
            Giao dien React don gian cho bai tap Movie Ticket System: xem danh
            sach phim, them phim moi va demo truc tiep voi backend Movie
            Service.
          </p>
          <div className="hero-meta">
            <span>React + Vite + Axios</span>
            <span>Backend: http://localhost:8082</span>
            <span>API URL: http://localhost:8082/movies</span>
          </div>
        </div>

        <aside className="status-card">
          <div className="status-block">
            <span className="status-label">Tong so phim</span>
            <strong className="status-value">
              {isLoading ? '...' : movies.length}
            </strong>
          </div>
          <div className="status-block">
            <span className="status-label">Trang thai ket noi</span>
            <strong className="status-value status-value--small">
              {fetchError ? 'Can kiem tra backend' : 'San sang demo'}
            </strong>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2 className="section-title">Them phim moi</h2>
              <p className="section-copy">
                Dien cac truong co ban, submit va tu dong load lai danh sach.
              </p>
            </div>
            <span className="endpoint-chip">POST /movies</span>
          </div>

          <form className="movie-form" onSubmit={handleSubmit}>
            <label className="field-group">
              <span className="field-label">Title</span>
              <input
                className="field-input"
                type="text"
                name="title"
                placeholder="Interstellar"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field-group">
              <span className="field-label">Description</span>
              <textarea
                className="field-input field-textarea"
                name="description"
                placeholder="Du hanh khong gian"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>

            <div className="field-row">
              <label className="field-group">
                <span className="field-label">Duration (minutes)</span>
                <input
                  className="field-input"
                  type="number"
                  name="duration"
                  min="1"
                  placeholder="169"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field-group">
                <span className="field-label">Genre</span>
                <input
                  className="field-input"
                  type="text"
                  name="genre"
                  placeholder="Sci-Fi"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field-group">
                <span className="field-label">Show time</span>
                <input
                  className="field-input"
                  type="datetime-local"
                  name="showTime"
                  value={formData.showTime}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field-group">
                <span className="field-label">Price (VND)</span>
                <input
                  className="field-input"
                  type="number"
                  name="price"
                  min="0"
                  step="1000"
                  placeholder="85000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <p className="field-hint">
              Truong `showTime` se gui len backend theo dinh dang `YYYY-MM-DD
              THH:mm:ss`.
            </p>

            {submitError ? (
              <p className="status-message status-message--error" role="alert">
                {submitError}
              </p>
            ) : null}

            {submitMessage ? (
              <p
                className="status-message status-message--success"
                aria-live="polite"
              >
                {submitMessage}
              </p>
            ) : null}

            <div className="form-actions">
              <button
                className="primary-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Dang them phim...' : 'Them phim'}
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2 className="section-title">Danh sach phim</h2>
              <p className="section-copy">
                Hien thi du lieu tu Movie Service, phu hop de demo CRUD co ban.
              </p>
            </div>
            <span className="endpoint-chip">GET /movies</span>
          </div>

          <div className="movies-toolbar">
            <span className="movies-count">
              {isLoading ? 'Dang tai du lieu...' : `${movies.length} phim`}
            </span>
            <button
              className="secondary-button"
              type="button"
              onClick={() => void loadMovies()}
              disabled={isLoading}
            >
              {isLoading ? 'Dang load...' : 'Tai lai danh sach'}
            </button>
          </div>

          {fetchError ? (
            <p className="status-message status-message--error" role="alert">
              {fetchError}
            </p>
          ) : null}

          {isLoading ? (
            <div className="empty-state">
              <h3>Dang tai danh sach phim</h3>
              <p>Frontend dang goi GET /movies tu backend Movie Service.</p>
            </div>
          ) : null}

          {!isLoading && movies.length === 0 ? (
            <div className="empty-state">
              <h3>Chua co phim nao</h3>
              <p>Hay them phim moi o form ben trai de kiem tra luong du lieu.</p>
            </div>
          ) : null}

          {!isLoading && movies.length > 0 ? (
            <div className="movie-grid">
              {movies.map((movie) => (
                <article
                  className="movie-card"
                  key={
                    movie.id ??
                    `${movie.title}-${movie.showTime ?? 'showtime'}-${movie.price ?? 'price'}`
                  }
                >
                  <div className="movie-card-top">
                    <span className="movie-badge">ID: {movie.id ?? 'N/A'}</span>
                    <span className="price-tag">{formatPrice(movie.price)}</span>
                  </div>

                  <div className="movie-card-body">
                    <h3>{movie.title || 'Untitled movie'}</h3>
                    <p className="movie-description">
                      {movie.description || 'Khong co mo ta.'}
                    </p>
                  </div>

                  <dl className="movie-meta">
                    <div>
                      <dt>Duration</dt>
                      <dd>
                        {movie.duration ? `${movie.duration} minutes` : 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt>Genre</dt>
                      <dd>{movie.genre || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt>Show time</dt>
                      <dd>{formatShowTimeForDisplay(movie.showTime)}</dd>
                    </div>
                    <div>
                      <dt>Price</dt>
                      <dd>{formatPrice(movie.price)}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </section>
    </main>
  )
}

export default App
