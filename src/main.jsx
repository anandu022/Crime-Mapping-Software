import { createRoot } from 'react-dom/client'
import MainRoutes from './routes/MainRoutes'
import { BrowserRouter } from 'react-router-dom'
import GuestRoutes from './routes/GuestRoutes'
import GuestHome from './guest/App'



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <MainRoutes/>
    </BrowserRouter>
)
