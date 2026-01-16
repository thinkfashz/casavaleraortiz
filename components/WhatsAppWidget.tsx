import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [idea, setIdea] = useState('');
    const [error, setError] = useState('');

    const PHONE_NUMBER = '56975989242'; // Número configurado

    const handleOpen = () => {
        setIsOpen(true);
        setError('');
    };

    const handleClose = () => setIsOpen(false);

    const handleSend = () => {
        if (!name.trim() || !idea.trim()) {
            setError('Por favor cuéntanos tu nombre y tu idea brevemente.');
            return;
        }

        const message = `Hola, mi nombre es *${name}*.\n\nTengo la siguiente idea/proyecto:\n${idea}\n\nMe gustaría recibir asesoría.`;
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp
        window.open(url, '_blank');
        
        // Resetear y cerrar
        setName('');
        setIdea('');
        setIsOpen(false);
    };

    return (
        <>
            {/* Botón Flotante */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpen}
                className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-40 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center cursor-pointer group transition-all"
            >
                {/* Ping animation para llamar la atención */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>
                
                {/* Icono WhatsApp SVG */}
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Card */}
                        <motion.div
                            initial={{ y: 100, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.95 }}
                            className="bg-surface-dark border border-white/10 w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10"
                        >
                            {/* Header */}
                            <div className="bg-[#075E54] p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-4 -mt-4 blur-xl"></div>
                                <h3 className="font-display font-bold text-xl relative z-10">Cuéntanos tu idea</h3>
                                <p className="text-white/80 text-sm relative z-10 mt-1">
                                    Te conectaremos con un experto vía WhatsApp inmediatamente.
                                </p>
                                <button 
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4 bg-background-dark/95">
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Tu Nombre</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                        className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">¿Qué quieres construir?</label>
                                    <textarea 
                                        value={idea}
                                        onChange={(e) => setIdea(e.target.value)}
                                        rows={3}
                                        placeholder="Ej: Hola, tengo un terreno en el sur y quiero una cabaña de madera de 80m2..."
                                        className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] outline-none transition-all resize-none"
                                    />
                                </div>

                                {error && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-red-500 text-xs font-bold flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">error</span> {error}
                                    </motion.p>
                                )}

                                <button 
                                    onClick={handleSend}
                                    className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2"
                                >
                                    <span>CONTINUAR EN WHATSAPP</span>
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                                
                                <p className="text-[10px] text-center text-gray-500 mt-2">
                                    Al continuar, se abrirá WhatsApp Web o la App.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhatsAppWidget;