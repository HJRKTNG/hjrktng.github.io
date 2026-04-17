# 作業履歴

## 2026-04-18 — デザイン完全リニューアル

### 変更概要
ポートフォリオサイトのデザインを全面再設計。コンテンツはそのままに、ビジュアルを大幅にリッチ化。

### 変更内容
- **カラーパレット刷新**: シアン (#38bdf8) → アンバー/ゴールド (#d4a853)、背景を温かみのある深黒 (#080807) へ変更
- **フォント刷新**: Inter → Cormorant Garamond（表示用）/ Outfit（本文）/ IBM Plex Mono（等幅）
- **index.html**: Google Fonts を新フォントセットに更新
- **tailwind.config.js**: 新カラーシステム (ink, accent) とフォントファミリー設定
- **index.css**: フィルムグレインオーバーレイ、スクロールバー、カスタムアニメーション追加
- **Navbar.tsx**: セクション番号付きナビ、スクロール連動の背景変化
- **Hero.tsx**: 左寄せエディトリアルレイアウト、大型表示フォント、ウォームグラデーション背景
- **SectionHeading.tsx**: `num` プロップ追加、Cormorant Garamond 見出し
- **About.tsx**: 新デザイン言語に対応した再設計
- **Skills.tsx**: アンバーアクセントのカテゴリカード
- **Projects.tsx**: プロジェクト番号表示、リッチカードデザイン
- **ProjectCard.tsx**: アンバーグロー、ホバー演出強化
- **Tag.tsx**: アンバー配色のタグ
- **Contact.tsx**: エディトリアル風デザイン
- **Resume.tsx**: 新デザイン適用
- **Footer.tsx**: 洗練されたフッター

## 2026-04-18 — Hero に 3Dボクセル木追加

### 変更内容
- **依存追加**: `three`, `@react-three/fiber`, `@types/three`
- **新規ファイル**: `src/components/3d/VoxelTree.tsx`
  - ボクセル（立方体）で構成された木を Three.js で描画
  - 自動回転（Y軸、約0.32rad/秒）
  - マウス位置追尾 → 近接ブロックが避けるアニメーション（push radius 2.2、spring lerp 0.12）
  - アンバー基調（幹: 濃茶、葉: `#c89240`〜`#f0d495` の5段階）
  - `prefers-reduced-motion` 対応で「木」文字にフォールバック
- **Hero.tsx 更新**: デスクトップでは右半分に3Dキャンバス、左半分にテキスト（左からのグラデーションで可読性確保）。モバイルは背景として薄く配置
