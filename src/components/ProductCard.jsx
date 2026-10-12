import { Link } from 'react-router-dom'

export default function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
      <button
        className="favorite-button"
        onClick={() => onToggleFavorite(product)}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
      </Link>

      <p className="price">${product.price}</p>
      <p>⭐ {product.rating}</p>

      <Link className="details-link" to={`/products/${product.id}`}>
        Подробнее
      </Link>
    </article>
  )
}
