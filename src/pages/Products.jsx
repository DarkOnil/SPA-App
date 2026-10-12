import { useLoaderData, useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'


function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export default function Products() {
  const data = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()

  const [favorites, setFavorites] = useState(() => getFromStorage('favorites'))
  const [recent] = useState(() => getFromStorage('recentlyViewed'))

  const search = searchParams.get('q') || ''
  const sortBy = searchParams.get('sortBy') || 'title'
  const order = searchParams.get('order') || 'asc'


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])


  function toggleFavorite(product) {
    const alreadyFavorite = favorites.some((item) => item.id === product.id)

    if (alreadyFavorite) {
      const updated = favorites.filter((item) => item.id !== product.id)
      setFavorites(updated)
    } else {
      setFavorites([...favorites, product])
    }
  }

  function updateParam(name, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set(name, value)
    } else {
      nextParams.delete(name)
    }

    setSearchParams(nextParams)
  }

  return (
    <div className="container">
      <h1>Каталог техники</h1>

      <div className="filters">
        <input
          value={search}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="Поиск товаров..."
        />

        <select
          value={sortBy}
          onChange={(e) => updateParam('sortBy', e.target.value)}
        >
          <option value="title">По названию</option>
          <option value="price">По цене</option>
          <option value="rating">По рейтингу</option>
        </select>

        <select
          value={order}
          onChange={(e) => updateParam('order', e.target.value)}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>

      <p className="muted">Найдено товаров: {data.total}</p>

      {data.products.length === 0 ? (
        <p>Ничего не найдено.</p>
      ) : (
        <div className="products">
          {data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((item) => item.id === product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <section className="recent">
          <h2>Недавно просмотренные</h2>
          <div className="recent-list">
            {recent.slice(0, 5).map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                {product.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
