import type {
  Project,
  SkillCategory,
  NumberStat,
  JourneyItem,
  ResearchStep,
} from '../types'
import type { L } from '../i18n'

/* ═══════════════ 基本情報 ═══════════════ */

export const meta = {
  name: '沓脱 聖',
  nameEn: 'Hijiri Kutsunugi',
  email: 'hijiri.kutsunugi@gmail.com',
  github: 'https://github.com/HJRKTNG',
  badge: {
    ja: 'AVAILABLE FOR INTERNSHIP · 29卒',
    en: 'AVAILABLE FOR INTERNSHIP · CLASS OF 2029',
  } as L,
  affiliation: {
    ja: '九州大学 工学部 電気情報工学科 4年 → 大学院進学決定（2029年3月修了見込み）',
    en: 'B4 @ Kyushu University → M.S. confirmed, graduating Mar 2029',
  } as L,
  targetRoles: [
    { ja: 'AI エンジニア', en: 'AI Engineer' },
    { ja: 'IT コンサルタント', en: 'IT Consultant' },
    { ja: 'PM / PdM', en: 'PM / PdM' },
  ] as L[],
  ctaProjects: { ja: 'プロジェクトを見る', en: 'View Projects' } as L,
}

export const heroTyped = {
  ja: [
    'AIとWebで、使えるものを作る。',
    '制約の中で、本質を設計する。',
    '自走しながら、形にする。',
  ],
  en: [
    'Building things people actually use.',
    'Designing what matters, under constraints.',
    'Self-driven, from idea to production.',
  ],
}

/* ═══════════════ 数字で見る ═══════════════ */

export const numbers: NumberStat[] = [
  {
    value: 700,
    prefix: '~',
    suffix: { ja: '人', en: '' },
    label: {
      ja: '来場イベントのシステムを単独開発・運用',
      en: 'event visitors served by a system I built alone',
    },
  },
  {
    value: 15,
    suffix: { ja: '+', en: '+' },
    label: {
      ja: '個人・チームで作ったプロジェクト',
      en: 'projects built solo and in teams',
    },
  },
  {
    value: 7,
    suffix: { ja: '年目', en: ' yrs' },
    label: {
      ja: 'ものづくり歴 — 高校物理部から現在まで',
      en: 'of building things, since high-school physics club',
    },
  },
  {
    value: 2,
    suffix: { ja: '本', en: '' },
    label: {
      ja: 'App Store 公開準備中のアプリ',
      en: 'apps heading to the App Store',
    },
  },
]

/* ═══════════════ About ═══════════════ */

export const about = {
  intro: {
    ja: `九州大学工学部電気情報工学科の4年生です。
AIやWebを使って「実際に使われるもの」を自分で設計・実装し、運用まで持っていく開発が好きです。
約700人が来場したイベントの参加型ゲームサイトの単独開発・運用、企業からの受託開発、リアルタイム対戦ゲームなど、課題を見つけて自走しながら形にしてきました。`,
    en: `I'm a senior at Kyushu University (Electrical Engineering and Computer Science).
I love designing, building and operating software that people actually use — with AI and the web as my main tools.
Highlights include solo-building the interactive game site for a ~700-visitor event, contract development for a startup, and a real-time multiplayer game.`,
  } as L,
  goals: {
    ja: `大学院（システム情報科学府 情報理工学専攻・2026年7月合格）ではRAG・知識グラフの研究を深めながら、AIエンジニア・ITコンサルタント・PM/PdMとして、現場の技術が分かる立場から「AIを本当に使える形にする」仕事を目指しています。`,
    en: `Starting my master's at Kyushu University (Information Science, admitted July 2026), I'll deepen my RAG / knowledge-graph research — aiming to become an engineer-turned-consultant/PM who makes AI genuinely usable in the real world.`,
  } as L,
  abroad: {
    ja: '2026年夏、Micron財団・東京エレクトロン支援の日米半導体人材育成プログラム「UPWARDS」で米国 Virginia Tech に滞在（7/28〜8/9）。',
    en: 'Summer 2026: studying at Virginia Tech (US) through UPWARDS, a Japan-US semiconductor talent program backed by the Micron Foundation and Tokyo Electron.',
  } as L,
  profile: [
    {
      label: { ja: '大学', en: 'University' } as L,
      value: { ja: '九州大学', en: 'Kyushu University' } as L,
      sub: { ja: '工学部 電気情報工学科 4年', en: 'B4, Electrical Eng. & Computer Science' } as L,
    },
    {
      label: { ja: '大学院', en: 'Grad School' } as L,
      value: { ja: '進学決定（2026年7月合格）', en: 'M.S. confirmed (July 2026)' } as L,
      sub: { ja: 'システム情報科学府 情報理工学専攻', en: 'Dept. of Information Science and Technology' } as L,
    },
    {
      label: { ja: '出身校', en: 'High School' } as L,
      value: { ja: '開成高等学校', en: 'Kaisei Senior High School' } as L,
    },
    {
      label: { ja: '居住地', en: 'Based in' } as L,
      value: { ja: '福岡', en: 'Fukuoka, Japan' } as L,
    },
  ],
}

