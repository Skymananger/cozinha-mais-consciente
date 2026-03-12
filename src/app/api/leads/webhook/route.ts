import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, source, url, consent } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nome e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Consentimento LGPD é obrigatório." },
        { status: 400 }
      );
    }

    // Log local para debug
    console.log("Novo lead recebido:", {
      name,
      phone,
      source,
      url,
      consent,
      timestamp: new Date().toISOString(),
    });

    // Forward para o CRM via webhook
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    const crmWebhookSecret = process.env.CRM_WEBHOOK_SECRET;

    if (crmWebhookUrl && crmWebhookSecret) {
      try {
        const crmPayload = {
          pipelineType: "DIGN",
          prospectName: name,
          prospectPhone: phone,
          estimatedValue: 0,
          stage: "Leads",
          source: source || "portal-cozinha",
          sourceUrl: url || "",
          consentLgpd: true,
          consentDate: new Date().toISOString(),
        };

        const crmResponse = await fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crmWebhookSecret}`,
          },
          body: JSON.stringify(crmPayload),
        });

        if (!crmResponse.ok) {
          const errorData = await crmResponse.text();
          console.error("Erro ao enviar lead para CRM:", crmResponse.status, errorData);
          // Não retorna erro ao usuário — o lead foi capturado localmente
        } else {
          console.log("Lead encaminhado ao CRM com sucesso.");
        }
      } catch (crmError) {
        console.error("Erro de conexão com CRM:", crmError);
        // Silencia o erro para o usuário — o lead foi registrado no log
      }
    } else {
      console.warn(
        "CRM_WEBHOOK_URL ou CRM_WEBHOOK_SECRET não configurados. Lead salvo apenas localmente."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead capturado com sucesso.",
    });
  } catch (error) {
    console.error("Erro interno no webhook de leads:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
