// Cloudflare Pages Function
// URL: https://youworldenglish.com/api/recommend-coach
// このファイルはブラウザではなくCloudflareのサーバー側で実行されるため、
// APIキーがユーザーに見えることはありません。

// ── 6名のコーチ情報（index.htmlのコーチ紹介セクションと同じ内容） ──
const COACHES = [
  {
    id: "sato",
    name: "Sato コーチ",
    specialty: "経営コンサル×エグゼクティブ英語",
    price: "税込9,900円 / 1回60分",
    description:
      "実践で通用する英語力を、ビジネス最前線のノウハウで伝授。役員会・国際交渉・多国籍チームマネジメントに強い実務家です。",
  },
  {
    id: "shiota",
    name: "Shiota コーチ",
    specialty: "海外駐在ビジネス英語",
    price: "税込8,800円 / 1回60分",
    description:
      "22年の海外駐在経験から、実践で使えるビジネス英語と交渉力を伝授。現地スタッフとの関係構築・異文化コミュニケーションが専門です。",
  },
  {
    id: "kuno",
    name: "Kuno コーチ",
    specialty: "海外拠点統括×交渉英語",
    price: "税込7,700円 / 1回60分",
    description:
      "香港・ロンドン・上海など海外拠点を15年率い、現地スタッフとの折衝や営業戦略の実行を英語で担ってきた元ゼネラルマネージャー。パリ・ニューヨークの国際展示会でも結果を出してきた交渉で通用する英語を指導します。",
  },
  {
    id: "kaneko",
    name: "Kaneko コーチ",
    specialty: "組織運営×ビジネス英語指導",
    price: "税込7,700円 / 1回60分",
    description:
      "20年以上ビジネス英語を指導する一方、50名規模の講師陣を束ねる学科長として組織運営にも携わってきた指導者。心理学の知見を活かし、「なぜ伝わらないのか」を構造的に解きほぐします。",
  },
  {
    id: "iguchi",
    name: "Iguchi コーチ",
    specialty: "航空現場×実用英語",
    price: "税込7,700円 / 1回60分",
    description:
      "日本航空の国際業務で、誤解が許されない現場の英語を使い続けてきた経験者。実用英検1級と教員免許に裏づけられた丁寧な指導で、社会人の学び直しから航空・旅行業界志望者まで支えます。",
  },
  {
    id: "urasaki",
    name: "Urasaki コーチ",
    specialty: "国際会議通訳×受験英語",
    price: "税込7,700円 / 1回60分",
    description:
      "小池百合子元環境大臣や国連会議など、要人通訳として国際交渉の最前線に立ってきたプロフェッショナル。その場で崩されない英語構成力を、受験・資格試験対策にも活かします。",
  },
];

