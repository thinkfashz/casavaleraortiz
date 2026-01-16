import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
    name: string;
    phone: string;
    email: string;
    interest: string;
    date: string;
    message: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
    date?: string;
}

const QuoteScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        interest: 'Casa Prefabricada (Madera)',
        date: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = (): boolean => {
        let tempErrors: FormErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }

        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!formData.phone.trim()) {
            tempErrors.phone = 'El teléfono es obligatorio.';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            tempErrors.phone = 'Ingresa un número válido (ej: +56912345678).';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            tempErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = 'Ingresa un correo electrónico válido.';
            isValid = false;
        }

        // Si seleccionó agendar cita (implícito al llenar fecha), validamos que no sea fecha pasada
        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                tempErrors.date = 'La fecha no puede ser en el pasado.';
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error al escribir
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulación de envío a API
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-28 md:pt-32 pb-20 min-h-screen bg-background-dark flex items-center"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Info Column */}
                    <div className="order-2 lg:order-1">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Contáctanos</span>
                        <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 md:mb-8">
                            Hablemos de tu <br/>Próximo Proyecto.
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                            Nos encanta recibir tus saludos. Agendamos tu cita a través de nuestro formulario, por teléfono o visítanos en Linares.
                        </p>
                        
                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="p-4 bg-surface-dark rounded-2xl text-primary border border-white/5 group-hover:border-primary/30 transition-colors shadow-lg">
                                    <span className="material-symbols-outlined text-3xl">location_on</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Visítanos</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">Pasaje Vara Gruesa, Linares<br/>Maule Región 3580000, Chile</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 group">
                                <div className="p-4 bg-surface-dark rounded-2xl text-primary border border-white/5 group-hover:border-primary/30 transition-colors shadow-lg">
                                    <span className="material-symbols-outlined text-3xl">phone_iphone</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Llámanos</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">+56 9 7598-9242<br/>Lun - Vie: 09:00 am – 05:00 pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSubmit}
                                    className="bg-surface-dark p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl space-y-6 relative overflow-hidden"
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 relative group">
                                            <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Nombre *</label>
                                            <div className="relative">
                                                <span className={`material-symbols-outlined absolute left-4 top-3.5 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`}>person</span>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full bg-background-dark/50 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-1 outline-none transition-all text-base ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'}`}
                                                    placeholder="Tu Nombre" 
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2 relative group">
                                            <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Teléfono *</label>
                                            <div className="relative">
                                                <span className={`material-symbols-outlined absolute left-4 top-3.5 transition-colors ${errors.phone ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`}>smartphone</span>
                                                <input 
                                                    type="tel" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full bg-background-dark/50 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-1 outline-none transition-all text-base ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'}`}
                                                    placeholder="+56 9..." 
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs ml-1 mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2 relative group">
                                        <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Email *</label>
                                        <div className="relative">
                                            <span className={`material-symbols-outlined absolute left-4 top-3.5 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`}>mail</span>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-background-dark/50 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-1 outline-none transition-all text-base ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'}`}
                                                placeholder="correo@ejemplo.com" 
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Interés</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute right-4 top-3.5 text-gray-500 pointer-events-none">expand_more</span>
                                                <select 
                                                    name="interest"
                                                    value={formData.interest}
                                                    onChange={handleChange}
                                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-base"
                                                >
                                                    <option>Casa Prefabricada (Madera)</option>
                                                    <option>Casa Metalcon</option>
                                                    <option>Construcción Sólida</option>
                                                    <option>Kit Básico</option>
                                                    <option>Llave en Mano</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2 relative group">
                                            <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1 flex items-center gap-1">
                                                Fecha Cita <span className="text-primary text-[10px]">(Opcional)</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="date" 
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    style={{colorScheme: 'dark'}}
                                                    className={`w-full bg-background-dark/50 border rounded-xl py-3.5 px-4 text-white placeholder-gray-600 focus:ring-1 outline-none transition-all text-base appearance-none ${errors.date ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'}`}
                                                />
                                            </div>
                                            {errors.date && <p className="text-red-500 text-xs ml-1 mt-1">{errors.date}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Mensaje</label>
                                        <textarea 
                                            name="message"
                                            rows={4} 
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-background-dark/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-base" 
                                            placeholder="Cuéntanos más sobre tu proyecto o dudas específicas..."
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 bg-gradient-to-r from-primary to-red-800 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform flex items-center justify-center gap-3 group ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                <span>ENVIANDO...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>ENVIAR SOLICITUD</span>
                                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-surface-dark p-10 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center h-[600px] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-primary/5"></div>
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/20 relative z-10"
                                    >
                                        <span className="material-symbols-outlined text-5xl text-white">check</span>
                                    </motion.div>
                                    <h2 className="font-display font-bold text-3xl text-white mb-4 relative z-10">¡Mensaje Enviado!</h2>
                                    <p className="text-gray-400 max-w-sm mb-8 relative z-10 text-lg">
                                        Gracias {formData.name}, hemos recibido tu solicitud. Uno de nuestros expertos te contactará a la brevedad al número {formData.phone}.
                                    </p>
                                    <button 
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({ ...formData, message: '', date: '' });
                                        }}
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors relative z-10 border border-white/5"
                                    >
                                        Volver al formulario
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuoteScreen;