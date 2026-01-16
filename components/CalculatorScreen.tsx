import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CalculatorScreen: React.FC = () => {
    const [area, setArea] = useState(60);
    const [quality, setQuality] = useState<'kit' | 'standard' | 'premium'>('standard');
    const [cost, setCost] = useState(0);

    const prices = {
        kit: 250000,      // Precio aprox m2 Kit Básico
        standard: 550000, // Precio aprox m2 Llave en Mano Estándar
        premium: 850000   // Precio aprox m2 Llave en Mano Premium
    };

    useEffect(() => {
        setCost(area * prices[quality]);
    }, [area, quality]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-28 md:pt-36 pb-20 min-h-screen bg-background-dark"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block">Cotizador Online</span>
                        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">Estimador de Inversión</h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                            Calcula un valor aproximado para tu proyecto en pesos chilenos. 
                            Valores referenciales sujetos a visita técnica y ubicación.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Controls */}
                        <div className="lg:col-span-7 space-y-8 bg-surface-dark p-6 md:p-10 rounded-3xl border border-white/5 shadow-xl">
                            <div>
                                <label className="flex justify-between items-center text-white font-bold mb-6">
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">square_foot</span> Superficie</span>
                                    <span className="text-primary bg-primary/10 px-4 py-1 rounded-lg border border-primary/20">{area} m²</span>
                                </label>
                                <div className="relative h-12 flex items-center">
                                    <input 
                                        type="range" 
                                        min="36" 
                                        max="300" 
                                        step="1"
                                        value={area}
                                        onChange={(e) => setArea(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary z-20 relative"
                                    />
                                    {/* Custom Track Styles would go in CSS, utilizing standard for now */}
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-medium tracking-wide">
                                    <span>36 m²</span>
                                    <span>300 m²</span>
                                </div>
                            </div>

                            <div className="h-px bg-white/5"></div>

                            <div>
                                <label className="block text-white font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">style</span> Modalidad
                                </label>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'kit', label: 'Kit Básico Autoconstrucción', desc: 'Paneles prefabricados listos para armar. No incluye radier ni terminaciones.' },
                                        { id: 'standard', label: 'Llave en Mano Estándar', desc: 'Casa terminada con materiales nacionales, lista para habitar.' },
                                        { id: 'premium', label: 'Llave en Mano Premium', desc: 'Terminaciones superiores, aislación térmica reforzada y ventanas termopanel.' }
                                    ].map((opt) => (
                                        <div 
                                            key={opt.id}
                                            onClick={() => setQuality(opt.id as any)}
                                            className={`p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                                                quality === opt.id 
                                                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                                                    : 'border-white/5 hover:border-white/20 bg-background-dark/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2 relative z-10">
                                                <span className={`font-bold text-lg ${quality === opt.id ? 'text-primary' : 'text-white'}`}>{opt.label}</span>
                                                {quality === opt.id ? 
                                                    <span className="material-symbols-outlined text-primary">radio_button_checked</span> :
                                                    <span className="material-symbols-outlined text-gray-600 group-hover:text-gray-400">radio_button_unchecked</span>
                                                }
                                            </div>
                                            <p className="text-sm text-gray-400 relative z-10">{opt.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Result - Sticky on Desktop */}
                        <div className="lg:col-span-5 sticky top-32">
                            <div className="bg-gradient-to-b from-surface-dark to-background-dark p-8 md:p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden shadow-2xl">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
                                
                                <span className="material-symbols-outlined text-5xl text-primary mb-6 block mx-auto bg-surface-dark p-4 rounded-full border border-white/5 shadow-xl">payments</span>
                                
                                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">Inversión Estimada (CLP)</p>
                                <motion.div 
                                    key={cost}
                                    initial={{ scale: 0.9, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="font-display font-bold text-4xl md:text-5xl lg:text-5xl text-white mb-4 tracking-tight"
                                >
                                    {formatCurrency(cost)}
                                </motion.div>
                                <p className="text-xs text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                                    *Valores netos aproximados. No incluyen traslado fuera de Linares.
                                </p>

                                <button className="w-full py-4 bg-primary hover:bg-red-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2">
                                    <span>SOLICITAR COTIZACIÓN</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                                
                                <div className="mt-6 flex justify-center gap-4 text-gray-500 text-xs">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span> Datos Seguros</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bolt</span> Respuesta Rápida</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CalculatorScreen;