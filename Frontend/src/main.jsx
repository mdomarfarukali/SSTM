import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/CartContext.jsx';
import App from './App.jsx'

// import App from "./test.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CartProvider>
      <App />
     </CartProvider>
    
  </StrictMode>,
)
