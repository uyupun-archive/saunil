# SAUNIL

## 環境構築

※ Node.js は v16 以上 npm は v8.18.0 を使用する

```
// クローン
$ git clone https://github.com/uyupun/spajam-2022-app.git

// ディレクトリの移動
$ cd spajam-2022-app

// パッケージのインストール
$ npm i

// プロジェクトの起動
$ npm run start
```

## スクリプト

スマートフォンに Expo のアプリを導入することでエミュレーターをインストールしなくても動作確認が可能

App Store: https://apps.apple.com/jp/app/expo-go/id982107779  
Google Play: https://play.google.com/store/apps/details?id=host.exp.exponent

```
// プロジェクトの起動
$ npm run start

// Android Studio エミュレーターでプロジェクトを確認する際に使用するスクリプト
// Android Studio エミュレーターの起動方法: https://docs.expo.dev/workflow/android-studio-emulator/
$ npm run android

// iOS シミュレーターでプロジェクトを確認する際に使用するスクリプト
// iOS シミュレーターの起動方法: https://docs.expo.dev/workflow/ios-simulator/
$ npm run ios
```
