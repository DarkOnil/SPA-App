import { Link, useLoaderData } from 'react-router-dom'
import { useEffect } from 'react'

export default function ProductDetails() {
  const product = useLoaderData()


  useEffect(() => {
    let recent = []

    try {
      const saved = localStorage.getItem('recentlyViewed')
      recent = saved ? JSON.parse(saved) : []
    } catch {
      recent = []
    }


    const withoutCurrent = recent.filter((item) => item.id !== product.id)


    const updated = [product, ...withoutCurrent].slice(0, 10)

    localStorage.setItem('recentlyViewed', JSON.stringify(updated))
  }, [product])

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Назад в каталог
      </Link>

      <div className="details">
        <img src={product.thumbnail} alt={product.title} />

        <div>
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p>⭐ Рейтинг: {product.rating}</p>
          <p>Бренд: {product.brand || 'Не указан'}</p>
          <p>Категория: {product.category}</p>
          <p>В наличии: {product.stock}</p>
          <p>{product.description}</p>

          {product.images && product.images.length > 1 && (
            <div className="image-list">
              {product.images.slice(0, 4).map((image) => (
                <img key={image} src={image} alt={product.title} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
