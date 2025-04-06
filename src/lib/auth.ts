import { supabase } from "./supabaseClient";

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    console.log(data.user, "usuario logueado"); // Imprime el usuario correctamente
    return data.user; // Retorna el usuario correctamente
};

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export const signOut = async () => {
    await supabase.auth.signOut();
};
