import { createBrowserClient } from "@supabase/ssr";


export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export const getUserWithRole = async () => {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        return null;
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
        return null;
    } else {
        console.log("Usuario personalizado con rol:", userData);
        return userData;
    }

}