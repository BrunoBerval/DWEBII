import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SugestaoProvider } from './context/SugestaoContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <SugestaoProvider>
        <App />
      </SugestaoProvider>
    </BrowserRouter>,
)