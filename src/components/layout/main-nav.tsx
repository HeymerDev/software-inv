import Link from "next/link";

import { cn } from "@/lib/utils";
import { getUserWithRoleServer } from "@/lib/auth";
import {
  Package,
  Users,
  ShoppingCart,
  FileText,
  LayoutDashboard,
} from "lucide-react";

import { NavItem } from "@/types/types";

export async function MainNav() {
  const userData = await getUserWithRoleServer();
  const { email, nombre, typeuser_id } = userData || {};
  const userRole = typeuser_id?.nombre || "Sin rol";

  // Si no hay usuario, no mostrar la navegación
  if (!userData) return null;

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      roles: ["Administrador", "Vendedor", "Bodega"],
    },
    {
      title: "Clientes",
      href: "/clientes",
      icon: <Users className="mr-2 h-4 w-4" />,
      roles: ["Administrador"],
    },
    {
      title: "Productos",
      href: "/productos",
      icon: <Package className="mr-2 h-4 w-4" />,
      roles: ["Administrador", "Bodega"],
    },
    {
      title: "Ventas",
      href: "/ventas",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      roles: ["Administrador", "Vendedor"],
    },
    {
      title: "Facturas",
      href: "/facturas",
      icon: <FileText className="mr-2 h-4 w-4" />,
      roles: ["Administrador", "Vendedor"],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => {
    console.log(
      `User role: ${userData.typeuser.nombre}, Item roles: ${item.roles}`
    );
    item.roles.includes(userRole);
  });

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
