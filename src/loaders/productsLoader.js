// Загружаем список товаров (с поиском и сортировкой)
export async function productsLoader({ request }) {
  const url = new URL(request.url)

  const search = url.searchParams.get('q') || ''
  const sortBy = url.searchParams.get('sortBy') || 'title'
  const order = url.searchParams.get('order') || 'asc'

  let apiUrl

  if (search) {
    apiUrl = `https://dummyjson.com/products?limit=9&skip=0&search=${encodeURIComponent(search)}`
  } else {
    apiUrl = 'https://dummyjson.com/products?limit=9&skip=0'
  }

  apiUrl += `&sortBy=${sortBy}&order=${order}`

  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Response('Не удалось загрузить товары', { status: response.status })
  }

  return response.json()
}

// Загружаем один товар по id
export async function productLoader({ params }) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`)

  if (!response.ok) {
    throw new Response('Товар не найден', { status: 404 })
  }

  return response.json()
}
