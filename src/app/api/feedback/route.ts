import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { helpful, comment, articleSlug, articleTitle } = await request.json();

    // Podemos usar o mesmo banco de leads se for necessário, 
    // ou um específico se o usuário configurar NOTION_FEEDBACK_DATABASE_ID.
    // Por enquanto, usaremos o LEADS_DATABASE_ID para não travar a funcionalidade.
    const databaseId = process.env.NOTION_FEEDBACK_DATABASE_ID || process.env.NOTION_LEADS_DATABASE_ID;

    if (!databaseId) {
      return NextResponse.json(
        { error: 'Notion Database ID not configured' },
        { status: 500 }
      );
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Nome': {
          title: [
            {
              text: {
                content: `Feedback: ${articleTitle}`,
              },
            },
          ],
        },
        'E-mail': {
          email: 'feedback@sistema.com', // Placeholder para manter compatibilidade com schema de leads
        },
        'Telefone': {
          phone_number: helpful ? 'UTIL' : 'NAO_UTIL',
        },
        'Texto': {
          rich_text: [
            {
              text: {
                content: `Slug: ${articleSlug}\n\nComentário: ${comment || 'Sem comentário'}`,
              },
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving feedback to Notion:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save feedback' },
      { status: 500 }
    );
  }
}
