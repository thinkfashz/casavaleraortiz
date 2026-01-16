import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Variantes de animación para reusar (Efecto cascada premium)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

const HomeScreen: React.FC = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const testimonials = [
        {
            name: "María González",
            role: "Familia Feliz en Linares",
            text: "No solo construyeron paredes, interpretaron nuestro sueño. Ver a mis hijos correr por la sala que diseñamos juntos no tiene precio. Valera Ortiz es sinónimo de paz mental.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Carlos Tapia",
            role: "Inversionista Inmobiliario",
            text: "La modalidad llave en mano fue una revelación. Calidad de hotel 5 estrellas en mi propia parcela. La seriedad y puntualidad de este equipo es algo que ya no se ve.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
        },
        {
            name: "Ana y Roberto",
            role: "Sueño Cumplido en la Montaña",
            text: "Buscábamos un refugio, un lugar donde Dios bendijera nuestro descanso. La madera, los acabados, el cariño en cada clavo... superaron todo lo que imaginamos.",
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop"
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full overflow-x-hidden"
        >
            {/* Hero Section - Optimizado para móviles (100dvh) y Desktop */}
            <section ref={targetRef} className="relative h-[100dvh] md:h-screen md:min-h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop"
                        className="w-full h-full object-cover object-center md:scale-105 transition-transform duration-1000"
                    >
                        <source src="https://pmnwbbyfiqgkukshporq.supabase.co/storage/v1/object/sign/Mis%20recursos%20fabrick/1000145029.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNWM0NjUxNi1iNjY0LTQ0ZTAtOWY4My1iMDQyYzNmZDI3YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNaXMgcmVjdXJzb3MgZmFicmljay8xMDAwMTQ1MDI5Lm1wNCIsImlhdCI6MTc2ODUzNTQ0MiwiZXhwIjo4MDc1NzM1NDQyfQ.9DbkImWAQq4Dp3_7Yv_zfaaToKihUlEe52UaOyMaJpE" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                    
                    {/* Overlays optimizados */}
                    <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center pt-16 md:pt-20">
                    <motion.div 
                        style={{ y, opacity }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        {/* Eslogan Principal - Compacto en móvil */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 md:mb-8">
                            <span className="h-0.5 w-8 md:w-16 bg-primary shadow-[0_0_15px_rgba(181,38,38,1)]"></span>
                            <span className="text-[10px] md:text-lg font-bold tracking-[0.15em] md:tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-white/5">
                                Construimos casas, Dios construye hogares
                            </span>
                        </motion.div>
                        
                        {/* Título Principal - Ajustado para que no se vea gigante en móvil */}
                        <motion.h1 variants={itemVariants} className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 tracking-tight drop-shadow-2xl">
                            El escenario sagrado <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">para tu legado.</span>
                        </motion.h1>
                        
                        {/* Descripción - Más corta visualmente en móvil */}
                        <motion.p variants={itemVariants} className="text-base md:text-2xl text-gray-100 mb-8 md:mb-12 max-w-xl md:max-w-2xl font-light leading-relaxed border-l-2 md:border-l-4 border-primary pl-4 md:pl-8 backdrop-blur-sm bg-black/10 md:bg-black/20 rounded-r-xl py-2 md:py-4 shadow-xl">
                            Transformamos materiales nobles en el santuario donde tu familia florecerá. <strong className="text-white font-semibold">Seguridad inquebrantable para un futuro eterno.</strong>
                        </motion.p>
                        
                        {/* Botones - Stack vertical en móvil, horizontal en desktop */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
                            <Link to="/quote" className="px-8 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl hover:bg-red-700 transition-all text-center shadow-[0_10px_30px_rgba(181,38,38,0.5)] hover:shadow-[0_20px_50px_rgba(181,38,38,0.7)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 backdrop-blur-sm border border-white/10">
                                <span>Cotizar mi Sueño</span>
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </Link>
                            <Link to="/gallery" className="px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                                <span className="material-symbols-outlined text-xl">photo_library</span>
                                Ver Inspiración
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator - Oculto en pantallas muy pequeñas para ganar espacio */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                    className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20 cursor-pointer pointer-events-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Descubre</span>
                    <span className="material-symbols-outlined text-white/70 text-3xl">keyboard_arrow_down</span>
                </motion.div>
            </section>

            {/* Welcome Section - Storytelling */}
            <section className="py-16 md:py-24 bg-surface-dark relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 md:mb-6 block">Nuestra Promesa</span>
                        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 md:mb-8 leading-tight">
                            Bienvenido a la excelencia de <br/> <span className="text-primary">Valera Ortiz SPA</span>
                        </h2>
                        <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-6">
                            Sabemos que construir una casa es la inversión más importante de tu vida. No es solo dinero; es esfuerzo, ilusión y fe en el mañana.
                        </p>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                            Por eso, nuestra misión va más allá de los planos. Nos dedicamos a brindarte la <strong>tranquilidad</strong> de saber que estás en manos de expertos honestos, que valoran tu confianza tanto como tú valoras tu hogar. Desde el primer clavo hasta la entrega de llaves, tu satisfacción es nuestra brújula.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section - Visual & Desirable */}
            <section className="py-20 md:py-32 bg-background-dark relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="mb-12 md:mb-20">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Maestría Constructiva</span>
                        <h2 className="font-display font-bold text-3xl md:text-6xl text-white mb-6">Elige cómo quieres vivir</h2>
                        <div className="w-24 md:w-32 h-1.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    >
                        {[
                            { 
                                icon: 'forest', 
                                title: 'Madera Premium', 
                                desc: 'La nobleza de lo natural. Ambientes cálidos, acogedores y con ese aroma a hogar que enamora.',
                                img: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
                            },
                            { 
                                icon: 'engineering', 
                                title: 'Metalcon High-Tech', 
                                desc: 'Vanguardia y rapidez. Estructuras sismorresistentes que garantizan seguridad para generaciones.',
                                img: 'https://images.unsplash.com/photo-1533630654593-b222d5d44449?q=80&w=800&auto=format&fit=crop'
                            },
                            { 
                                icon: 'domain', 
                                title: 'Sólido Eterno', 
                                desc: 'La tradición del hormigón y ladrillo. Una fortaleza diseñada para perdurar y proteger lo que más amas.',
                                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
                            },
                            { 
                                icon: 'vpn_key', 
                                title: 'Llave en Mano', 
                                desc: 'Cero estrés. Tú sueñas, nosotros ejecutamos. Entra a vivir a una casa 100% terminada y equipada.',
                                img: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
                            }
                        ].map((service, idx) => (
                            <motion.div 
                                variants={itemVariants}
                                key={idx}
                                className="group relative overflow-hidden rounded-3xl h-[350px] md:h-[400px] cursor-pointer shadow-2xl ring-1 ring-white/10 hover:ring-primary/50 transition-all duration-500"
                            >
                                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                                
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-primary/20 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10">
                                        <span className="material-symbols-outlined text-2xl md:text-3xl text-white">{service.icon}</span>
                                    </div>
                                    <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 md:mb-3">{service.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {service.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials - Trust Builder */}
            <section className="py-20 md:py-24 bg-surface-dark border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Historias de Éxito</span>
                        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">Familias que confiaron</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                            Más que clientes, construimos relaciones. Así es como cambiamos vidas.
                        </p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                        {testimonials.map((t, i) => (
                            <motion.div 
                                variants={itemVariants}
                                key={i}
                                className="bg-background-dark/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/5 relative group transition-all duration-300 hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <span className="material-symbols-outlined text-6xl text-primary/10 absolute top-6 right-6 font-serif">format_quote</span>
                                
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <img src={t.image} alt={t.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20 ring-4 ring-background-dark" />
                                    <div>
                                        <h4 className="text-white font-bold text-base md:text-lg">{t.name}</h4>
                                        <span className="text-xs text-primary font-bold uppercase tracking-wider">{t.role}</span>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic relative z-10 text-sm md:text-base">"{t.text}"</p>
                                
                                <div className="flex text-yellow-500 mt-4 text-sm gap-1">
                                    {'★★★★★'.split('').map((star, s) => <span key={s}>{star}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Final - Irresistible */}
            <section className="py-20 md:py-24 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1513584685908-2274653fa18f?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/90 to-background-dark/80"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-display font-bold text-3xl md:text-6xl text-white mb-6 md:mb-8">
                            ¿Listo para vivir donde siempre soñaste?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                            No dejes pasar más tiempo. El hogar que Dios tiene preparado para ti comienza con un clic.
                        </p>
                        <Link to="/quote" className="inline-flex items-center gap-4 px-10 py-5 md:px-12 md:py-6 bg-gradient-to-r from-primary to-red-800 text-white font-bold text-lg md:text-xl rounded-full shadow-[0_20px_50px_rgba(181,38,38,0.5)] hover:shadow-[0_30px_60px_rgba(181,38,38,0.7)] hover:scale-105 transition-all duration-300 group">
                            <span>Quiero mi Cotización Gratis</span>
                            <span className="material-symbols-outlined animate-bounce group-hover:translate-y-1 transition-transform">arrow_downward</span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default HomeScreen;