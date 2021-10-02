# Restaurant List
A simple web application for favorate restaurant list

## Features
- Create data of restaurants from restaurant.json file
- Tap restaurant picture can see detail information
- Can searching restaurant name and category 
- Can add favorate restaurant
- Can edit restaurant data
- Can delete restaurant data


### Searching
type the name or category of the restaurant in search bar

### How To Use
1.Downlod all files
2.Run VS code 
3.Run "npm install" to install all modules
4.Run "npm run seed" to create restaurant data
4.Run "npm run dev" to start 
5.Open browser and go to "localhost:3000"
6.Have fun

### 中文解說 
### 此Project為AC作業
### 使用技術
- 使用express
- 讀取 restaurant.JSON 檔案，將種子資料存入mongoDB資料庫中
- 從資料庫讀取資料帶入 handlebars 樣板中動態呈現
- 操作 handlebars 中的 each 迴圈呈現出多張餐廳卡片
- 使用express路由功能


### 使用方法
1.將檔案下載
2.開啟VS code
3.運行"npm install"安裝所有modules
4.執行"npm run seed"建立餐廳資料庫
5.用"npm run dev"啟動
6.打開瀏覽器，輸入"localhost:3000"即可看到網頁

### 程式功能
- 可以看到八個餐廳圖片及簡單資料
- 可以點選餐廳圖片，查看餐廳詳細資料
- 搜尋功能。可以透過搜尋餐廳名及分類找到想要之餐廳
- 可自行建立想要的餐廳資料
- 可修改已建立之餐廳資料
- 可刪除以建立之餐廳資料
