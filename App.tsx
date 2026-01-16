import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import QuoteScreen from './components/QuoteScreen';
import GalleryScreen from './components/GalleryScreen';
import CalculatorScreen from './components/CalculatorScreen';
import Layout from './components/Layout';

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/detail/:id" element={<DetailScreen />} />
                <Route path="/quote" element={<QuoteScreen />} />
                <Route path="/gallery" element={<GalleryScreen />} />
                <Route path="/calculator" element={<CalculatorScreen />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </HashRouter>
    );
};

export default App;