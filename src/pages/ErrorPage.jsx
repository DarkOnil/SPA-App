import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  const title =
    error?.status === 404 ? 'Товар не найден' : 'Что-то пошло не так'

  return (
    <div className="container">
      <h1>{title}</h1>
      <p>Попробуй вернуться в каталог.</p>
      <Link to="/">Вернуться в каталог</Link>
    </div>
  )
}
