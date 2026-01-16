import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DetailScreen: React.FC = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    
    // Mock Data Fetch based on ID
    const project = {
        title: 'Residencia Lomas Altas',
        category: 'Residencial',
        location: 'Ciudad de México',
        year: '2023',
        description: 'Ubicada en una de las zonas más exclusivas de la ciudad, este proyecto desafía la gravedad con voladizos de hormigón que se integran en la topografía accidentada del terreno. El uso de materiales locales como piedra volcánica y madera de tzalam, junto con ventanales de piso a techo, permite una conexión ininterrumpida con el bosque circundante, borrando los límites entre el interior y el exterior.',
        features: ['4 Habitaciones Master', 'Cine en casa Dolby Atmos', 'Piscina Infinity Climatizada', 'Certificación LEED Gold', 'Domótica Integral', 'Cava Subterránea'],
        images: [
            'https://images.unsplash.com/photo-1600596542815-22b5c1275ef0?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753086-00f18cf6b3ea?q=80&w=1600&auto=format&fit=crop'
        ]
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background-dark"
        >
            {/* Hero Image Parallax feel */}
            <div className="h-[50vh] md:h-[70vh] relative overflow-hidden group">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={project.images[0]} 
                    className="w-full h-full object-cover" 
                    alt="Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/gallery" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 w-fit">
                                <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
                            </Link>
                            <span className="text-primary font-bold uppercase tracking-[0.2em] mb-2 block text-xs md:text-sm">{project.category}</span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">{project.title}</h1>
                            <div className="flex flex-wrap gap-6 md:gap-8 text-white/80 text-sm md:text-base font-medium">
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm"><span className="material-symbols-outlined text-primary">location_on</span> {project.location}</span>
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm"><span className="material-symbols-outlined text-primary">calendar_today</span> {project.year}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary"></span>
                            Sobre el Proyecto
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-12 lg:text-justify">
                            {project.description}
                        </p>
                        
                        <h3 className="text-xl font-bold text-white mb-6">Galería del Proyecto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {project.images.map((img, idx) => (
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    key={idx} 
                                    className={`rounded-2xl overflow-hidden cursor-pointer shadow-lg ${idx === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover hover:opacity-90 transition-opacity" alt={`Gallery ${idx}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Sidebar Sticky */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-surface-dark p-8 rounded-3xl border border-white/5 sticky top-28 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex justify-between items-center">
                                Especificaciones
                                <span className="material-symbols-outlined text-gray-500">list</span>
                            </h3>
                            <ul className="space-y-4 mb-8">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 group hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                                        <span className="text-sm md:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="space-y-4">
                                <Link to="/quote" className="block w-full py-4 text-center bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                    Me Interesa este Estilo
                                </Link>
                                <button className="block w-full py-4 text-center border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
                                    Descargar Brochure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DetailScreen;