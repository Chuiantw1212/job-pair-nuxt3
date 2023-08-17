# Job Pair 開源計畫
![Job Pair Logo](./assets/ogImageJob.png)

## 在本機開啟的步驟
1. 切換到development分支
2. 安裝套件
```javascript
npm install
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
| UI相關套件                 |                                                |
| --  @glidejs/glide         | 基於原生JS的輕量套件                           |
| --  bootstrap              | Bootstrap                                      |
| --  ckeditor5-custom-build | Rich Text Editor                               |
| --  flatpickr              | 基於原生JS的輕量套件                           |
| --  nouislider             | 基於原生JS的輕量套件                           |
| --  sweetalert2            | 基於原生JS的輕量套件                           |
| --  sass                   | scss preprocessor                              |

## 發布須知
1. 安裝 Firebase CLI (https://firebase.tools/bin/win/instant/latest)
2. 安裝 firebase-tools (https://www.npmjs.com/package/firebase-tools)
3. 切換到正確的分支
4. 避免Windows權限問題 (https://github.com/firebase/firebase-tools/issues/1627)

### Firebase相關
配置標頭 (https://firebase.google.com/docs/hosting/full-config#headers)

### 建立GCP + NGINX 配置
1. 檢視現有VPC Networks
```
gcloud compute networks list
```

2. 建立一個新的Hybrid Connectivity -> Cloud Router
```
gcloud compute routers create asia-east1 \
  --network=default \
  --region=asia-east1
```

3. 保留靜態 VPC Networks -> IP Addresses
這個固態IP預定要給公司的單獨頁面使用，故命名為ORIGIN_IP_NAME為organization
```
gcloud compute addresses create ORIGIN_IP_NAME --region=asia-east1
```

4. 建立Cloud NAT gateway
```
gcloud compute routers nats create asia-east1-organization \
  --router=asia-east1 \
  --region=asia-east1 \
  --nat-all-subnet-ip-ranges \
  --nat-external-ip-pool=organization
```

5. Create the VPC connector
```
gcloud services enable vpcaccess.googleapis.com

gcloud compute networks vpc-access connectors create asia-east1-connector \
    --network default \
    --region asia-east1 \
    --range 10.8.0.0/28
```