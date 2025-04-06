"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

// Definir el tipo de usuario
export type User = {
  id?: number;
  email?: string;
};

// Definir el tipo del contexto de autenticación
type AuthContextType = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const getCurrentUser = async () => {
    const user = await getUser();
    return user;
  };
  const currentUser = getCurrentUser();
  console.log(currentUser, "usuario actual"); // Imprime null
  const router = useRouter();

  // Verificar si hay un usuario en localStorage al cargar la página
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [router, currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
