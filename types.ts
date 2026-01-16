export interface Project {
    id: string;
    title: string;
    category: 'Madera' | 'Metalcon' | 'Sólido' | 'Llave en Mano';
    imageUrl: string;
    location: string;
    year: string;
    description: string;
    price?: string;
}

export interface Service {
    title: string;
    description: string;
    icon: string;
}

export interface CalculationResult {
    min: number;
    max: number;
    currency: string;
}