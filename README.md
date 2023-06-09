# 家庭記帳本

## 介紹

這是一個利用 Express 打造的家庭記帳本網頁，可以建立個人帳號新增支出紀錄。

### 功能描述

- 按類別查詢支出
- 新增支出
- 修改支出
- 刪除支出

## 環境建置與需求

- [Node.js](https://nodejs.org/en/)
- [Node Package Manager](https://www.npmjs.com/)
- [Express](https://www.npmjs.com/package/express)
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mongoose](https://mongoosejs.com/)

## 安裝與執行步驟

1. 開啟終端機(Terminal)，將專案 Clone 到本機電腦

```
git clone https://github.com/tschiang23/expense-tracker.git
```

2. 進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝專案相關套件

```
npm install
```

4. 設定.env檔，參考 .env.example

5. 設定 MongoDB 連接

6. 載入種子資料

```
npm run seed
```

6. 啟動伺服器

```
npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
mongoDB connected
Server is running on http://localhost:3000
```
