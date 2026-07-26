import type { L } from '../i18n'

/* ═══════════════════════════════════════════════════════════
   機構（Machine）— 各ユニットは実在するプロジェクトの
   設計思想を、精密機械の一部として言い換えたもの。
   数値・事実は全て実際の開発・運用に基づく。
   ═══════════════════════════════════════════════════════════ */

export interface StageBody {
  label: string
  text: L
}

export interface Stage {
  id: string
  index: string
  image: string
  /** background-position（構図の見せたい部分に寄せる） */
  focus?: string
  eyebrow: string
  title: L
  lead: L
  body: StageBody[]
  specs: { label: string; value: L }[]
  links?: { label: string; url: string }[]
  /** そのユニットを一言で表す数値（大きく掲出する） */
  metric?: { value: string; unit?: string; caption: L }
  /** 光の筋の本数 */
  density?: number
  /** 内容が多いユニットはスクロール尺を伸ばす */
  tall?: boolean
}

export const stages: Stage[] = [
  /* ── 01 GOUN FES ── */
  {
    id: 'gate-array',
    index: '01',
    image: '/images/unit-gates.jpg',
    eyebrow: 'GATE ARRAY',
    title: {
      ja: '約700人の同時投票を、\n4GBのサーバーで捌く',
      en: 'Serving ~700 simultaneous votes\non a 4GB server',
    },
    lead: {
      ja: '全員が同じ瞬間に投票する。この機構が解いたのは、その一点だった。',
      en: 'Everyone votes at the exact same instant. That single fact was the problem to solve.',
    },
    body: [
      {
        label: '課題',
        text: {
          ja: '福岡の若者向けイベントで、参加型ゲームサイトを一人で任された。だが提供されたのはメモリ4GBの低スペックVPS。負荷試験を行うと、想定ピークの同時アクセスには耐えられないことが判明した。',
          en: 'I was solely responsible for the interactive game platform of a youth festival in Fukuoka. The provided machine was a low-spec 4GB VPS — and load testing showed it could not survive the expected peak.',
        },
      },
      {
        label: '仮説',
        text: {
          ja: '負荷が立つのは、全員が同じ瞬間にリクエストを送るからだ。ならば裏側の処理を時間差に散らしても、ユーザーの体験が「同時」に見えれば成立するはずだと考えた。',
          en: 'The spike exists only because every request fires at the same instant. So if the processing is spread across time while the experience still looks simultaneous, the system should hold.',
        },
      },
      {
        label: '設計',
        text: {
          ja: 'リクエストの送信タイミングをランダムな幅でずらして負荷を平準化し、画面の残り秒数表示だけを全員で同期させた。投票時刻の記録は正確に保持している。',
          en: 'Requests fire with randomised offsets to flatten the load, while every screen shows the same synchronised countdown. Vote timestamps are still recorded exactly.',
        },
      },
      {
        label: '結果',
        text: {
          ja: '対策前の倍近い負荷まで安定して捌けることを確認。当日は約600〜700人の利用を、大きなトラブルなく最後まで支えきった。',
          en: 'Load tests confirmed stability at nearly twice the previous breaking point. On the day, it carried ~600–700 visitors through to the end without a major incident.',
        },
      },
    ],
    specs: [
      { label: 'Server', value: { ja: '4GB VPS', en: '4GB VPS' } },
      { label: 'Visitors', value: { ja: '約700人', en: '~700' } },
      { label: 'Capacity', value: { ja: '対策前の約2倍', en: '~2× baseline' } },
      { label: 'Role', value: { ja: '単独 / 設計〜運用', en: 'Solo / design→ops' } },
      { label: 'Stack', value: { ja: 'React · Express · PostgreSQL', en: 'React · Express · PostgreSQL' } },
      { label: 'Period', value: { ja: '2025.11 – 2026.01', en: '2025.11 – 2026.01' } },
    ],
    metric: {
      value: '700',
      unit: '人',
      caption: { ja: '当日の来場を、単独開発の1台で支えた', en: 'visitors carried by a system I built alone' },
    },
    links: [{ label: 'GITHUB — GOUNFESGAME', url: 'https://github.com/HJRKTNG/GOUNFESGAME' }],
    density: 34,
    tall: true,
  },

  /* ── 02 Minilink ── */
  {
    id: 'conduit',
    index: '02',
    image: '/images/unit-conduit.jpg',
    eyebrow: 'CONDUIT',
    title: {
      ja: '認証で待たせない、\n端末間の導管',
      en: 'A conduit between devices\nthat never makes you wait',
    },
    lead: {
      ja: '「ちょっと送りたい」を3秒で終わらせるために、認証を見えなくした。',
      en: 'To make "just send it over" take three seconds, I made authentication invisible.',
    },
    body: [
      {
        label: '課題',
        text: {
          ja: 'WindowsのPCとiPhoneの間でファイルやテキストを送るのに、チャットアプリ経由ではログイン・送信・コピーの手間が多すぎた。',
          en: 'Moving files and text between my Windows PC and iPhone through a chat app meant logging in, sending, copying — far too many steps.',
        },
      },
      {
        label: '仮説',
        text: {
          ja: '共有のたびに認証で待たされたら、そもそも作る意味がない。認証は存在を感じさせずに、裏で勝手に回復するべきだと考えた。',
          en: 'If authentication makes you wait every time you share, the tool defeats its own purpose. Auth should be unnoticeable and recover itself silently.',
        },
      },
      {
        label: '設計',
        text: {
          ja: 'ルームID＋トークンのステートレス認証を組み、期限切れや401エラーをユーザーに見せずに自動更新・自動リトライで吸収する透過的な認証層を実装した。入口は6桁のルームIDとQRコードだけ。',
          en: 'A stateless room-ID + token scheme, wrapped in a transparent auth layer that absorbs expiry and 401s through silent refresh and retry. The only entry point is a 6-digit room ID or a QR code.',
        },
      },
      {
        label: '結果',
        text: {
          ja: 'Cloudflare Workers / R2 上で公開し、現在も稼働中。マルチパートアップロードとルームベースの一時ストレージまで実装した。',
          en: 'Live on Cloudflare Workers and R2, still running today — including multipart uploads and room-scoped ephemeral storage.',
        },
      },
    ],
    specs: [
      { label: 'Status', value: { ja: '公開・稼働中', en: 'Live in production' } },
      { label: 'Auth', value: { ja: 'ステートレス / 自動復旧', en: 'Stateless / self-healing' } },
      { label: 'Infra', value: { ja: 'Cloudflare Pages·Workers·R2', en: 'Cloudflare Pages·Workers·R2' } },
      { label: 'Role', value: { ja: '個人開発（全工程）', en: 'Solo (end-to-end)' } },
      { label: 'Period', value: { ja: '2025.10 – 2025.12', en: '2025.10 – 2025.12' } },
    ],
    metric: {
      value: '6',
      unit: '桁',
      caption: { ja: 'ルームIDを入れるだけで繋がる', en: 'digits — that is the whole connection flow' },
    },
    links: [
      { label: 'LIVE — minilink.jp', url: 'https://minilink.jp/' },
      { label: 'GITHUB', url: 'https://github.com/HJRKTNG/minilink' },
    ],
    density: 22,
  },

  /* ── 03 HakoGame ── */
  {
    id: 'escapement',
    index: '03',
    image: '/images/unit-escapement.jpg',
    eyebrow: 'ESCAPEMENT',
    title: {
      ja: '狂った時計を、\n一つも信用しない',
      en: 'Trusting none\nof the clocks',
    },
    lead: {
      ja: '端末ごとに時刻はズレる。それでも「誰が先に押したか」は公平に決めなければならない。',
      en: 'Every device clock drifts. Yet who pressed first must still be decided fairly.',
    },
    body: [
      {
        label: '課題',
        text: {
          ja: '最大4人で遊ぶリアルタイム早押しクイズを作った。だが各端末の時計はバラバラで、クライアントの申告を信じれば簡単に不公平が生まれる。通信切断やホストの離脱にも耐える必要があった。',
          en: 'I built a real-time buzzer quiz for up to four players. Device clocks disagree, and trusting client-reported times invites unfairness. It also had to survive disconnects and host dropouts.',
        },
      },
      {
        label: '設計',
        text: {
          ja: '端末の時計は一切信用せず、Firestoreのサーバータイムスタンプだけで順位を確定する方式にした。切断はホスト権限の自動委譲と途中復帰（再入室）で吸収する。',
          en: 'No client clock is trusted: rankings are decided solely by Firestore server timestamps. Disconnects are absorbed by automatic host migration and seamless rejoining.',
        },
      },
      {
        label: '検証',
        text: {
          ja: '「正しく動く」だけでなく「不正ができない」ことを保証するため、Firestoreセキュリティルールのユニットテスト14件（スコア改ざん・非参加者の操作・ホスト専用操作の制限など）をCIで自動実行している。',
          en: 'To guarantee not just correctness but resistance to cheating, 14 Firestore security-rule unit tests — score tampering, non-participant access, host-only operations — run automatically in CI.',
        },
      },
    ],
    metric: {
      value: '14',
      unit: '件',
      caption: { ja: '不正を防ぐ規則テストをCIで自動実行', en: 'security-rule tests running in CI' },
    },
    specs: [
      { label: 'Players', value: { ja: '最大4人 / リアルタイム', en: 'Up to 4, real-time' } },
      { label: 'Timing', value: { ja: 'サーバー基準のみ', en: 'Server-authoritative' } },
      { label: 'Tests', value: { ja: 'セキュリティ規則 14件 (CI)', en: '14 rule tests in CI' } },
      { label: 'Stack', value: { ja: 'Flutter · Firebase', en: 'Flutter · Firebase' } },
      { label: 'Status', value: { ja: 'App Store 公開準備中', en: 'Preparing App Store release' } },
      { label: 'Period', value: { ja: '2026.05 –', en: '2026.05 –' } },
    ],
    density: 20,
  },

  /* ── 04 Research ── */
  {
    id: 'splitter',
    index: '04',
    image: '/images/unit-optics.jpg',
    eyebrow: 'OPTICAL SPLITTER',
    title: {
      ja: '「うまくいっている」を、\n疑うところから',
      en: 'Starting by doubting\nwhat looked like success',
    },
    lead: {
      ja: '数か月の積み上げを自ら白紙に戻した。評価そのものが公平ではなかったからだ。',
      en: 'I threw away months of my own work — because the evaluation itself had not been fair.',
    },
    body: [
      {
        label: 'テーマ',
        text: {
          ja: '卒業研究はRAG（検索拡張生成）の検索品質がテーマ。研究内容に特化した知識グラフをAIが自己進化させる手法に取り組み、指導教員の助言も受けて「その分野専門の脳」を育てる構想へ発展させた。',
          en: 'My undergraduate research targets retrieval quality in RAG. I built a system where AI evolves a domain-specific knowledge graph — growing, with my advisor\'s guidance, into a "brain" specialised to one field.',
        },
      },
      {
        label: '挫折',
        text: {
          ja: '精度は上がっているように見えた。しかし検証を進めるうちに、知識グラフとベクトル検索の比較設計そのものに偏りがあり、そもそも公平に測れていなかったことに気づいた。',
          en: 'Accuracy appeared to improve. But as I dug into the results, I found the comparison between graph and vector retrieval was itself biased — I had never been measuring fairly.',
        },
      },
      {
        label: '判断',
        text: {
          ja: '成果として主張したい気持ちはあった。それでも、誤った土台の上に積み上げるほうが失うものは大きいと判断し、公開データセットと統計検定で評価を作り直した。',
          en: 'I wanted to claim the result. But building further on a false foundation would cost more in the end, so I rebuilt the evaluation from scratch with public datasets and statistical testing.',
        },
      },
      {
        label: '知見',
        text: {
          ja: '大半の問いはベクトル検索で十分であり、複数の情報をまたぐ多段推論が必要な問いにこそ知識グラフが効く。今は問題の性質を見極めて手法を割り当てるルーティングの設計へ進んでいる。',
          en: 'Most queries are served well enough by vector search; graphs earn their cost on multi-hop reasoning. I am now designing routers that assign the right method per problem type.',
        },
      },
    ],
    metric: {
      value: '0',
      unit: 'から',
      caption: { ja: '評価の土台を作り直した。積み上げは捨てた', en: 'rebuilt the evaluation from nothing' },
    },
    specs: [
      { label: 'Lab', value: { ja: '小野謙二 研究室', en: 'Ono Laboratory' } },
      { label: 'Field', value: { ja: 'RAG / GraphRAG / 評価設計', en: 'RAG / GraphRAG / evaluation' } },
      { label: 'Method', value: { ja: '公開データセット + 統計検定', en: 'Public datasets + significance testing' } },
      { label: 'Next', value: { ja: '大学院進学決定（29卒）', en: 'M.S. confirmed, 2029' } },
    ],
    density: 30,
    tall: true,
  },

  /* ── 05 Origin ── */
  {
    id: 'origin',
    index: '05',
    image: '/images/unit-origin.jpg',
    eyebrow: 'ORIGIN',
    title: {
      ja: 'この機構の最深部には、\n手ハンダの基板がある',
      en: 'At the core of this machine\nis a hand-soldered board',
    },
    lead: {
      ja: 'デスクトップとノートPCの違いも分からないところから始まった。',
      en: 'It started from not even knowing the difference between a desktop and a laptop.',
    },
    body: [
      {
        label: '2019',
        text: {
          ja: '高校の物理部に入った。パソコンの知識はほとんどなかったが、アナログ回路やLED制御に触れるうちに、自分の手で仕組みが動くことの面白さを覚えた。副部長として部を回した。',
          en: 'I joined my high-school physics club knowing almost nothing about computers. Working with analog circuits and LED control, I discovered the joy of making a mechanism run by my own hand — and served as vice-captain.',
        },
      },
      {
        label: '2021',
        text: {
          ja: '高校3年、Unityでシューティングゲームを作り、自作のアナログ入力コントローラーと組み合わせた。手を動かした分だけ画面が反応する。あの体験が今も基準になっている。',
          en: 'In my final year I built a shooting game in Unity and wired it to a controller I made myself. The screen responded exactly as much as my hands moved — that experience is still my benchmark.',
        },
      },
      {
        label: '現在',
        text: {
          ja: '扱うものは回路からソフトウェアへ変わった。それでも、分からないことを調べ、仮説を立て、動くところまで作り切るという進み方は何ひとつ変わっていない。',
          en: 'The material changed from circuits to software. The method never did: find what I do not understand, form a hypothesis, and build it until it runs.',
        },
      },
    ],
    metric: {
      value: '2019',
      caption: { ja: '知識ゼロから、回路に触れた最初の年', en: 'the year I first touched a circuit, from zero' },
    },
    specs: [
      { label: 'Since', value: { ja: '2019 — 高校物理部', en: '2019 — physics club' } },
      { label: 'First build', value: { ja: 'アナログ入力コントローラー', en: 'A hand-made analog controller' } },
      { label: 'Constant', value: { ja: '調べる → 仮説 → 動くまで作る', en: 'Research → hypothesise → ship' } },
    ],
    density: 14,
  },
]
