# YaxinApple

一个手机端优先的交互式圣诞网页：**打开礼物 → 吃平安果 → 注入祝福能量 → 长成圣诞树 → 树下礼物 → 输入新年愿望**。  
内置雪花背景、动效、背景音乐，以及本地“愿望记录”功能。

## 演示视频（可选）
建议把展示视频作为“文档素材”放在项目内：
- **推荐路径**：`docs/demo.mp4`
- **推荐命名**（二选一）：
  - `demo.mp4`（最简）
  - `yaxin-apple-demo.mp4`（更明确）

放好后，在 README 里通常以“链接”的方式呈现（GitHub 的 README 对本地 mp4 的 `<video>` 内嵌支持不稳定）：
- [点击观看演示视频](./docs/demo.mp4)

> 如果视频体积较大（例如 >50MB），建议使用 Git LFS 或上传到 Releases/网盘，再在 README 放链接。

## 功能一览
- **沉浸式交互流程**：礼物、苹果、种子长按注入、圣诞树、许愿、结局烟花
- **祝福主线**：吃苹果收集祝福词 → 注入种子 → 圣诞树展示祝福
- **背景音乐**：本地文件 `public/bgm.mp3`，右上角可开关（首次点击后播放，符合浏览器策略）
- **愿望记录（本地）**：记录 `IP + 时间 + 愿望` 到 `wishes_data.txt`
- **临时分享**：支持 Cloudflare Tunnel（`trycloudflare.com`）把本机 dev 站点临时发给朋友

## 目录结构（关键文件）
- **前端入口**：`src/App.jsx`
- **场景组件**：`src/components/Scene*.jsx`
- **圣诞树组件**：`src/components/ChristmasTree.jsx`
- **背景音乐组件**：`src/components/BGMPlayer.jsx`
- **雪花背景**：`src/components/Snowfall.jsx`
- **愿望记录服务（本地）**：`server.js`
- **愿望记录文件（运行后生成/追加）**：`wishes_data.txt`

## 本地运行（推荐）
准备：Node.js 18+ / 20+（WSL / Linux / macOS / Windows 均可）

### 1) 安装依赖
```bash
npm install
```

### 2) 启动“愿望记录服务”（写入文件）
在项目根目录开一个终端：
```bash
node server.js
```
启动后会监听：`http://localhost:3000`

### 3) 启动前端
再开一个终端：
```bash
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```
然后访问：`http://localhost:5173/`

> 说明：`vite.config.js` 已为临时 tunnel 分享做了 host 放行（开发环境用）。

## 查看愿望记录
愿望会被追加写入项目根目录的：
- `wishes_data.txt`

命令行查看最近 50 条：
```bash
tail -n 50 wishes_data.txt
```

## 背景音乐
背景音乐文件位置：
- `public/bgm.mp3`

播放器引用路径（无需改动）：
- `src/components/BGMPlayer.jsx` 内使用 `src="/bgm.mp3"`

> 浏览器通常禁止自动播放：需要用户首次点击/触摸后才会开始播放（项目已处理）。

## 临时发给朋友访问（Cloudflare Tunnel）
适合：你电脑开着、只想临时分享一个公网 https 链接。

### 1) 安装 cloudflared（WSL / Ubuntu 用 apt）
```bash
sudo apt update
sudo apt install -y curl gpg
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install -y cloudflared
cloudflared --version
```

### 2) 运行 tunnel（把本地 5173 暴露出去）
```bash
cloudflared tunnel --url http://localhost:5173
```
终端会输出一个 `https://xxxx.trycloudflare.com`，复制给朋友即可。

> 注意：要一直保持 `npm run dev` 与 `cloudflared` 在运行，否则朋友会打不开。

## 常见问题（FAQ）
### 1) 打开 trycloudflare 链接提示 “Blocked request / host is not allowed”
这是 Vite 的 Host 防护。项目已在 `vite.config.js` 里放开了：
- `server.allowedHosts: true`

如果仍然出现，多半是你 tunnel 指向了旧端口/旧 Vite 进程。建议：
- 只保留一个 Vite 跑在 5173（使用 `--strictPort`）
- 重启 Vite + 重启 cloudflared

### 2) 为什么没有愿望记录？
愿望写文件需要本地服务：
- 必须运行 `node server.js`
- 前端会 `POST /api/wish`，由 Vite 代理转发到 `http://localhost:3000/api/wish`

## 部署说明（可选）
本项目的“写入本地文件”只适用于你自己机器运行。  
如果要部署到 Cloudflare Pages / Vercel 这类静态托管平台，**无法写本地 `wishes_data.txt`**，需要改用 Cloudflare Workers + D1/KV/R2 等后端存储。
