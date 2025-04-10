import { ReactNode } from "react";

export type TypeUser = {
    id: number;
    nombre: string;
};

export type CustomUser = {
    id: number;
    nombre: string;
    email: string;
    role: string;
};


type Role = "Administrador" | "Vendedor" | "Bodega";

export type NavItem = {
    title: string;
    href: string;
    icon: ReactNode;
    roles: Role[];
};

export interface VentaConInfo {
    venta_id: number;
    cliente: string;
    fecha: string; // o Date si lo conviertes
    total: number;
    estado: "Pagado" | "No pagado"; // según tus estados
}

export interface Client {
    id: number;
    nombre: string;
    email: string;
    telefono?: string; // opcional si no siempre se guarda
    direccion?: string; // opcional también/ si usas Supabase, puede estar este campo
}

export interface Product {
    id: number;
    nombre: string;
    descripcion?: string; // si existe campo de descripción
    precio: number;
    stock: number;

}


