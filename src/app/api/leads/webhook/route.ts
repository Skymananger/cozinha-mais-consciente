import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = "[TOKEN_DEFINIDO_PELO_DESENVOLVEDOR]"; // O usuário deve definir isso no env

    if (authHeader !== `Bearer ${token}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nome, email, whatsapp, origem, mensagem } = body;

    if (!nome || !whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Aqui seria a integração com banco de dados ou disparo de e-mail/notificação
    console.log("Novo lead recebido:", { nome, email, whatsapp, origem, mensagem, timestamp: new Date() });

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
