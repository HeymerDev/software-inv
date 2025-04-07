import React from "react";
import { login } from "@/lib/auth";
import { CardContent, CardFooter } from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Button } from "./button";
// import { signIn } from "@/lib/auth";

export const Form = () => {
  return (
    <form>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="mt-10">
        <Button className="w-full" formAction={login} variant="secondary">
          Iniciar Sesion
        </Button>
      </CardFooter>
    </form>
  );
};
