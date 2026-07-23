// Cloudflare Pages Function
// URL: https://youworldenglish.com/api/recommend-coach
// このファイルはブラウザではなくCloudflareのサーバー側で実行されるため、
// APIキーがユーザーに見えることはありません。

// ── 6名のコーチ情報（index.htmlのコーチ紹介セクションと同じ内容） ──
const COACHES = [
  {
    id: "sato",
    name: "Sato コーチ",
    specialty: "外資系企業経営×グローバル交渉英語",
    price: "税込9,900円 / 1回60分",
    keywords: [
      "化学業界", "素材業界", "機械業界", "電気業界", "役員会", "経営交渉", "事業戦略",
      "代表取締役", "社長", "事業部長", "マーケティング責任者", "人材採用・育成・評価",
      "海外拠点の立ち上げ", "中長期経営計画", "組織マネジメント",
    ],
    description:
      "化学・素材業界の外資系企業Dow Chemical社に32年間勤務し、うち米国本社勤務を2度、計6年間経験。アジア太平洋地区事業本部長として10年間、北米・東南アジア・中国・台湾・香港・韓国・インド・オセアニアなど多地域の経営とマーケティングを英語で統括した。役員会でのプレゼンテーション、事業会議、交渉を英語で担当した実務期間は15年以上に及ぶ。その後、Owens Corning Japan合同会社の社長（2011〜2016年）として米国本社役員会に参加し、投資案件や事業戦略を英語で報告・交渉。続いてインド系企業Steer Japanの代表取締役社長（2016〜2025年）として、インド本社役員との経営会議を英語でリードし、売上増加・利益改善・人事戦略を推進した。早稲田大学ビジネススクール、テンプル大学日本校、名古屋商科大学ビジネススクールでマーケティング分野の特別講師も務めている。指導分野は、英語での会議発言・反論・ディスカッションの進め方、ビジネスメールの構成とクロージング、役員会レベルのプレゼンテーション実践、海外企業との交渉・利害調整まで幅広い。コンサルティング分野として、経営戦略の策定と実行支援、交渉戦略の立案、多国籍企業の組織マネジメント支援、人材採用・育成・評価の仕組み構築、中長期経営計画の策定と目標管理、海外拠点の立ち上げ・運営プランの相談にも対応する。対面（目黒駅、都内、横浜、川崎、東横線沿線周辺）・オンラインどちらにも対応。",
  },
  {
    id: "shiota",
    name: "Shiota コーチ",
    specialty: "海外駐在×市場開拓ビジネス英語",
    price: "税込8,800円 / 1回60分",
    keywords: [
      "精密化学業界", "写真フイルム業界", "中東", "ドバイ", "インド", "ニューデリー",
      "ブラジル", "サンパウロ", "調達", "価格交渉", "海外駐在準備", "駐在員", "現地法人",
      "サプライヤー交渉", "帯同家族",
    ],
    description:
      "写真フイルム・精密化学メーカーの富士フイルムに37年間勤務し、東京本社の海外営業本部を経て、中東駐在（ドバイ、約7年）、インド駐在（ニューデリー、約7年）、ブラジル駐在（サンパウロ、約6年）と、計22年間にわたり海外現地法人での実務を担当した。帰国後は東京本社の経営企画本部で海外業務・調達グループを歴任し、グローバルサプライヤーとの価格交渉や本社間オンライン会議の逐次通訳も経験している。指導分野は、現地での販路開拓・価格交渉といった実務レベルの英語表現に加え、海外駐在準備（ビジネス交渉、文化理解、現地対応、帯同家族関連の生活面まで）を英語面からサポートするコンサルティングも含む。多文化環境での効果的なビジネス英語コミュニケーション、英語による契約交渉や価格交渉の実践的指導、英語メールや報告書・プレゼンテーション作成の指導、海外ビジネスに必要な英語表現・マナーのコンサルティングにも対応する。TOEICは2014年に960点、2022年にも945点を取得しており、実務で培った英語力を維持し続けている。対面（西船橋駅・本八幡駅周辺）・オンラインともに月〜日で対応し、時間は個別相談が可能。",
  },
  {
    id: "kuno",
    name: "Kuno コーチ",
    specialty: "海外拠点統括×交渉英語",
    price: "税込7,700円 / 1回60分",
    keywords: [
      "香港", "ロンドン", "バンコク", "上海", "海外営業", "海外拠点統括", "国際展示会",
      "現地スタッフマネジメント", "ゼネラルマネージャー", "営業戦略", "大学受験英語",
    ],
    description:
      "1993年から2016年までの通算15年間、香港・ロンドン・バンコク・上海で海外駐在員として勤務。ヨークス株式会社では海外部部長（General Manager for overseas business、2008〜2016年）として、上海の小規模営業拠点とナポリ（イタリア）の営業拠点、中国の主力工場を含む海外営業全体を8年間統括し、2015年には100万ドル規模の売上を達成した。パリのメゾン・エ・オブジェ、ニューヨークやラスベガスのAGENDA展示会にも出展しており、海外営業・交渉の実務経験は通算20年以上に及ぶ。現在は大手進学塾TOMASで英語文法・長文読解の講師として、京大・早稲田・GMARCHなど難関大学受験英語対策を担当する一方、社会人向けのビジネス英語指導もオンラインで実施している。指導分野は、海外拠点マネジメント経験に基づく交渉英語、海外取引先との折衝、現地スタッフとのコミュニケーション・モチベーション管理、国際展示会で通用する実務英語、本社方針を現地に伝えるマネジメント英語など。対面（目黒駅、三軒茶屋駅、渋谷駅周辺）は金〜土10:00〜13:00、オンラインは木〜日10:00〜20:00で対応している。",
  },
  {
    id: "kaneko",
    name: "Kaneko コーチ",
    specialty: "組織運営×ビジネス英語指導",
    price: "税込7,700円 / 1回60分",
    keywords: [
      "組織運営", "講師マネジメント", "講師研修", "心理学", "学習継続", "モチベーション維持",
      "英語学習の挫折", "キャリア支援", "履歴書作成", "面接対策", "旅行英語", "日常会話",
    ],
    description:
      "英会話講師として20年以上のキャリアを持ち、学校法人東京ドリームでは学科長として、常勤講師9名・非常勤講師34名、計43名の講師陣を統括する組織運営を経験した。大手英会話スクールのイーオンでは2001年から2015年まで14年間、10歳から80歳までの幅広い年齢層に英会話を指導し、教務主任として教室運営・人事・講師指導にも携わった。教員・講師向けの指導研修、英語講座の企画・運営、新規プロジェクトの立ち上げなど、指導現場のマネジメント経験も豊富。米国コロラド州立大学で心理学部社会心理学科を卒業しており、心理学の知見を活かして「なぜ伝わらないのか」「なぜ続かないのか」を構造的に解きほぐす指導スタイルが強み。指導分野は、初心者から上級者までの英会話、旅行英語や日常会話、ビジネス英語（会議・商談・メール・電話応対）、英語面接・履歴書作成などキャリア支援型の英語、長期的な学習計画の立案とサポート、学習モチベーション維持を含む心理面のサポートまで幅広い。TOEIC920点。対面（池袋、白山、東大前、本駒込駅周辺）・オンラインともに、火・水・金は19:30以降、土日祝は9:00〜22:00で対応している。",
  },
  {
    id: "iguchi",
    name: "Iguchi コーチ",
    specialty: "航空現場×実用英語",
    price: "税込7,700円 / 1回60分",
    keywords: [
      "航空業界", "客室乗務員", "グランドスタッフ", "空港英語", "海外旅行英会話",
      "面接対策", "アメリカ文化", "英語圏マナー", "英検準1級", "英検1級",
    ],
    description:
      "日本航空株式会社（従業員約12,000名）に1986年から約39年間勤務し、シニアマネージャーとして国際業務の最前線で、誤解が許されない現場の英語を実践的に使い続けてきた。高校時代の2年間を米国イリノイ州の高校で過ごし、現地で英語力の基礎を固めるとともに、実体験に基づいたアメリカ文化や英語圏のマナーの理解を深めた。実用英語技能検定1級（1982年取得）、TOEFL650点（1983年）、日商英文タイプB級（1983年）、中学・高校の英語科・社会科教諭免許（1986年）、気象予報士（2010年）と、複数の資格を保有している。指導分野は、航空業界志望者向けの業界英語・面接対策、航空・観光業界を含む英語面接や自己紹介の練習、海外旅行で役立つ実用英会話（空港・ホテル・観光地対応）、英語によるビジネスメールや電話対応の基礎、実体験に基づいたアメリカ文化・英語圏マナーの紹介、英検準1級〜1級対策など。航空業界での長年の現場経験を活かし、実用性とやさしさを両立した丁寧な指導を心がけている。対面（山手線沿線、りんかい線沿線、京急本線沿線など）・オンラインともに月〜日9:00〜21:00で対応している。",
  },
  {
    id: "urasaki",
    name: "Urasaki コーチ",
    specialty: "国際会議通訳×高難度交渉英語",
    price: "税込7,700円 / 1回60分",
    keywords: [
      "国際会議通訳", "VIP対応", "要人通訳", "大学受験英語", "難関大学", "逆転合格",
      "医療従事者", "弁護士", "専門職", "スピーチ対策", "プレゼンテーション対策",
    ],
    description:
      "予備校講師として30年以上のキャリアを持ち、沖縄受験ゼミナール（2003年〜）、昴・即解ゼミ（2022年〜）で、これまで1万人以上の生徒を大学合格へ導いてきた。教え子には東京大学・京都大学・早慶合格者も多く、卒業後は医師・教員・看護師・公務員など様々な分野で活躍している。国立大学2次試験でE判定からの逆転合格指導も得意とし、弁護士・医療従事者など専門職の目標に応じた個別カリキュラムにも柔軟に対応してきた。教育者としての顔に加え、国際会議の通訳・翻訳者としても活動しており、小池百合子元環境大臣のクールビズ会議での通訳、国連会議やIDB世界銀行会議でのVIP通訳・翻訳、小泉純一郎元首相出席の島嶼サミットでの外務省付き翻訳、皇太子（当時）ご出席のIDB会議でのVIP通訳、沖縄大学院大学への学生引率時の博士陣の授業の同時通訳など、要人対応の実績を多数持つ。中学・高校の英語教諭免許を保有し、リスニング・スピーキング・英語4技能の総合指導から、英検・TOEIC・TOEFL対策、スピーチ・プレゼンテーション対策まで幅広く対応する。指導では、生徒を励ましやる気を引き出すことを重視し、通訳・翻訳スキルに裏づけられた国際感覚を交えた指導を行う。オンラインで日曜日9:00〜22:00に対応している。",
  },
];

