'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { serverClient } from '@/lib/supabaseClient'
export async function login(formData: FormData) {
    const supabase = await serverClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}
export async function signup(formData: FormData) {
    const supabase = await serverClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signUp(data)
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await serverClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export const getUserWithRoleServer = async () => {
    const supabase = await serverClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/login");
    }

    // Obtener el usuario personalizado con su rol
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select(
            `
    id,
    nombre,
    email,
    typeuser: typeuser_id (
      id,
      nombre
    )
  `
        )
        .eq("user-authId", authData.user.id)
        .single();

    if (userError) {
        console.error("Error trayendo el usuario personalizado", userError);
    } else {
        console.log("Usuario personalizado con rol:", userData);
        return userData;
    }
}