/* ═══════════════ Journey（歩み） ═══════════════ */

export const journey: JourneyItem[] = [
  {
    year: '2019',
    title: { ja: '開成高等学校・物理部 副部長', en: 'Kaisei High — Physics Club VP' },
    body: {
      ja: 'デスクトップとノートPCの違いも分からない状態から、アナログ回路・LED制御・プログラミングへ。高3ではUnityでゲームを作り、自作のアナログ入力コントローラーと組み合わせた。',
      en: "Started from zero PC knowledge — analog circuits, LED control, then programming. By senior year, built a Unity game driven by a hand-made analog controller.",
    },
  },
  {
    year: '2023',
    title: { ja: '九州大学 入学', en: 'Entered Kyushu University' },
    body: {
      ja: '工学部 電気情報工学科へ。生成AIの登場に衝撃を受け、自ら課金して新しいモデルやツールを触り続ける日々が始まる。',
      en: 'Electrical Engineering & Computer Science. The rise of generative AI hit hard — started paying out of pocket to try every new model and tool.',
    },
  },
  {
    year: '2025',
    title: { ja: '作り切った1年', en: 'The year of shipping' },
    body: {
      ja: 'ベンチャー企業から受託した1on1支援ツールを二人で開発・納品。約700人来場イベントのゲームサイトを単独開発・運用。端末間共有サービス「ミニリンク」を公開。',
      en: 'Delivered a contracted 1on1 support tool as a two-person team. Solo-built and operated the game site for a ~700-visitor event. Launched Minilink, a cross-device sharing service.',
    },
  },
  {
    year: '2026',
    title: { ja: '研究と挑戦', en: 'Research and new challenges' },
    body: {
      ja: 'RAG×知識グラフの卒業研究に没頭。福岡未踏2026へ3D姿勢推定を提案。大学院合格（小野研究室）。UPWARDSでVirginia Techへ。リアルタイム対戦ゲームなどアプリ2本を公開準備中。',
      en: 'Deep in RAG × knowledge-graph research. Proposed a 3D pose-estimation project to MITOU Fukuoka 2026. Admitted to grad school (Ono Lab). Heading to Virginia Tech via UPWARDS. Two apps on the way to the App Store.',
    },
  },
]

/* ═══════════════ Projects ═══════════════ */

