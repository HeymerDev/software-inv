'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { serverClient } from '@/lib/supabaseClient'
import { CustomUser } from '@/types/types'
import { supabaseAdmin } from './subaseAdminClient'
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

    const authData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const nombre = formData.get("name") as string
    const rol = parseInt(formData.get("rol") as string)


    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        ...authData,
        email_confirm: true
    })

    if (error || data.user?.id) {
        console.log(error)
    }

    const {error: dbError} = await supabase
        .from("users")
        .insert(
            {
                nombre, 
                email: authData.email, 
                contraseña: authData.password, 
                typeuser_id: rol, 
                authId: data.user?.id
            }
        )

    if(dbError) return console.log(dbError);
    
    revalidatePath("/", "layout")
    revalidatePath("/usuarios")
    redirect('/usuarios')
}

export async function logout() {
    const supabase = await serverClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export const getUserWithRoleServer = async () => {
    const supabase = await serverClient();

    const {
        data,
        error: authError,
    } = await supabase.auth.getSession();

    console.log(data.session?.user)

    if (authError || !data) {
        redirect("/login");
    }

    const { data: userData, error: userError } = await supabase
        .rpc("get_user_with_role", { auth_id: data.session?.user.id })
        .single();

    if (userError || !userData) {
        console.log("Error trayendo usuario con función", userError);
    }

    return userData as CustomUser;
};


