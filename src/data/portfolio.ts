import type { Project, SkillCategory } from '../types'

export const meta = {
  name:       '沓脱 聖',
  nameEn:     'Hijiri Kutsunugi',
  tagline:    'AIとWebで、使えるものを作る。',
  email:      'hijiri.kutsunugi@gmail.com',
  github:     'https://github.com/HJRKTNG',
  university: '九州大学 工学部 電気情報工学科 4年',
  targetRoles: ['AI エンジニア', 'PM / PdM', 'フルスタックエンジニア'],
}

export const about = {
  intro: `九州大学工学部電気情報工学科の4年生です。
AIやWebを使って、実際に役立つものを自分で設計・実装する開発が好きです。
課題を見つけて自走しながら形にする力を強みとして、複数のWebサービス・自動化ツールを個人・チームで開発してきました。`,
  goals: `今後は大学院進学を視野に入れながら、AIエンジニアやPM/PdMとして、多くの人に使われるプロダクトづくりに関わっていきたいと考えています。`,
  abroad: `2026年夏、Micron財団・東京エレクトロン支援プログラム「UPWARDS」でVirginia Tech（米）に参加予定。`,
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'フロントエンド',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Flutter / Dart'],
  },
  {
    label: 'バックエンド',
    skills: ['Node.js', 'Express', 'Python', 'Go', 'Java'],
  },
  {
    label: 'AI / ML',
    skills: ['Gemini API', 'OpenAI API', 'WhisperX', 'LLM活用', 'プロンプト設計'],
  },
  {
    label: 'インフラ / ツール',
    skills: ['Cloudflare Pages/Workers/R2', 'PostgreSQL', 'SQLite', 'GitHub Actions', 'FFmpeg', 'Git'],
  },
  {
    label: 'その他',
    skills: ['Godot 4', 'C#', 'C++', 'tkinter', 'Streamlit', 'Blender'],
  },
]

export const projects: Project[] = [
  {
    id: 'minilink',
    title: 'Minilink',
    titleJa: 'ファイル・テキスト共有サービス',
    description:
      'WindowsとiPhone間で、アプリ不要・ログイン不要でファイルやテキストを瞬時に共有できるWebサービス。',
    problem:
      'LINEでのデバイス間共有は、ログイン・送信・コピーの手間が多い。もっとシンプルな方法が欲しかった。',
    highlights: [
      '6桁のルームIDとQRコードで即アクセス',
      'Cloudflare R2へのマルチパートアップロード実装',
      'トークン期限切れを透過的に自動復旧する認証設計',
      '1000人以上の同時利用を想定した負荷テスト済み',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare R2'],
    liveUrl: 'https://minilink.jp/',
    githubUrl: 'https://github.com/HJRKTNG/minilink',
    status: 'live',
    featured: true,
  },
  {
    id: '1on1',
    title: '1on1 Support Tool',
    titleJa: 'チーム向け1on1支援Webツール',
    description:
      '1on1の実施・記録・分析を支援するWebツール。フロントエンドとデータ前処理を主担当として共同開発。',
    problem:
      'チームの1on1を継続的に記録・振り返る仕組みがなく、属人的になりやすかった。',
    highlights: [
      'Gemini APIで会話要約・質問提案を自動生成',
      'マインドマップ・チャート・音声録音など多機能なUI',
      '上司-部下の多対多割当と権限制御を設計',
    ],
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Gemini API', 'Chart.js'],
    liveUrl: 'https://memento-1on1.com/web-1on1/',
    githubUrl: 'https://github.com/mtsvane-vashli/jizo_1on1_app',
    status: 'live',
    featured: true,
  },
  {
    id: 'goun-fes',
    title: 'GOUN FES FUKUOKA',
    titleJa: 'イベントWebサイト（大規模負荷対応）',
    description:
      '福岡の大型若者向けイベント（約1,000人参加）のランディングページとゲームサイトを一人で設計・開発・運用。',
    problem:
      '1000人規模の同時アクセスに対し、低スペックサーバーでは処理が追いつかないことが負荷試験で判明。',
    highlights: [
      'リクエストを時間差分散させる独自キューイング設計を実装',
      '2000人規模まで耐えられる余裕を確認',
      '要件整理から実装・本番運用まで一人で一貫して担当',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'GitHub Actions', 'PM2'],
    status: 'live',
    featured: true,
  },
  {
    id: 'youtube-shorts',
    title: 'YouTube Shorts Automation',
    titleJa: 'AI動画自動制作パイプライン',
    description:
      '素材URLを入力するだけで、AI解析 → 編集 → YouTube投稿まで全自動で完結する動画制作ワークフロー。',
    problem:
      '動画制作の各工程は手作業が多く、繰り返し作業を完全自動化することで制作コストを削減したかった。',
    highlights: [
      'Geminiによるハイライト抽出・シナリオ生成',
      '4種類のコンテンツ戦略モードを切り替え可能',
      'tkinterによるGUI搭載、ノーコード操作にも対応',
    ],
    tech: ['Python', 'Node.js', 'Gemini API', 'WhisperX', 'FFmpeg', 'Blender', 'YouTube Data API v3', 'Telegram Bot API'],
    githubUrl: 'https://github.com/HJRKTNG/YoutubeShortCreator',
    status: 'dev',
    featured: false,
  },
  {
    id: 'takken',
    title: 'Takken Learning Site',
    titleJa: '宅建学習アプリ（AI解説付き）',
    description:
      '宅地建物取引士試験の一問一答学習サイト。Gemini APIでその場で解説を生成し、チャットで質問できる。',
    problem:
      '市販の問題集には詳細解説がなく、調べるのに時間がかかった。自分専用の効率的な学習環境を作りたかった。',
    highlights: [
      '2000〜2024年分の過去問データをスクレイピングでJSON化・SQLite管理',
      'Gemini APIによる即時解説生成とチャットQA機能',
      'GitHub Actionsで自動デプロイを構築',
    ],
    tech: ['Python', 'Streamlit', 'Gemini API', 'SQLite', 'pandas', 'BeautifulSoup4', 'GitHub Actions'],
    githubUrl: 'https://github.com/HJRKTNG/takken-mondai-app',
    status: 'dev',
    featured: false,
  },
  {
    id: '6ball',
    title: '6-Ball Puzzle Game',
    titleJa: 'iPhoneパズルゲーム（開発中）',
    description:
      'Nintendo Switchの『あそび大全』に収録されているSix-Ball Puzzleに着想を得て、iPhone向けに開発中のパズルゲーム。',
    problem:
      'スマホでも同じゲームを遊べるようにしたかった。Godotを使ったネイティブアプリ開発の勉強も兼ねている。',
    highlights: [
      'Godot 4.6でコアロジック・CPU対戦・チュートリアルまで実装済み',
      'iOS Safe Area・モバイルレンダラーに対応',
      'App Store公開を目指して継続開発中',
    ],
    tech: ['Godot 4.6', 'GDScript', 'iOS'],
    githubUrl: 'https://github.com/HJRKTNG/6ballgame',
    status: 'wip',
    featured: false,
  },
]
