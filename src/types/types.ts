import { ReactNode } from "react";

type TypeUser = {
    id: number;
    nombre: string;
};

export type CustomUser = {
    id: number;
    nombre: string;
    email: string;
    typeuser: TypeUser;
};


type Role = "Administrador" | "Vendedor" | "Bodega";

export type NavItem = {
    title: string;
    href: string;
    icon: ReactNode;
    roles: Role[];
};