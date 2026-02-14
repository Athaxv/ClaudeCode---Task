"use client";
import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import TerminalPreview from './TerminalPreview';
import Pricing from './Pricing';
import Features from './Features';
import Newsletter from './Newsletter';
import Footer from './Footer';
import Dashboard from './Dashboard';

export default function App() {
    const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

    if (currentPage === 'dashboard') {
        return <Dashboard />;
    }

    const navigateToDashboard = () => setCurrentPage('dashboard');

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-[#D97757] selection:text-white">
            <Header onTryClaude={navigateToDashboard} />
            <main className="flex flex-col items-center w-full">
                <Hero />
                <TerminalPreview />
                <Pricing onTryClaude={navigateToDashboard} />
                <Features />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}