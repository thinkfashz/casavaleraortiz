import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Link } from 'react-router-dom';

const projects: Project[] = [
    {
        id: '1',
        title: 'Cabaña Alpina',
        category: 'Madera',
        location: 'Linares, VII Región',
        year: '2023',
        description: 'Construcción en pino impregnado con vigas a la vista.',
        imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Casa Mediterránea',
        category: 'Metalcon',
        location: 'Talca',
        year: '2023',
        description: 'Diseño moderno con estructura de acero galvanizado.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: '3',
        title: 'Residencia Familiar',
        category: 'Sólido',
        location: 'Colbún',
        year: '2022',
        description: 'Albañilería confinada con finas terminaciones.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-22b5c1275ef0?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: '4',
        title: 'Proyecto Los Aromos',
        category: 'Llave en Mano',
        location: 'San Javier',
        year: '2024',
        description: 'Proyecto completo entregado con cocina equipada.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: '5',
        title: 'Refugio Cordillerano',
        category: 'Madera',
        location: 'Vilches',
        year: '2023',
        description: 'Kit básico autoconstrucción premium.',
        imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: '6',
        title: 'Casa Estilo Georgiano',
        category: 'Metalcon',
        location: 'Curicó',
        year: '2022',
        description: 'Revestimiento siding y eficiencia térmica.',
        imageUrl: 'https://images.unsplash.com/photo-1593604340245-6d081f36c653?q=80&w=1600&auto=format&fit=crop'
    }
];

const GalleryScreen: React.FC = () => {
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', 'Madera', 'Metalcon', 'Sólido', 'Llave en Mano'];

    const filteredProjects = filter === 'Todos' 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="pt-28 md:pt-36 pb-20 min-h-screen"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Nuestro Trabajo</span>
                    <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">Galería de Proyectos</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                        Descubre nuestros proyectos: una galería de construcción impresionante y transformaciones sorprendentes por Constructora Valera Ortiz SPA.
                    </p>
                </div>

                {/* Filters - Native Snap Scrolling */}
                <div className="flex justify-start md:justify-center overflow-x-auto pb-4 md:pb-0 gap-3 md:gap-4 mb-12 md:mb-16 no-scrollbar px-4 snap-x snap-mandatory">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`snap-center px-6 md:px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                                filter === cat 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary ring-offset-2 ring-offset-background-dark' 
                                    : 'bg-surface-dark text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                key={project.id}
                                className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-2xl bg-surface-dark ring-1 ring-white/5"
                            >
                                <Link to={`/detail/${project.id}`}>
                                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    
                                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="overflow-hidden mb-2">
                                            <span className="text-primary text-xs font-bold uppercase tracking-widest block transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">{project.category}</span>
                                        </div>
                                        <h3 className="text-white font-display font-bold text-2xl md:text-3xl mb-2 leading-tight drop-shadow-lg">{project.title}</h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                            <div className="flex justify-between items-center text-gray-300 text-xs md:text-sm border-t border-white/20 pt-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {project.location}</span>
                                                <span>{project.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Only permanent category visible */}
                                    <span className="md:hidden absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 z-20 shadow-lg">
                                        {project.category}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GalleryScreen;