export const projects: Project[] = [
  /* ── Featured ── */
  {
    id: 'goun-fes',
    title: 'GOUN FES FUKUOKA',
    subtitle: {
      ja: '約700人来場イベントの参加型ゲームサイト',
      en: 'Interactive game platform for a ~700-visitor festival',
    },
    category: 'web',
    description: {
      ja: '総資金約1,000万円規模の若者向けイベントで、QR付きリストバンドで参加者を識別する投票・抽選システム（7ページ構成）を一人で設計・開発・運用。',
      en: 'For a youth festival with a ¥10M budget, I solo-designed, built and operated a 7-page voting & lottery platform where visitors are identified by QR wristbands.',
    },
    problem: {
      ja: '提供されたサーバーはメモリ4GBの低スペックVPS。負荷試験の結果、想定ピークの同時投票には耐えられないことが判明した。',
      en: 'The provided server was a low-spec 4GB VPS. Load testing showed it could not survive the expected peak of simultaneous votes.',
    },
    approach: {
      ja: '「負荷が立つのは全員が同じ瞬間に投票するから。処理を分散しても、体験が“同時”に見えれば成立する」と仮説を立て、リクエスト送信をランダムにずらしつつ、画面の残り秒数表示だけを全員で同期させる制御を設計した。',
      en: 'My hypothesis: the spike exists only because everyone votes at the same instant — spread the actual requests, keep the experience looking synchronized. So requests fire with randomized delays while every screen shows the same countdown.',
    },
    highlights: [
      {
        ja: '対策前の倍近い負荷まで安定して捌けることを負荷試験で確認',
        en: 'Load tests confirmed stability at nearly 2× the pre-fix breaking point',
      },
      {
        ja: '当日は約600〜700人・QRリストバンド運用を大きなトラブルなく完走',
        en: 'Ran the event day for ~600–700 visitors with QR wristbands, no major incidents',
      },
      {
        ja: '要件整理から実装・本番運用まで一人で一貫して担当',
        en: 'Owned everything solo: requirements, implementation, and production ops',
      },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'GitHub Actions', 'PM2'],
    period: '2025.11 – 2026.01',
    githubUrl: 'https://github.com/HJRKTNG/GOUNFESGAME',
    status: 'live',
    featured: true,
  },
  {
    id: 'minilink',
    title: 'Minilink',
    subtitle: {
      ja: 'PCとiPhone間の「ちょっと送りたい」を3秒で',
      en: 'Cross-device sharing in three seconds',
    },
    category: 'web',
    description: {
      ja: 'WindowsとiPhone間で、アプリ不要・ログイン不要でファイルやテキストを瞬時に共有できるWebサービス。公開中。',
      en: 'A web service for instantly sharing files and text between Windows and iPhone — no app, no login. Live now.',
    },
    problem: {
      ja: 'LINE経由のデバイス間共有は、ログイン・送信・コピーの手間が多すぎた。',
      en: 'Sharing between my own devices via chat apps meant logging in, sending, copying — far too many steps.',
    },
    approach: {
      ja: '「共有のたびに認証で待たせたら意味がない」と考え、ルームID+トークンのステートレス認証で、期限切れや401エラーをユーザーに見せずに自動復旧する“透過的な認証”を設計した。',
      en: 'Authentication friction would defeat the purpose — so I designed transparent auth: stateless room-ID + token, with silent auto-recovery from expiry and 401s.',
    },
    highlights: [
      {
        ja: '6桁ルームID+QRコードで即アクセスできる導線設計',
        en: 'Instant access via 6-digit room IDs and QR codes',
      },
      {
        ja: 'Cloudflare R2へのマルチパートアップロードを実装',
        en: 'Multipart uploads to Cloudflare R2',
      },
      {
        ja: 'トークン期限切れを透過的に自動復旧する認証設計',
        en: 'Auth layer that self-heals token expiry, invisible to the user',
      },
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare R2'],
    period: '2025.10 – 2025.12',
    liveUrl: 'https://minilink.jp/',
    githubUrl: 'https://github.com/HJRKTNG/minilink',
    status: 'live',
    featured: true,
  },
  {
    id: 'hakogame',
    title: 'HakoGame',
    subtitle: {
      ja: 'リアルタイム早押しクイズ — 公平さを設計する',
      en: 'Real-time quiz battles — engineering fairness',
    },
    category: 'game',
    description: {
      ja: '最大4人で遊べるオンライン早押しヒントクイズ。ヒントから正解を連想し、ひらがな入力の速さを競う。App Store公開準備中。',
      en: 'An online buzzer-quiz game for up to 4 players — guess from hints, type fast, win. Heading to the App Store.',
    },
    problem: {
      ja: '端末ごとに時計がズレる中で、「誰が最初に押したか」をどう公平に判定するか。通信切断やホスト離脱にも耐える必要があった。',
      en: 'Every device clock is different — so how do you fairly decide who buzzed first? And the game must survive disconnects and host dropouts.',
    },
    approach: {
      ja: '端末の時計は一切信用せず、Firestoreのサーバータイムスタンプだけで順位を確定する設計に。切断はホスト権限の自動委譲と途中復帰（再入室）で吸収した。',
      en: "Trust no client clock: rankings are decided solely by Firestore server timestamps. Disconnects are absorbed by automatic host migration and seamless rejoining.",
    },
    highlights: [
      {
        ja: 'serverTimestamp による端末時計に依存しない公平な早押し判定',
        en: 'Fair buzzer ranking, independent of client clocks',
      },
      {
        ja: 'ホスト切断時の動的権限委譲・途中復帰（再入室）',
        en: 'Dynamic host migration and mid-game rejoin',
      },
      {
        ja: 'Firestoreセキュリティルールのユニットテスト14件をCIで自動検証',
        en: '14 Firestore security-rule unit tests running in CI',
      },
    ],
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'GitHub Actions'],
    period: '2026.05 –',
    status: 'wip',
    featured: true,
    note: {
      ja: 'リポジトリはアプリ公開準備のため非公開',
      en: 'Repository private until app release',
    },
  },

  /* ── More ── */
  {
    id: '1on1',
    title: '1on1 Support Tool',
    subtitle: {
      ja: 'ベンチャー企業から受託した1on1支援ツール',
      en: 'Contracted 1on1 support tool for a startup',
    },
    category: 'web',
    description: {
      ja: 'ベンチャー企業の社長から依頼を受け、二人で開発・納品した1on1支援Webツール。フロントエンドとデータ前処理を担当。納品後も稼働中。',
      en: "Commissioned by a startup CEO and delivered by a team of two. I owned the frontend and data pre-processing. Still running in production.",
    },
    problem: {
      ja: 'チームの1on1を継続的に記録・振り返る仕組みがなく、属人的になりやすかった。',
      en: '1on1s had no system for recording and reviewing — everything depended on individuals.',
    },
    highlights: [
      { ja: 'Gemini APIで会話要約・質問提案を自動生成', en: 'Auto-generated conversation summaries and question suggestions with the Gemini API' },
      { ja: '上司-部下の多対多割当と権限制御を設計', en: 'Designed many-to-many manager/member assignment with access control' },
      { ja: 'API仕様・DBスキーマ・Git運用をすり合わせながらチームで納品', en: 'Aligned API specs, DB schema and Git workflow as a team, and shipped' },
    ],
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Gemini API', 'Chart.js'],
    period: '2025.06 – 2025.11',
    liveUrl: 'https://memento-1on1.com/web-1on1/',
    githubUrl: 'https://github.com/mtsvane-vashli/jizo_1on1_app',
    status: 'live',
    featured: false,
  },
  {
    id: 'trading',
    title: 'TradeSignal JP',
    subtitle: {
      ja: '株・暗号資産の分析ダッシュボード（個人用）',
      en: 'Personal market-analysis dashboard',
    },
    category: 'ai',
    description: {
      ja: '日本株・米国株・暗号資産のシグナル生成、バックテスト、ペーパートレード、AI分析を統合したフルスタックWebアプリ。※投資助言サービスではなく個人用の分析ツール。',
      en: 'A full-stack web app unifying signal generation, backtesting, paper trading and AI analysis for JP/US stocks and crypto. Personal analysis tool — not investment advice.',
    },
    highlights: [
      { ja: 'Next.js + FastAPI のフルスタック構成、WebSocketでリアルタイム更新', en: 'Next.js + FastAPI full-stack with real-time WebSocket updates' },
      { ja: 'XGBoostによるシグナル生成とバックテスト基盤', en: 'XGBoost-driven signals with a backtesting framework' },
      { ja: '実売買を行わない安全ゲート設計', en: 'Safety gates that prevent any real order execution' },
    ],
    tech: ['Next.js', 'FastAPI', 'SQLite', 'XGBoost', 'WebSocket', 'Docker'],
    period: '2026.04 – 2026.06',
    status: 'dev',
    featured: false,
    note: { ja: 'リポジトリ非公開', en: 'Private repository' },
  },
  {
    id: 'mito',
    title: 'MITO',
    subtitle: {
      ja: 'iPhone 2台でのマーカーレス3D姿勢推定',
      en: 'Markerless 3D pose estimation with two iPhones',
    },
    category: 'ai',
    description: {
      ja: 'iPhone 2台のマルチビュー映像から、マーカーレスで3D姿勢を推定する研究プロトタイプ。福岡未踏2026に提案。',
      en: 'A research prototype estimating 3D human pose from two iPhones — no markers, no studio. Proposed to MITOU Fukuoka 2026.',
    },
    highlights: [
      { ja: 'Apple Vision のオンデバイス2D姿勢推定 + 三角測量で3D復元', en: 'On-device 2D pose (Apple Vision) + triangulation for 3D reconstruction' },
      { ja: 'フラッシュ同期（カチンコ方式）で2台のフレームを合わせる', en: 'Clapperboard-style flash sync to align the two cameras' },
      { ja: 'OpenSim筋骨格モデルへの近似まで実装', en: 'Approximation onto an OpenSim musculoskeletal model' },
    ],
    tech: ['SwiftUI', 'Apple Vision', 'Python', 'OpenCV', 'OpenSim'],
    period: '2026.06',
    status: 'dev',
    featured: false,
    note: { ja: 'リポジトリ非公開', en: 'Private repository' },
  },
  {
    id: 'youtube-shorts',
    title: 'Shorts Automation',
    subtitle: {
      ja: 'AI動画自動制作パイプライン',
      en: 'AI-driven video production pipeline',
    },
    category: 'ai',
    description: {
      ja: '素材URLを入力するだけで、AI解析 → 編集 → YouTube投稿まで全自動で完結する動画制作ワークフロー。',
      en: 'Paste a source URL and the pipeline does the rest: AI analysis, editing, and publishing to YouTube — fully automated.',
    },
    highlights: [
      { ja: 'Geminiによるハイライト抽出・シナリオ生成', en: 'Highlight extraction and scenario generation with Gemini' },
      { ja: 'WhisperX文字起こし・Blenderシーン自動構築・音声合成を連結', en: 'Chains WhisperX transcription, automated Blender scenes, and TTS' },
      { ja: '4種類のコンテンツ戦略モードを切替可能、GUI搭載', en: 'Four switchable content strategies, with a GUI' },
    ],
    tech: ['Python', 'Node.js', 'Gemini API', 'WhisperX', 'FFmpeg', 'Blender', 'YouTube Data API'],
    period: '2026.02 – 2026.03',
    status: 'dev',
    featured: false,
    note: { ja: 'リポジトリ非公開', en: 'Private repository' },
  },
  {
    id: 'takken',
    title: 'Takken Learning App',
    subtitle: {
      ja: '宅建学習アプリ（AI解説付き）',
      en: 'Real-estate exam prep with AI explanations',
    },
    category: 'ai',
    description: {
      ja: '宅建試験の一問一答学習アプリ。過去問25年分をデータ化し、Gemini APIでその場で解説を生成、チャットで深掘りできる。自分用に開発し、今も利用中。',
      en: '25 years of past exam questions, one-tap answers, on-demand AI explanations and follow-up chat. Built for my own studying — still in daily use.',
    },
    highlights: [
      { ja: '2000〜2024年分の過去問をJSON化・SQLiteで進捗管理', en: 'Structured 2000–2024 questions into JSON with SQLite progress tracking' },
      { ja: 'Gemini APIによる即時解説生成とチャットQA', en: 'Instant explanations and chat Q&A via the Gemini API' },
    ],
    tech: ['Python', 'Streamlit', 'Gemini API', 'SQLite', 'pandas'],
    period: '2025.08 – 2026.01',
    status: 'dev',
    featured: false,
    note: { ja: 'リポジトリ非公開', en: 'Private repository' },
  },
  {
    id: '6ball',
    title: '6-Ball Puzzle',
    subtitle: {
      ja: 'iPhone向けパズルゲーム',
      en: 'Puzzle game for iPhone',
    },
    category: 'game',
    description: {
      ja: '『あそび大全』のSix-Ball Puzzleに着想を得たiPhone向けパズルゲーム。コアロジックからCPU対戦・チュートリアルまで実装済み。App Store公開を目指して開発中。',
      en: 'An iPhone puzzle game inspired by Six-Ball Puzzle. Core logic, CPU opponent and tutorial are done — polishing for an App Store release.',
    },
    highlights: [
      { ja: 'Godot 4.6でコアロジック・CPU対戦・レベル進行を実装', en: 'Core logic, CPU battles and level progression in Godot 4.6' },
      { ja: 'iOS Safe Area・モバイルレンダラー対応', en: 'iOS Safe Area and mobile renderer support' },
    ],
    tech: ['Godot 4.6', 'GDScript', 'iOS'],
    period: '2026.03 –',
    status: 'wip',
    featured: false,
    note: { ja: 'リポジトリはアプリ公開準備のため非公開', en: 'Repository private until app release' },
  },
]

