import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { screen } from '@testing-library/react';
import ShopContextProvider from "../context/ShopContext.jsx";
import Navbar from '../components/Navbar';

const WrappedComponent = () => {
    return <BrowserRouter>
        <ShopContextProvider>
           <Navbar /> 
        </ShopContextProvider>
    </BrowserRouter>
}



describe("Navbar Component", () => {

    it('Should Render Navbar Compoent', () => {
        render(<WrappedComponent />)
        // screen.debug();
    })

    it('Should Have Home Button', async () => {
        render(<WrappedComponent />);
        const homeBtn = screen.getByRole('heading', {name: "HOME"});
        expect(homeBtn).toBeInTheDocument();
    })

    
    // it('Should Have Collection Button', () => {
    //     render(<WrappedComponent />);
    //     const homeBtn = screen.getByText('COLLECTIONS');
    //     expect(homeBtn).toBeInTheDocument();
    // })



})