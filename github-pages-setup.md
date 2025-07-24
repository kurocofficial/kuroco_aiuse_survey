# GitHub Pages公開手順

## 1. GitHubリポジトリの作成

### 手順1: リポジトリ作成
1. GitHub ([github.com](https://github.com)) にログイン
2. 「New repository」をクリック
3. Repository name: `kuroco_aiuse_survey`
4. Description: `AIの利用状況に関するアンケートフォーム`
5. Public を選択
6. 「Create repository」をクリック

### 手順2: ローカルリポジトリの初期化と push
```bash
# ローカルでgit初期化
git init
git add .
git commit -m "初回コミット: AIアンケートフォーム"

# リモートリポジトリを追加
git remote add origin https://github.com/[your-username]/kuroco_aiuse_survey.git
git branch -M main
git push -u origin main
```

## 2. GitHub Pagesの設定

### 手順1: Pages有効化
1. リポジトリページで「Settings」タブをクリック
2. 左サイドバーから「Pages」を選択
3. Source: 「Deploy from a branch」を選択
4. Branch: 「main」を選択、「/ (root)」を選択
5. 「Save」をクリック

### 手順2: 公開URL確認
- 設定後、数分で以下のURLでアクセス可能
- `https://[your-username].github.io/kuroco_aiuse_survey/`

## 3. Google Apps ScriptのURL更新

### 手順1: Apps Script設定完了
1. [設定手順書.md](設定手順書.md) に従ってGoogle Apps Scriptを設定
2. WebアプリのURLを取得

### 手順2: HTMLファイル更新
1. `index.html` の 77行目を更新：
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

### 手順3: 変更をコミット
```bash
git add index.html
git commit -m "Google Apps Script URLを更新"
git push origin main
```

## 4. アンケート期間管理

### 開始時
1. `index.html` が公開されている状態で開始
2. README.mdの実施期間を正確な日付に更新

### 終了時（10日後）
1. `index.html` → `index-backup.html` にリネーム
2. `closed.html` → `index.html` にリネーム
3. コミット＆push

```bash
# 終了処理
git mv index.html index-backup.html
git mv closed.html index.html
git add .
git commit -m "アンケート期間終了: 終了ページに切り替え"
git push origin main
```

## 5. セキュリティ設定

### Apps Script側
- 実行ユーザー: 自分
- アクセス権限: 全員（期間限定のため）

### GitHub Pages側
- パブリックリポジトリのため誰でもアクセス可能
- 期間終了後は終了ページが表示される

## 6. 運用監視

### データ確認
- Googleスプレッドシートでリアルタイム確認
- Apps Scriptの「実行数」でアクセス状況確認

### エラー監視
- GitHub Actions（必要に応じて）
- Apps Scriptの実行ログ

## 7. 期間終了後の処理

### データ整理
1. スプレッドシートのデータをダウンロード
2. 個人情報の適切な処理
3. 統計データの作成

### リポジトリ整理
```bash
# 最終コミット
git add .
git commit -m "アンケート終了: 最終データ整理"
git push origin main

# アーカイブ（任意）
# GitHubでリポジトリをアーカイブ状態に変更
```

## 8. 確認チェックリスト

- [ ] GitHubリポジトリ作成完了
- [ ] GitHub Pages設定完了
- [ ] Google Apps Script設定完了
- [ ] WebアプリURL更新完了
- [ ] アンケートフォーム動作確認完了
- [ ] README.mdの日付更新完了
- [ ] 終了ページ（closed.html）準備完了

## 9. 緊急時対応

### フォーム停止が必要な場合
```bash
# 緊急停止
git mv index.html index-emergency-backup.html
git mv closed.html index.html
git commit -m "緊急停止: アンケートフォーム一時停止"
git push origin main
```

### 再開する場合
```bash
# 再開
git mv index.html closed.html
git mv index-emergency-backup.html index.html
git commit -m "アンケートフォーム再開"
git push origin main
```