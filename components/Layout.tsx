import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppWidget from './WhatsAppWidget';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const logoUrl = "https://pmnwbbyfiqgkukshporq.supabase.co/storage/v1/object/sign/Mis%20recursos%20fabrick/Gemini_Generated_Image_vnpr5jvnpr5jvnpr%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNWM0NjUxNi1iNjY0LTQ0ZTAtOWY4My1iMDQyYzNmZDI3YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNaXMgcmVjdXJzb3MgZmFicmljay9HZW1pbmlfR2VuZXJhdGVkX0ltYWdlX3ZucHI1anZucHI1anZucHIgKDEpLnBuZyIsImlhdCI6MTc2ODUzNTkzNSwiZXhwIjo4MDc1NzM1OTM1fQ.lzeBOFLKMp0zgTSaFfUydBrvGSfPMll6VqMmRQzIV5o";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Galería', path: '/gallery' },
        { name: 'Calculadora', path: '/calculator' },
        { name: 'Contacto', path: '/quote' },
    ];

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95, filter: "blur(20px)" },
        open: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen flex flex-col font-manrope bg-background-light dark:bg-background-dark text-slate-900 dark:text-white selection:bg-primary selection:text-white relative">
            {/* Navbar - Glassmorphism optimizado */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-4 md:py-6'}`}>
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <Link to="/" className="z-50 flex items-center gap-3 group relative select-none">
                        {/* Logo Imagen con manejo de fondo blanco y efectos premium */}
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg shadow-white/5 ring-1 ring-white/10 bg-white flex items-center justify-center group-hover:scale-105 group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300 ease-out">
                             <img 
                                src={logoUrl} 
                                alt="Valera Ortiz Logo" 
                                className="w-full h-full object-contain p-0.5" 
                            />
                            {/* Overlay de brillo sutil */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-lg md:text-xl tracking-tight leading-none text-white uppercase drop-shadow-md group-hover:text-gray-200 transition-colors">Valera Ortiz</span>
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-primary font-bold group-hover:text-red-400 transition-colors">Construcción Premium</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path}
                                className={`text-sm font-bold tracking-widest transition-all duration-300 hover:-translate-y-0.5 relative group ${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name.toUpperCase()}
                                {location.pathname === link.path && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />}
                            </Link>
                        ))}
                        <Link to="/quote" className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full transition-all duration-300 hover:bg-gray-200 hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            COTIZAR
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Tacto nativo */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        className="lg:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
                        aria-label="Menu"
                    >
                        <span className="material-symbols-outlined text-3xl text-white transition-transform duration-300">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile Full Screen Menu - Estilo iOS/Android Premium */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col pt-28 px-6 lg:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link, i) => (
                                <Link 
                                    key={link.path}
                                    to={link.path}
                                    className={`text-3xl font-display font-bold flex justify-between items-center ${location.pathname === link.path ? 'text-primary' : 'text-white'}`}
                                >
                                    <span>{link.name}</span>
                                    <span className="material-symbols-outlined text-2xl opacity-50">arrow_forward_ios</span>
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 w-full my-4" />
                            <Link to="/quote" className="w-full py-4 bg-primary text-white font-bold rounded-2xl text-center text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform">
                                SOLICITAR COTIZACIÓN
                            </Link>
                        </div>
                        
                        <div className="mt-auto pb-10">
                            <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">Síguenos</p>
                            <div className="flex justify-center gap-6">
                                {['facebook', 'instagram', 'whatsapp'].map(s => (
                                    <div key={s} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined">{s === 'whatsapp' ? 'chat' : 'public'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow pt-0 relative z-0">
                {children}
            </main>

            {/* WhatsApp Floating Widget */}
            <WhatsAppWidget />

            {/* Footer */}
            <footer className="bg-surface-dark border-t border-white/5 pt-16 md:pt-24 pb-12 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <img 
                                    src={logoUrl} 
                                    alt="Logo" 
                                    className="w-12 h-12 rounded-xl object-cover shadow-lg ring-1 ring-white/10" 
                                />
                                <h3 className="font-display font-bold text-2xl text-white">CASAS VALERA ORTIZ SPA</h3>
                            </div>
                            <p className="text-gray-400 max-w-md leading-relaxed text-base mb-6">
                                Especialistas en hacer realidad sueños a través de la construcción. Calidad, compromiso y fe en cada proyecto.
                            </p>
                            <p className="text-primary font-bold italic font-display text-lg">
                                "Construimos casas, Dios construye hogares."
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <h4 className="font-bold text-white uppercase text-sm tracking-[0.2em] text-primary">Contacto</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">location_on</span> 
                                    <span>Pasaje Vara Gruesa, Linares, Chile</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">call</span> 
                                    <span>+56 9 7598-9242</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="font-bold text-white uppercase text-sm tracking-[0.2em] text-primary">Enlaces</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                {['Inicio', 'Servicios', 'Nosotros', 'Galería', 'Cotizar'].map((item) => (
                                    <li key={item} className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/5 pt-8 text-center md:text-left text-gray-600 text-sm">
                        <p>© 2024 Valera Ortiz SPA. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;