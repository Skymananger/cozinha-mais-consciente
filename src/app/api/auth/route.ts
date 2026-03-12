import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.EDITOR_PASSWORD || 'consciencia2026'; // Fallback

    if (password === correctPassword) {
      const cookieStore = await cookies();
      cookieStore.set('editor_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 Week
        path: '/',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Senha incorreta.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erro no servidor.' }, { status: 500 });
  }
}
