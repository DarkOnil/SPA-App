import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  
  function toggleFavorite(product) {
    const updated = favorites.filter((item) => item.id !== product.id)
    setFavorites(updated)
  }

  return (
    <div className="container">
      <h1>Избранное</h1>

      {favorites.length === 0 ? (
        <p>
          Пока нет избранных товаров.{' '}
          <Link to="/">Перейти в каталог</Link>
        </p>
      ) : (
        <div className="products">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
