import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import Layout from './components/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import { productsLoader, productLoader } from './loaders/productsLoader.js'


function LoadingLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <>
      {isLoading && <div className="loading">Загрузка...</div>}
      <Layout />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoadingLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
        loader: productLoader
      },
      {
        path: 'favorites',
        element: <Favorites />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
