import { describe, it, expect } from 'vitest'
import App from '../App';
import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "../context/ShopContext.jsx";


const WrappedComponent = () => {
    return <BrowserRouter>
        <ShopContextProvider>
            <App />
        </ShopContextProvider>
    </BrowserRouter>
}


describe('Render App Component', () => {

    it('Should Render The App Component', () => {
        render(<WrappedComponent />)
        // screen.debug();
    })

})