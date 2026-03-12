import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, cidade } = await request.json();

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Name, email and whatsapp are required' },
        { status: 400 }
      );
    }

    const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

    if (!databaseId) {
      return NextResponse.json(
        { error: 'Notion Database ID is not configured in .env.local' },
        { status: 500 }
      );
    }

    // Insert into Notion Database
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Nome': { // Changed from 'Name'
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        'E-mail': { // Changed from 'Email'
          email: email,
        },
        'Telefone': { // Changed from 'WhatsApp'
          phone_number: whatsapp,
        },
        'Texto': { // Changed from 'Cidade'
          rich_text: [
            {
              text: {
                content: cidade,
              },
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Lead salvo com sucesso!' });
  } catch (error: any) {
    console.error('Error saving lead to Notion:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save lead' },
      { status: 500 }
    );
  }
}
