"use client";
import React from "react";
import { CardContent, CardFooter } from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";
import { Button } from "./button";
import { signIn } from "@/lib/auth";

export const Form = () => {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
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
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="mt-10">
        <Button className="w-full" type="submit" variant="secondary">
          Iniciar Sesion
        </Button>
      </CardFooter>
    </form>
  );
};
