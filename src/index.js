import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CartContxtProvider from './Context/CartContext.js';
import TokenContextProvider from './Context/TokenContext.js';


let queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenContextProvider>
        <CartContxtProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools position='bottom-right' />
            </QueryClientProvider>
        </CartContxtProvider>
    </TokenContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
