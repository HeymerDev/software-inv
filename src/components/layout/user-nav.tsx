import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserWithRoleServer, logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

export async function UserNav() {
  const userData = await getUserWithRoleServer();

  const roleLabels = {
    Administrador: "Administrador",
    Vendedor: "Vendedor",
    Bodega: "Personal de Bodega",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-zinc-900">
              {userData?.nombre.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.nombre}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {roleLabels[
                userData?.typeuser.nombre as keyof typeof roleLabels
              ] || userData?.typeuser.nombre}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
