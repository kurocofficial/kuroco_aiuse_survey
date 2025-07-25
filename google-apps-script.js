/**
 * AIアンケートフォーム用Google Apps Script
 * フォームからのデータを受け取り、Googleスプレッドシートに保存
 */

// スプレッドシートIDを設定（作成後に置き換え）
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

/**
 * Webアプリとして公開する際のエントリーポイント
 * POSTリクエストを処理
 */
function doPost(e) {
  try {
    // CORSヘッダーを設定
    const response = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // パラメータを取得
    const params = e.parameter;
    
    // デバッグ用ログ
    console.log('受信したパラメータ:', JSON.stringify(params));
    
    // 必須項目のチェック
    if (!params.name || !params.promptMethod) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: '必須項目が入力されていません'
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(response);
    }

    // スプレッドシートにデータを追加
    const result = addDataToSpreadsheet(params);
    
    if (result.success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          message: 'データが正常に保存されました'
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(response);
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'サーバーエラーが発生しました'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * OPTIONSリクエスト（プリフライト）の処理
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * スプレッドシートにデータを追加
 */
function addDataToSpreadsheet(params) {
  try {
    // スプレッドシートを開く
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('アンケート回答');
    
    // シートが存在しない場合は作成
    if (!sheet) {
      sheet = spreadsheet.insertSheet('アンケート回答');
      
      // ヘッダー行を追加
      const headers = [
        'タイムスタンプ',
        '名前',
        'AIランキング',
        '使い方ランキング',
        'AIの良い点',
        'プロンプト入力方法',
        '工夫や独自の使い方'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // ヘッダー行のスタイル設定
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // 新しい行にデータを追加
    const timestamp = new Date();
    const rowData = [
      timestamp,
      params.name || '',
      params.favoriteAI || '',
      params.usage || '',
      params.aiAdvantages || '',
      params.promptMethod || '',
      params.tips || ''
    ];
    
    sheet.appendRow(rowData);
    
    // 列幅を自動調整
    sheet.autoResizeColumns(1, 7);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error in addDataToSpreadsheet:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * スプレッドシートを初期化（手動実行用）
 */
function initializeSpreadsheet() {
  try {
    // 新しいスプレッドシートを作成
    const spreadsheet = SpreadsheetApp.create('AIアンケート回答データ');
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName('アンケート回答');
    
    // ヘッダー行を設定
    const headers = [
      'タイムスタンプ',
      '名前',
      'AIランキング',
      '使い方ランキング',
      'AIの良い点',
      'プロンプト入力方法',
      '工夫や独自の使い方'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // ヘッダー行のスタイル設定
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    
    // 列幅を自動調整
    sheet.autoResizeColumns(1, 7);
    
    // スプレッドシートのIDをログに出力
    console.log('スプレッドシートが作成されました');
    console.log('スプレッドシートID:', spreadsheet.getId());
    console.log('スプレッドシートURL:', spreadsheet.getUrl());
    
    return {
      id: spreadsheet.getId(),
      url: spreadsheet.getUrl()
    };
    
  } catch (error) {
    console.error('Error in initializeSpreadsheet:', error);
    throw error;
  }
}

/**
 * テスト用データを追加（開発用）
 */
function addTestData() {
  const testParams = {
    name: 'テスト太郎',
    favoriteAI: '1:ChatGPT, 2:Claude',
    usage: '1:文章作成・編集, 2:プログラミング・コーディング',
    aiAdvantages: 'レスポンスが早くて使いやすいです。',
    promptMethod: '毎回手打ちで入力',
    tips: 'できるだけ具体的に指示を出すようにしています。'
  };
  
  const result = addDataToSpreadsheet(testParams);
  console.log('テストデータ追加結果:', result);
}

/**
 * Webアプリの設定情報を表示（開発用）
 */
function showWebAppInfo() {
  console.log('=== Webアプリ設定手順 ===');
  console.log('1. 「デプロイ」→「新しいデプロイ」をクリック');
  console.log('2. 種類：ウェブアプリ');
  console.log('3. 実行ユーザー：自分');
  console.log('4. アクセスできるユーザー：全員');
  console.log('5. デプロイ後にWebアプリURLを取得');
  console.log('6. HTMLファイルのSCRIPT_URLを更新');
}