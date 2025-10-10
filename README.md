# GameHub - Ultimate Gaming Experience

一个现代化的游戏网站，展示50个精选游戏，采用欧美流行的设计风格。

## 🎮 功能特点

### 首页功能
- **响应式设计**: 完美适配桌面、平板和手机设备
- **50个游戏展示**: 每行5个游戏，共10行，包含各种类型的游戏
- **游戏分类**: 支持按类别筛选游戏（动作、益智、赛车、策略、休闲等）
- **搜索功能**: 可以搜索游戏标题、描述和类别
- **现代化UI**: 采用深色主题，霓虹绿色点缀，欧美流行风格
- **动画效果**: 流畅的悬停动画和页面过渡效果

### 游戏详情页
- **游戏iframe嵌入**: 直接在页面中运行游戏
- **全屏模式**: 支持游戏全屏显示
- **游戏信息**: 详细的游戏描述、操作说明和特色功能
- **相关推荐**: 显示同类别的其他游戏
- **社交分享**: 支持分享到Facebook、Twitter、WhatsApp
- **游戏统计**: 显示评分、玩家数、类别、难度等信息

### 技术特性
- **纯前端实现**: 使用HTML、CSS、JavaScript构建
- **无框架依赖**: 轻量级，加载速度快
- **现代CSS**: 使用Grid、Flexbox、CSS变量等现代特性
- **响应式布局**: 自适应各种屏幕尺寸
- **SEO友好**: 语义化HTML结构

## 🚀 快速开始

### 1. 下载文件
将所有文件下载到本地目录：
```
GAME11/
├── index.html          # 首页
├── game-detail.html    # 游戏详情页
├── styles.css          # 主样式文件
├── game-detail.css     # 详情页样式
├── script.js           # 主JavaScript文件
├── game-detail.js      # 详情页JavaScript
└── README.md           # 说明文档
```

### 2. 运行网站
直接在浏览器中打开 `index.html` 文件即可开始使用。

### 3. 本地服务器（推荐）
为了更好的体验，建议使用本地服务器：

#### 使用Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用Node.js
```bash
# 安装http-server
npm install -g http-server

# 运行服务器
http-server
```

#### 使用Live Server (VS Code扩展)
在VS Code中安装Live Server扩展，右键点击 `index.html` 选择 "Open with Live Server"。

### 4. 专题游戏落地页入口
- 启动本地服务器后访问 [`http://localhost:8000/games/`](http://localhost:8000/games/)（或你配置的端口），即可看到“专题游戏落地页目录”。
- 页面提供最近生成的 50 个 `/games/<slug>/` 专题页链接与搜索框，可直接点击跳转预览。
- 如果只想打开单个页面，也可以在浏览器地址栏输入 `http://localhost:8000/games/<slug>/`，例如 `http://localhost:8000/games/connections/`。

### 5. 查看昨天改动过的文件
如果想快速确认昨天提交了哪些改动，可以在项目根目录执行以下命令：

```bash
# 显示昨天（含）以来的提交摘要
git log --since="yesterday" --oneline

# 查看昨天至今每个提交涉及的文件与增删行数
git log --since="yesterday" --stat

# 只想看昨天的实际差异，可结合 --until 限定时间范围
git log --since="yesterday" --until="today" -p
```

> 💡 如果你需要查看某个具体提交的文件内容，可以把 `git log` 输出的提交哈希复制出来，然后使用 `git show <commit>` 或 `git diff <old>..<new>` 查看详细差异。

## 🎯 使用说明

### 浏览游戏
1. 打开首页，可以看到50个游戏的网格展示
2. 每个游戏卡片显示游戏图标、标题、描述、评分和玩家数
3. 点击任意游戏卡片进入游戏详情页

### 筛选游戏
1. 在首页点击"Categories"部分的不同类别卡片
2. 页面会自动筛选并显示该类别的游戏
3. 点击"Home"可以返回查看所有游戏

### 玩游戏
1. 在游戏详情页，游戏会自动加载在iframe中
2. 点击"Play Now"按钮聚焦到游戏区域
3. 点击"Fullscreen"按钮进入全屏模式
4. 按F11键或ESC键可以快速切换全屏模式

### 分享游戏
1. 在游戏详情页右侧找到分享按钮
2. 点击相应的社交平台图标进行分享
3. 点击"Copy Link"复制游戏链接到剪贴板

## 🎨 自定义配置

### 添加新游戏
在 `script.js` 和 `game-detail.js` 中的 `gamesData` 数组添加新游戏：

```javascript
{
    id: 51,
    title: "新游戏名称",
    description: "游戏描述",
    category: "游戏类别",
    rating: 4.5,
    players: "1",
    thumbnail: "🎮",
    iframeUrl: "游戏iframe地址",
    about: "详细描述",
    instructions: ["操作说明1", "操作说明2"],
    features: ["特色1", "特色2"],
    difficulty: "难度等级"
}
```

### 修改样式
- 主样式在 `styles.css` 中
- 游戏详情页样式在 `game-detail.css` 中
- 主要颜色变量：
  - 主色调: `#00ff88` (霓虹绿)
  - 背景色: `#0f0f23`, `#1a1a2e`, `#16213e`
  - 文字色: `#fff`, `#ccc`

### 修改布局
- 游戏网格布局在 `.games-grid` 中配置
- 响应式断点在CSS文件末尾的媒体查询中设置

## 📱 响应式设计

网站完全响应式，支持以下设备：
- **桌面**: 1200px+ (每行5个游戏)
- **平板**: 768px-1199px (每行3-4个游戏)
- **手机**: 480px-767px (每行2个游戏)
- **小屏手机**: <480px (每行1个游戏)

## 🌟 特色功能

### 动画效果
- 游戏卡片悬停动画
- 页面滚动视差效果
- 加载动画和过渡效果
- 浮动游戏图标动画

### 交互功能
- 移动端汉堡菜单
- 平滑滚动导航
- 返回顶部按钮
- 键盘快捷键支持

### 用户体验
- 游戏加载状态提示
- 错误处理和重试机制
- 本地存储收藏功能
- 社交分享集成

## 🔧 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代布局和动画
- **JavaScript ES6+**: 交互逻辑
- **Font Awesome**: 图标库
- **Google Fonts**: 字体库

## 📄 许可证

本项目采用 MIT 许可证，可自由使用和修改。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: info@gamehub.com
- 网站: https://gamehub.com

---

**享受游戏时光！** 🎮✨ 
### 6. hotspotgame 页面数据来源
若想了解 `https://youxistudio.com/hotspotgame` 页面展示的数据来自何处，可参考《[hotspotgame 数据来源与维护指引](docs/hotspotgame-data.md)》。文档说明了：

- 页面走 `/api/games/<game_name>` 接口，从 Postgres 的 `gm_games` 表读取最新记录；
- 真实数据只存放在数据库中，仓库里没有可直接修改的 JSON 文件；
- 若需更新内容，需要使用 Prisma Studio 或数据库脚本来写入新数据。
