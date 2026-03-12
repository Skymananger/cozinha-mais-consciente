import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleSlug, articleTitle, platform, timestamp } = body;

    if (!articleSlug || !platform) {
      return NextResponse.json(
        { error: "articleSlug e platform são obrigatórios." },
        { status: 400 }
      );
    }

    // Always log locally
    console.log("📤 Share registrado:", {
      articleSlug,
      articleTitle,
      platform,
      timestamp: timestamp || new Date().toISOString(),
    });

    // Optional: Forward to Notion
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDbId = process.env.NOTION_SHARES_DB_ID;

    if (notionApiKey && notionDbId) {
      try {
        const notionResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify({
            parent: { database_id: notionDbId },
            properties: {
              Artigo: {
                title: [{ text: { content: articleTitle || articleSlug } }],
              },
              Plataforma: {
                select: { name: platform },
              },
              URL: {
                url: `https://cozinhamaisconsciente.com.br/artigo/${articleSlug}`,
              },
              Data: {
                date: { start: timestamp || new Date().toISOString() },
              },
            },
          }),
        });

        if (!notionResponse.ok) {
          const errorText = await notionResponse.text();
          console.error("Erro ao registrar share no Notion:", notionResponse.status, errorText);
        } else {
          console.log("Share registrado no Notion com sucesso.");
        }
      } catch (notionError) {
        console.error("Erro de conexão com Notion:", notionError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no endpoint /api/shares:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
