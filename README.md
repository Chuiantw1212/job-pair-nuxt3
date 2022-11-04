# Job Pair 開源計畫
## 在本機開啟的步驟
1. 切換到development分支
2. 安裝套件同時避開已知的nuxt issue(https://github.com/nuxt/framework/issues/6623)
```javascript
npm install
npm install pinia --legacy-peer-deps
npm uninstall pinia
npm run dev
```
3. 完成，如有問題請line: chuian1212

## 程式碼規範
1. Nuxt 資料夾規範 (https://v3.nuxtjs.org/guide/concepts/auto-imports)
2. Atomic Design (https://bradfrost.com/blog/post/atomic-web-design/)
3. BEM (變體) (https://getbem.com/)

## 技術棧
| 套件名稱                   | 說明                                           |
| -------------------------- | ---------------------------------------------- |
| Nuxt3                      | 基於Vue+Nitro+Vite的SSR框架                    |
| --  vue                    | Vue                                            |
| --  vue-router             | Vue Router                                     |
| --  @pinia/nuxt            | Nuxt的Pinia狀態管理                            |
| JS相關套件                 | Vue的狀態管理                                  |
| --  axios                  | 連線用的模組                                   |
| --  buffer                 | 處理File&Blob用                                |
| --  firebase               | Google Firebase                                |
| --  firebase-admin         | 使用Nitro發布於Firebase Hosting時需要          |
| --  firebase-functions     | 使用Nitro發布於Firebase Hosting時需要          |
| --  firebaseui             | 現成的登入模組，支援第三方登入                 |
| --  Fuze.js                | 模糊搜索                                       |
| --  Mitt                   | 基於原生JS的Event Bus，避免甚麼鬼都記錄在pinia |
| --  socket.io-client       | 原本要做聊天室用的(deprecated)                 |
| UI相關套件                 |                                                |
| --  @glidejs/glide         | 基於原生JS的輕量套件                           |
| --  aos                    | Animate on scroll                              |
| --  bootstrap              | Bootstrap                                      |
| --  ckeditor5-custom-build | Rich Text Editor                               |
| --  flatpickr              | 基於原生JS的輕量套件                           |
| --  Minidenticons          | 生成隨機聊天室的頭像用 (Deprecated)            |
| --  nouislider             | 基於原生JS的輕量套件                           |
| --  sweetalert2            | 基於原生JS的輕量套件                           |
| 我忘記他來幹嘛的           | 就真的忘了                                     |
| --  SASS                   | 改天來試試看拿掉，搞不好拿掉也能跑?            |