import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import Link from "next/link";
import { getRoles } from "@/lib/getData";
import { CustomUser } from "@/types/types";
import { updateUser } from "@/lib/updateData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const FormEditUser = async ({user}: {user: CustomUser}) => {

    const roles = await getRoles();
    const id = user?.auth_id;

    async function editUserAction(formData: FormData) {
        "use server";
    
        const nombre = formData.get("name") as string;
        const email = formData.get("email") as string;
        const contraseña = formData.get("password") as string;
        const rol = formData.get("rol") as string;
    
        if (!nombre || !email || !contraseña || !rol) {
          throw new Error("Faltan datos");
        }
    
        await updateUser(id, { nombre, email, password:contraseña, role: rol})
        revalidatePath("/usuarios");
        redirect("/usuarios");
      };
    

    return (
        <form action={editUserAction}>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-fit md:inline-grid grid-cols-1 px-2 bg-zinc-800 rounded-sm gap-3 ">
                    <TabsTrigger
                        value="general"
                        className="text-secondary data-[state=active]:bg-black rounded-sm transition-colors duration-[300ms] ease-in-out"
                    >
                        Información Del Usuario
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6 bg-black">
                    <Card className="bg-black text-secondary">
                        <CardHeader>
                            <CardTitle>Información General</CardTitle>
                            <CardDescription>
                                Edite la informacion del Usuario
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre *</Label>
                                <Input id="name" name="name" required defaultValue={user?.nombre}/>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Correo*</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="jorge@example.es"
                                    required
                                    defaultValue={user?.email}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña *</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="text"
                                    minLength={6}
                                    required
                                    defaultValue={user?.password}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rol">Rol *</Label>
                                <Select
                                    name="rol"
                                    required
                                    defaultValue={roles?.find(r => r.nombre === user?.role)?.id.toString()}
                                >

                                    <SelectTrigger id="rol" className="w-full">
                                        <SelectValue placeholder="Seleccionar Rol" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black text-secondary">
                                        {roles?.map((rol) => (
                                            <SelectItem key={rol.id} value={rol.id.toString()} className="hover:bg-primary! hover:text-secondary!">
                                                {rol.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-6">
                <Link href="/usuarios">
                    <Button variant="outline" className="cursor-pointer bg-black text-secondary hover:bg-zinc-900 hover:text-secondary">
                        Cancelar
                    </Button>
                </Link>
                <Button className="cursor-pointer text-primary bg-secondary hover:bg-gray-200 hover:text-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                </Button>
            </div>
        </form>
    )
}
