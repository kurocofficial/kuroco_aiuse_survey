# AIアンケートフォーム

AIの利用状況に関する簡易アンケートフォームです。

## 🔗 アンケートフォーム

**[アンケートに回答する](https://[your-username].github.io/kuroco_aiuse_survey/)**

## 📋 アンケート内容

1. **お名前** (必須)
2. **あなたの一番使うAIは？** (必須)
   - ChatGPT
   - Claude
   - Google Gemini
   - Microsoft Copilot
   - その他

3. **そのAIの使い方について教えてください** (複数選択可)
   - 文章作成・編集
   - プログラミング・コーディング
   - 翻訳
   - 情報収集・調査
   - 創作活動（絵画、音楽など）
   - 学習・勉強
   - ビジネス相談
   - その他

## ⏰ 実施期間

**2025年7月24日 ～ 2025年8月3日**

## 🔒 プライバシー

- 収集したデータは統計分析の目的のみに使用します
- 個人を特定する情報は公開しません
- アンケート終了後、データは適切に処理します

## 🛠 技術仕様

- **フロントエンド**: HTML5 + CSS3 + JavaScript
- **バックエンド**: Google Apps Script
- **データベース**: Google Spreadsheet
- **ホスティング**: GitHub Pages

## 📁 プロジェクト構成

```
kuroco_aiuse_survey/
├── index.html              # メインフォーム
├── closed.html             # アンケート終了ページ
├── google-apps-script.js   # サーバーサイドスクリプト
├── 要件定義書.md            # 要件定義
├── 設定手順書.md            # 設定手順
└── README.md               # このファイル
```

## 🚀 セットアップ（開発者向け）

### 1. リポジトリのクローン
```bash
git clone https://github.com/[your-username]/kuroco_aiuse_survey.git
cd kuroco_aiuse_survey
```

### 2. Google Apps Scriptの設定
詳細は [設定手順書.md](設定手順書.md) を参照

### 3. GitHub Pagesの有効化
1. GitHubリポジトリの「Settings」→「Pages」
2. Source: Deploy from a branch
3. Branch: main / (root)

## 📊 データ形式

スプレッドシートの列構成：
- A列: タイムスタンプ
- B列: 名前
- C列: 一番使うAI
- D列: AIの使い方（カンマ区切り）

## 🤝 貢献

このプロジェクトは期間限定のアンケート用途のため、コントリビューションは受け付けておりません。

## 📄 ライセンス

MIT License

---

## 📞 お問い合わせ

アンケートに関するご質問やご不明な点がございましたら、GitHub Issuesにてお知らせください。