export const projectCategories: { id: 'all' | 'web' | 'ai' | 'game'; label: L }[] = [
  { id: 'all', label: { ja: 'すべて', en: 'All' } },
  { id: 'web', label: { ja: 'Web サービス', en: 'Web' } },
  { id: 'ai', label: { ja: 'AI・自動化', en: 'AI & Automation' } },
  { id: 'game', label: { ja: 'ゲーム・アプリ', en: 'Games & Apps' } },
]

/* ═══════════════ Research ═══════════════ */

export const research = {
  heading: {
    ja: 'RAG × 知識グラフ — 「効く場所」を公平に見極める',
    en: 'RAG × Knowledge Graphs — finding where they truly help',
  } as L,
  intro: {
    ja: '卒業研究では、検索拡張生成（RAG）の検索品質をテーマに、研究内容に特化した知識グラフをAIで自己進化させる手法に取り組んでいます。この研究で一番大切にしているのは、「うまくいっているように見える結果」を疑うことです。',
    en: "My undergraduate research tackles retrieval quality in RAG, using AI to evolve domain-specific knowledge graphs. The principle I value most: never trust results that merely look good.",
  } as L,
  steps: [
    {
      num: '01',
      title: { ja: '自己進化する知識グラフに挑戦', en: 'Self-evolving knowledge graphs' },
      body: {
        ja: 'クエリのたびにAIが知識グラフへノードを追加・洗練し、「その研究分野専門の脳」を育てるGraphRAGを構築。',
        en: 'Built a GraphRAG where each query lets the AI add and refine nodes — growing a domain-specialized "brain".',
      },
    },
    {
      num: '02',
      title: { ja: '評価の偏りを自ら発見', en: 'Found the bias in my own evaluation' },
      body: {
        ja: '精度は上がって見えたが、検証の結果、比較実験の設計に偏りがあり公平に測れていなかったことに気づいた。',
        en: 'Accuracy seemed to improve — until I audited my comparisons and found the evaluation itself was unfair.',
      },
    },
    {
      num: '03',
      title: { ja: '土台から検証し直す決断', en: 'Rebuilding evaluation from the ground up' },
      body: {
        ja: '積み上げた実装を一度離れ、公開データセットと統計検定で「知識グラフはそもそもどこに効くのか」を一つずつ検証し直した。',
        en: 'Set aside months of work and re-verified — with public datasets and statistical tests — where knowledge graphs actually help.',
      },
    },
    {
      num: '04',
      title: { ja: '「効く場所」の発見へ', en: 'Toward routing by problem type' },
      body: {
        ja: '多くの問題はベクトル検索で十分で、多段推論が必要な問題にこそグラフが効く。問題を選別して手法を割り当てるルーティング設計へ研究を発展させている。',
        en: 'Vector search suffices for most queries; graphs shine on multi-hop reasoning. Now designing routers that pick the right method per problem.',
      },
    },
  ] as ResearchStep[],
  grad: {
    ja: '2026年7月、九州大学大学院 システム情報科学府 情報理工学専攻に合格（小野謙二研究室・学部から継続）。修士では、実験ログや研究履歴を意味を保ったまま圧縮し、LLMによる研究支援基盤へ発展させる研究を構想しています。',
    en: "Admitted (July 2026) to Kyushu University's Graduate School of Information Science and Electrical Engineering, continuing in the Ono Lab. My master's plan: semantically compressing research logs into memory that LLMs can use to support scientists.",
  } as L,
  tags: ['RAG', 'GraphRAG', 'Knowledge Graphs', 'LLM Evaluation', 'Research Support'],
}

