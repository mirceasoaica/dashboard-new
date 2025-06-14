import { RouterProvider, Router } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = new Router({ routeTree })

function App() {
    return <RouterProvider router={router} />
}

export default App
