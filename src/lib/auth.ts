'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { serverClient } from '@/lib/supabaseClient'
import { CustomUser } from '@/types/types'
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

    const {
        data,
        error: authError,
    } = await supabase.auth.getSession();

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