/* ═══════════════ Skills（使った文脈つき） ═══════════════ */

export const skillCategories: SkillCategory[] = [
  {
    label: { ja: 'フロントエンド', en: 'Frontend' },
    skills: [
      { name: 'React', usedIn: { ja: 'ミニリンク / GOUN FES / 1on1 / このサイト', en: 'Minilink / GOUN FES / 1on1 / this site' } },
      { name: 'TypeScript', usedIn: { ja: 'Web開発全般', en: 'All web projects' } },
      { name: 'Next.js', usedIn: { ja: 'TradeSignal JP', en: 'TradeSignal JP' } },
      { name: 'Tailwind CSS', usedIn: { ja: 'ミニリンク / このサイト', en: 'Minilink / this site' } },
      { name: 'Flutter / Dart', usedIn: { ja: 'HakoGame', en: 'HakoGame' } },
      { name: 'Three.js / R3F', usedIn: { ja: 'このサイトの3D世界', en: "This site's voxel world" } },
    ],
  },
  {
    label: { ja: 'バックエンド', en: 'Backend' },
    skills: [
      { name: 'Node.js / Express', usedIn: { ja: 'GOUN FES / 1on1', en: 'GOUN FES / 1on1' } },
      { name: 'Python', usedIn: { ja: '研究 / 自動化ツール群', en: 'Research / automation tools' } },
      { name: 'FastAPI', usedIn: { ja: 'TradeSignal JP', en: 'TradeSignal JP' } },
      { name: 'PostgreSQL', usedIn: { ja: 'GOUN FES / 1on1', en: 'GOUN FES / 1on1' } },
      { name: 'Firebase / Firestore', usedIn: { ja: 'HakoGame（リアルタイム同期）', en: 'HakoGame (real-time sync)' } },
      { name: 'Go / Java', usedIn: { ja: '学習・課題', en: 'Coursework' } },
    ],
  },
  {
    label: { ja: 'AI / ML', en: 'AI / ML' },
    skills: [
      { name: 'RAG / GraphRAG', usedIn: { ja: '卒業研究', en: 'Undergraduate research' } },
      { name: 'LLM API（Gemini 等）', usedIn: { ja: '1on1 / 宅建 / 動画自動化', en: '1on1 / Takken / video automation' } },
      { name: 'WhisperX', usedIn: { ja: '動画自動化 / ローカル文字起こし', en: 'Video pipeline / local transcription' } },
      { name: 'XGBoost', usedIn: { ja: 'TradeSignal JP', en: 'TradeSignal JP' } },
      { name: 'OpenCV', usedIn: { ja: 'MITO（三角測量）', en: 'MITO (triangulation)' } },
      { name: 'プロンプト設計', usedIn: { ja: '全AIプロジェクト', en: 'Every AI project' } },
    ],
  },
  {
    label: { ja: 'インフラ / ツール', en: 'Infra / Tools' },
    skills: [
      { name: 'Cloudflare Pages/Workers/R2', usedIn: { ja: 'ミニリンク', en: 'Minilink' } },
      { name: 'GitHub Actions', usedIn: { ja: 'GOUN FES / HakoGame CI', en: 'GOUN FES / HakoGame CI' } },
      { name: 'VPS運用 / PM2', usedIn: { ja: 'GOUN FES 本番運用', en: 'GOUN FES production ops' } },
      { name: 'Docker', usedIn: { ja: 'TradeSignal JP', en: 'TradeSignal JP' } },
      { name: 'FFmpeg', usedIn: { ja: '動画自動化', en: 'Video automation' } },
    ],
  },
  {
    label: { ja: 'ゲーム / その他', en: 'Games / Other' },
    skills: [
      { name: 'Godot 4', usedIn: { ja: '6-Ball Puzzle', en: '6-Ball Puzzle' } },
      { name: 'Unity', usedIn: { ja: 'VOID RUSH（3Dランナー）', en: 'VOID RUSH (3D runner)' } },
      { name: 'SwiftUI', usedIn: { ja: 'MITO / BLEレーダー実験', en: 'MITO / BLE radar experiments' } },
      { name: 'C# / C++', usedIn: { ja: 'Unity / 学習', en: 'Unity / coursework' } },
    ],
  },
]