const SYSTEM_PROMPT = `あなたはYouWorld（ビジネス英語コーチングスクール）の窓口AIです。
ユーザーと対話しながら、状況や目的を深掘りし、最終的に以下6名のコーチの中から最も合う1名（必要なら2名まで）を選び、理由を添えて提案します。

# コーチ一覧（JSON）
${JSON.stringify(COACHES, null, 2)}

各コーチのkeywordsフィールドは、その人が対応できる業界・役職・相談パターンの代表例です。ユーザーの発言にkeywordsと一致・類似する単語（業界名、役職、シーンなど）が出てきた場合は、それを強いマッチングの手がかりとして扱ってください。

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
- coachId は上記一覧の id フィールドの値を、大文字小文字・スペースを含めて一字一句そのまま使うこと。有効な値は次の6つのみ： sato, shiota, kuno, kaneko, iguchi, urasaki。それ以外の値やこれらに似た表記（例：Sato、sato_coach、佐藤）は絶対に使わないこと。
- ユーザーの回答が曖昧・情報不足（「わからない」など）でも、これまでの対話全体から読み取れる範囲で、必ず上記6つのいずれかを1名以上選んで提案すること。「該当者なし」という判断は禁止する。判断材料が少ない場合は、reasonの中でその旨を正直に伝えつつも、最も可能性の高いコーチを選ぶこと。

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
    let result = await parseModelResponse(data);

    if (result.needsRetry) {
      console.error("Invalid/empty recommendation on first attempt, retrying:", result.rawText);
      const retryRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 500,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            {
              role: "system",
              content:
                "直前の出力が無効でした。coachIdは必ず sato, shiota, kuno, kaneko, iguchi, urasaki のいずれか一字一句そのままを使い、これまでの対話全体から最も可能性の高いコーチを1名以上、必ずtype:\"recommendation\"で選んで出力し直してください。",
            },
          ],
        }),
      });

      if (retryRes.ok) {
        const retryData = await retryRes.json();
        result = await parseModelResponse(retryData);
      }
    }

    if (result.error) {
      return jsonResponse({ error: result.error }, 502);
    }

    const { parsed } = result;

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
        const normalizedId = (r.coachId || "").toString().trim().toLowerCase();
        const coach = COACHES.find((c) => c.id === normalizedId);
        if (!coach) return null;
        return { coach, reason: r.reason || "" };
      })
      .filter(Boolean);

    if (recommendations.length === 0) {
      return jsonResponse(
        {
          error:
            "うまく絞り込めませんでした。もう少し具体的に（業界、役職、困っている場面など）教えていただくか、下のコーチ一覧から直接お選びください。",
        },
        502
      );
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

async function parseModelResponse(data) {
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) {
    return { error: "AIからの応答を取得できませんでした。" };
  }

  let parsed;
  try {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    console.error("JSON parse failed:", rawText);
    return { needsRetry: true, rawText };
  }

  if (parsed.type === "recommendation") {
    const hasValidId = (parsed.recommendations || []).some((r) =>
      COACHES.some((c) => c.id === (r.coachId || "").toString().trim().toLowerCase())
    );
    if (!hasValidId) {
      return { needsRetry: true, rawText };
    }
  }

  return { parsed };
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
