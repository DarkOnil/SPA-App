import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="header">
        <Link className="logo" to="/">
          Магазин техники
        </Link>
        <nav>
          <Link to="/">Каталог</Link>
          <Link to="/favorites">Избранное ❤️</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Контрольная работа - Каталог с избранным</footer>
    </>
  )
}