/* ═══════════════ セクション見出し・UIテキスト ═══════════════ */

export const ui = {
  nav: {
    about: { ja: 'About', en: 'About' } as L,
    projects: { ja: 'Projects', en: 'Projects' } as L,
    research: { ja: 'Research', en: 'Research' } as L,
    skills: { ja: 'Skills', en: 'Skills' } as L,
    contact: { ja: 'Contact', en: 'Contact' } as L,
  },
  sections: {
    aboutSub: { ja: '自己紹介', en: 'WHO I AM' } as L,
    projectsSub: { ja: '作ったもの', en: 'SELECTED WORK' } as L,
    researchSub: { ja: '研究', en: 'RESEARCH' } as L,
    skillsSub: { ja: '技術スタック', en: 'TECH STACK' } as L,
    contactSub: { ja: 'お問い合わせ', en: 'GET IN TOUCH' } as L,
    journeyTitle: { ja: '歩み', en: 'Journey' } as L,
    featuredLabel: { ja: 'FEATURED', en: 'FEATURED' } as L,
    moreLabel: { ja: 'その他のプロジェクト', en: 'More projects' } as L,
  },
  demo: {
    heading: { ja: '体験する：時間差分散の仕組み', en: 'Try it: request spreading, visualized' } as L,
    sub: {
      ja: 'GOUN FES で実際に使った設計。全員が同じ瞬間に投票するとサーバーが詰まる — 処理を分散しても、体験が“同時”に見えれば成立する。',
      en: 'The exact idea behind GOUN FES: simultaneous votes choke the server — spread the requests while every screen stays in sync.',
    } as L,
    off: { ja: '分散 OFF', en: 'Spread OFF' } as L,
    on: { ja: '分散 ON', en: 'Spread ON' } as L,
    users: { ja: '参加者', en: 'users' } as L,
    server: { ja: 'サーバー（4GB VPS）', en: 'Server (4GB VPS)' } as L,
    queue: { ja: '処理待ち', en: 'queued' } as L,
    dropped: { ja: 'タイムアウト', en: 'timed out' } as L,
    processed: { ja: '処理完了', en: 'processed' } as L,
    peak: { ja: '瞬間最大負荷', en: 'peak load' } as L,
    countdown: { ja: '全員の画面の残り秒数は常に同期', en: 'Every screen shows the same countdown' } as L,
    voteNow: { ja: '投票タイム！', en: 'VOTE NOW!' } as L,
  },
  research: {
    gradLabel: { ja: '大学院', en: 'GRAD SCHOOL' } as L,
  },
  contact: {
    lead: {
      ja: 'インターンや仕事の\nご相談、お気軽にどうぞ。',
      en: "Open to internships\nand collaborations.",
    } as L,
    body: {
      ja: 'AIエンジニア・ITコンサル・PM/PdM領域でのご相談、または単純なご連絡も歓迎です。',
      en: "Whether it's AI engineering, IT consulting, PM roles — or just to say hi.",
    } as L,
  },
  footer: {
    handmade: {
      ja: 'このサイトも自作です — React + Three.js、ボクセルも一つずつ',
      en: 'This site is hand-built too — React + Three.js, voxel by voxel',
    } as L,
  },
}