const SYSTEM_PROMPT = `あなたはYouWorld（ビジネス英語コーチングスクール）の窓口AIです。
ユーザーと対話しながら、状況や目的を深掘りし、最終的に以下6名のコーチの中から最も合う1名（必要なら2名まで）を選び、理由を添えて提案します。

# コーチ一覧（JSON）
${JSON.stringify(COACHES, null, 2)}

# 対話の進め方（重要）
- 一問一答で即答するのではなく、対話を通じてユーザーの状況を具体的に理解することを優先する。
- 原則として1〜2回は、状況を掘り下げる質問（業界、役職、具体的なシーン、困っている点、目指したい姿など）をしてから提案する。ユーザーの最初の入力だけで十分に具体的な場合は、1回の深掘り質問のみでもよい。
- ただし、これまでのユーザーの発言（userロール）が3回に達した場合は、情報が十分でなくても必ず提案（recommendation）を返すこと。それ以上質問を続けてはいけない。
- 同じ内容の質問を繰り返さない。すでに聞いた情報は聞き直さない。
- 質問は1回につき1つだけ。丁寧で、コンサルタントらしい落ち着いた口調（「〜でしょうか」「〜か教えてください」など）。
- 提案する際は、対話の中で分かった具体的な状況（業界・役職・シーンなど）に触れながら理由を説明すること。

# 出力ルール
- 必ず以下のJSON形式のみで出力すること。前置きや説明文、Markdownのコードブロック記号は一切つけない。
- type は "question"（さらに質問する場合）または "recommendation"（コーチを提案する場合）のいずれか。
- type が "question" の場合、message には次の質問文のみを入れる（recommendations は空配列でよい）。
- type が "recommendation" の場合、message には提案の導入となる短い一文（1文程度）を入れ、recommendations に選んだコーチを入れる。reason は日本語で2〜3文、ユーザーとの対話内容と、選んだコーチの専門性を具体的に結びつけて説明すること。
- coachId は上記一覧の id フィールドの値をそのまま使うこと。

# 出力フォーマット
質問する場合：
{"type":"question","message":"...次の質問文...","recommendations":[]}

提案する場合：
{"type":"recommendation","message":"...導入の一文...","recommendations":[{"coachId":"xxxx","reason":"..."}]}
`;

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "リクエストの形式が正しくありません。" }, 400);
  }

  const rawMessages = Array.isArray(body?.messages) ? body.messages : null;
  const sessionId = (body?.sessionId || "").toString().slice(0, 100);

  if (!rawMessages || rawMessages.length === 0) {
    return jsonResponse({ error: "会話の内容が空です。" }, 400);
  }
  if (rawMessages.length > 20) {
    return jsonResponse({ error: "会話が長すぎます。ページを再読み込みして最初からお試しください。" }, 400);
  }

  const messages = [];
  for (const m of rawMessages) {
    const role = m?.role === "assistant" ? "assistant" : m?.role === "user" ? "user" : null;
    const content = (m?.content || "").toString().slice(0, 1000);
    if (!role || !content.trim()) {
      return jsonResponse({ error: "会話の形式が正しくありません。" }, 400);
    }
    messages.push({ role, content });
  }

  if (!env.OPENAI_API_KEY) {
    return jsonResponse(
      { error: "サーバー側の設定が未完了です（APIキー未設定）。管理者にご連絡ください。" },
      500
    );
  }

  try {
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 500,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error("OpenAI API error:", apiRes.status, errText);
      return jsonResponse({ error: "AI診断中にエラーが発生しました。時間をおいて再度お試しください。" }, 502);
    }

    const data = await apiRes.json();
    const rawText = data.choices?.[0]?.message?.content;
    if (!rawText) {
      return jsonResponse({ error: "AIからの応答を取得できませんでした。" }, 502);
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse failed:", rawText);
      return jsonResponse({ error: "AIの応答を解析できませんでした。" }, 502);
    }

    if (parsed.type === "question") {
      logTurn(context, {
        sessionId,
        turnNumber: countUserTurns(messages),
        userMessage: messages[messages.length - 1]?.content || "",
        aiType: "question",
        aiMessage: parsed.message || "",
        recommendedCoach: "",
      });
      return jsonResponse({ type: "question", message: parsed.message || "" });
    }

    const recommendations = (parsed.recommendations || [])
      .map((r) => {
        const coach = COACHES.find((c) => c.id === r.coachId);
        if (!coach) return null;
        return { coach, reason: r.reason || "" };
      })
      .filter(Boolean);

    if (recommendations.length === 0) {
      return jsonResponse({ error: "該当するコーチを見つけられませんでした。" }, 502);
    }

    logTurn(context, {
      sessionId,
      turnNumber: countUserTurns(messages),
      userMessage: messages[messages.length - 1]?.content || "",
      aiType: "recommendation",
      aiMessage: parsed.message || "",
      recommendedCoach: recommendations.map((r) => r.coach.name).join(" / "),
    });

    return jsonResponse({ type: "recommendation", message: parsed.message || "", recommendations });
  } catch (err) {
    console.error("Unexpected error:", err);
    return jsonResponse({ error: "予期しないエラーが発生しました。" }, 500);
  }
}

function countUserTurns(messages) {
  return messages.filter((m) => m.role === "user").length;
}

function logTurn(context, payload) {
  const { env } = context;
  if (!env.GAS_LOG_URL) return; // 未設定の場合は記録をスキップ（機能自体は問題なく動く）

  const task = fetch(env.GAS_LOG_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error("Log webhook failed:", err);
  });

  if (typeof context.waitUntil === "function") {
    context.waitUntil(task);
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
