const fs = require('fs');
const path = require('path');

const pages = [
  {
    name: 'Connections Game',
    slug: 'connections',
    summary: '2024 年度爆火的词语关联益智游戏，在限定步数内找出隐藏分类。',
    focus: '不断观察词语之间的线索，推断四个正确组合。',
    category: '益智 / 文字',
    tags: ['词语关联', '逻辑推理', '每日挑战']
  },
  {
    name: 'Palworld',
    slug: 'palworld',
    summary: '将怪物捕捉、建造与合作生存融合的开放世界冒险。',
    focus: '利用 Pal 伙伴协助采集、战斗与建造基地。',
    category: '生存 / 合成',
    tags: ['开放世界', '伙伴收集', '建造制作']
  },
  {
    name: 'Infinite Craft',
    slug: 'infinite-craft',
    summary: '通过无穷组合探索新事物的合成类网页游戏。',
    focus: '尝试不同素材搭配，解锁意想不到的组合结果。',
    category: '合成 / 沙盒',
    tags: ['元素合成', '创意实验', '轻松休闲']
  },
  {
    name: 'Sprunki',
    slug: 'sprunki',
    summary: '结合节奏玩法与创意拼接的音乐互动体验。',
    focus: '在不同节奏片段之间切换，打造专属音轨。',
    category: '音乐 / 益智',
    tags: ['节奏挑战', '创意拼接', '解谜探索']
  },
  {
    name: 'Helldivers 2',
    slug: 'helldivers-2',
    summary: '强调团队协作与火力配合的第三人称射击续作。',
    focus: '在银河战场协调战术支援，完成高强度任务。',
    category: '射击 / 合作',
    tags: ['战术协作', '科幻战斗', '多人联机']
  },
  {
    name: 'Browser Puzzle Game',
    slug: 'browser-puzzle',
    summary: '集合多种网页益智玩法的轻量化解谜入口。',
    focus: '直接在浏览器中体验棋盘、逻辑与图形等多类谜题。',
    category: '益智 / 集合',
    tags: ['网页解谜', '休闲脑力', '即点即玩']
  },
  {
    name: 'Idle Merge Game',
    slug: 'idle-merge',
    summary: '将放置养成与合并成长相结合的轻松游戏体验。',
    focus: '通过自动产出与手动合成，持续升级资源等级。',
    category: '放置 / 合成',
    tags: ['放置养成', '等级进化', '轻度策略']
  },
  {
    name: 'Monster Merge',
    slug: 'monster-merge',
    summary: '以怪兽合成为核心的策略养成玩法。',
    focus: '不断收集并合成怪兽，打造更强阵容。',
    category: '合成 / 怪兽',
    tags: ['怪物收集', '数值成长', '策略布阵']
  },
  {
    name: 'Stickman Hook',
    slug: 'stickman-hook',
    summary: '利用钩爪摆动闯关的经典火柴人小游戏。',
    focus: '掌握摆动节奏与释放时机，顺利触达终点。',
    category: '动作 / 跑酷',
    tags: ['物理摆动', '关卡挑战', '轻松操作']
  },
  {
    name: 'Helix Jump 3D',
    slug: 'helix-jump-3d',
    summary: '围绕旋转螺旋塔进行下落闯关的休闲作品。',
    focus: '躲避障碍并利用加速区域快速突破。',
    category: '休闲 / 反应',
    tags: ['螺旋跳跃', '手速挑战', '碎片时间']
  },
  {
    name: 'Crowd Run 3D',
    slug: 'crowd-run-3d',
    summary: '带领人群穿越机关的 3D 跑酷闯关。',
    focus: '通过分叉选择与障碍判断，保持队伍规模。',
    category: '跑酷 / 策略',
    tags: ['人群挑战', '路线选择', '节奏把控']
  },
  {
    name: 'Geometry Dash Lite',
    slug: 'geometry-dash-lite',
    summary: '节奏感与反应力并重的几何跳跃经典版本。',
    focus: '跟随背景音乐节拍把握跳跃节奏。',
    category: '音乐 / 跳跃',
    tags: ['节奏闯关', '快速反应', '复古像素']
  },
  {
    name: 'Paper.io 3D',
    slug: 'paperio-3d',
    summary: '占领立体空间的 3D 版本纸片领地对抗。',
    focus: '规划路线扩张领域，同时防守自己的路径。',
    category: 'io / 对抗',
    tags: ['领地争夺', '实时对抗', '空间策略']
  },
  {
    name: 'Slope Ball',
    slug: 'slope-ball',
    summary: '控制球体穿越障碍的高节奏挑战。',
    focus: '在曲折赛道中躲避障碍并掌控跳跃节奏。',
    category: '跑酷 / 反应',
    tags: ['高速滑行', '精准操作', '街机体验']
  },
  {
    name: 'Car Rush Online',
    slug: 'car-rush-online',
    summary: '以高速驾驶冲刺为目标的在线赛车小游戏。',
    focus: '规避车流并在限时内抵达终点。',
    category: '赛车 / 反应',
    tags: ['极速竞速', '躲避交通', '轻量操作']
  },
  {
    name: 'Tunnel Rush',
    slug: 'tunnel-rush',
    summary: '穿梭色彩隧道的高强度反应闯关。',
    focus: '抓住节奏切换赛道，避开高速迎来的障碍。',
    category: '跑酷 / 视觉',
    tags: ['隧道冲刺', '炫彩特效', '极限挑战']
  },
  {
    name: 'Stack Colors',
    slug: 'stack-colors',
    summary: '收集对应颜色并堆叠得分的跑酷作品。',
    focus: '在赛道上精准选择目标颜色打造高分塔。',
    category: '跑酷 / 益智',
    tags: ['颜色匹配', '堆叠冲刺', '轻松上手']
  },
  {
    name: 'Merge Beasts Online',
    slug: 'merge-beasts-online',
    summary: '通过合成野兽提升战斗力的在线策略体验。',
    focus: '合并同类野兽，逐步解锁更强单位。',
    category: '合成 / 战斗',
    tags: ['野兽养成', '阵容构建', '逐级进化']
  },
  {
    name: 'Ball Attack Game',
    slug: 'ball-attack',
    summary: '操控弹球消除砖块的经典街机玩法。',
    focus: '利用反弹角度与道具组合高效清屏。',
    category: '街机 / 弹球',
    tags: ['砖块消除', '道具收集', '手眼协调']
  },
  {
    name: 'Dog Escape Game',
    slug: 'dog-escape',
    summary: '帮助小狗逃离迷宫与陷阱的可爱解谜。',
    focus: '观察路线与机关，安全护送狗狗到出口。',
    category: '解谜 / 冒险',
    tags: ['迷宫探索', '机关破解', '治愈画风']
  },
  {
    name: 'Bunny Jump 3D',
    slug: 'bunny-jump-3d',
    summary: '操控小兔完成立体跳跃闯关的轻松作品。',
    focus: '借助弹跳与平台切换，收集沿途奖励。',
    category: '跳跃 / 休闲',
    tags: ['萌系角色', '立体平台', '碎片娱乐']
  },
  {
    name: 'Monster Dash Online',
    slug: 'monster-dash-online',
    summary: '快节奏的怪物主题跑酷射击小游戏。',
    focus: '边跑边击败障碍怪物，维持高能量输出。',
    category: '跑酷 / 射击',
    tags: ['怪物冲刺', '连击火力', '节奏操作']
  },
  {
    name: 'Zombie Merge',
    slug: 'zombie-merge',
    summary: '以僵尸合成为核心的塔防式策略体验。',
    focus: '通过合并僵尸形成更强防线抵御敌潮。',
    category: '合成 / 塔防',
    tags: ['僵尸阵容', '波次防守', '资源规划']
  },
  {
    name: 'Block Puzzle Classic',
    slug: 'block-puzzle-classic',
    summary: '放置方块消除行列的经典拼图玩法。',
    focus: '合理安排方块位置，保持棋盘持续可用。',
    category: '益智 / 方块',
    tags: ['俄罗斯方块', '脑力布局', '轻松解压']
  },
  {
    name: 'Color Switch Reloaded',
    slug: 'color-switch-reloaded',
    summary: '通过切换颜色穿越障碍的全新版本。',
    focus: '掌握颜色同步规则，在旋转机关中前进。',
    category: '休闲 / 反应',
    tags: ['颜色挑战', '节奏切换', '快速反馈']
  },
  {
    name: 'Fruit Merge 3D',
    slug: 'fruit-merge-3d',
    summary: '将水果合并升级的 3D 视角休闲作品。',
    focus: '拖拽同类水果合成高等级品种。',
    category: '合成 / 休闲',
    tags: ['水果收集', '等级解锁', '放松治愈']
  },
  {
    name: 'Push Puzzle',
    slug: 'push-puzzle',
    summary: '以推箱子机制为核心的逻辑解谜。',
    focus: '规划移动顺序，让箱子抵达指定位置。',
    category: '益智 / 推理',
    tags: ['推箱子', '空间思维', '步数规划']
  },
  {
    name: 'Fireboy Watergirl',
    slug: 'fireboy-watergirl',
    summary: '火男与水女孩双人协作的经典闯关。',
    focus: '切换角色配合机关，安全到达终点门。',
    category: '双人 / 解谜',
    tags: ['合作闯关', '元素互动', '家庭娱乐']
  },
  {
    name: 'Subway Run 3D',
    slug: 'subway-run-3d',
    summary: '穿梭地铁场景的 3D 跑酷冒险。',
    focus: '躲避列车与路障，收集金币刷新纪录。',
    category: '跑酷 / 反应',
    tags: ['地铁冒险', '连续跳跃', '高分挑战']
  },
  {
    name: 'Parkour Rush',
    slug: 'parkour-rush',
    summary: '强调速度与翻越动作的跑酷冲刺体验。',
    focus: '抓住助跑节奏，流畅跨越复杂地形。',
    category: '跑酷 / 动作',
    tags: ['极限翻越', '节奏冲刺', '指尖操作']
  },
  {
    name: 'Swing Monkey',
    slug: 'swing-monkey',
    summary: '操控小猴荡秋千前进的物理闯关。',
    focus: '利用绳索摆动幅度抓准松手时机。',
    category: '动作 / 物理',
    tags: ['绳索摆荡', '卡通风格', '解压体验']
  },
  {
    name: 'Flip Diving 3D',
    slug: 'flip-diving-3d',
    summary: '进行空翻跳水表演的 3D 模拟游戏。',
    focus: '掌控俯冲角度与入水姿势获得高分。',
    category: '体育 / 模拟',
    tags: ['极限跳水', '动作表演', '手感挑战']
  },
  {
    name: 'Neon Runner',
    slug: 'neon-runner',
    summary: '霓虹赛道上的节奏跑酷体验。',
    focus: '跟随电音节拍在光轨间切换。',
    category: '跑酷 / 节奏',
    tags: ['霓虹风格', '音乐律动', '快速反应']
  },
  {
    name: 'Rocket Jump',
    slug: 'rocket-jump',
    summary: '借助火箭反冲完成高难跳跃的动作小游戏。',
    focus: '把握喷射方向与力度，抵达更高平台。',
    category: '动作 / 技巧',
    tags: ['火箭助推', '高空挑战', '精准控制']
  },
  {
    name: 'Tunnel Run',
    slug: 'tunnel-run',
    summary: '穿越长廊隧道的轻量化跑酷体验。',
    focus: '在多彩通道中灵活躲避突发障碍。',
    category: '跑酷 / 休闲',
    tags: ['速度闯关', '视觉刺激', '轻松入门']
  },
  {
    name: 'Jump Hero',
    slug: 'jump-hero',
    summary: '化身跳跃英雄征服平台关卡的动作游戏。',
    focus: '掌握蓄力跳跃与落点控制连续通关。',
    category: '动作 / 跳跃',
    tags: ['英雄冒险', '平台挑战', '节奏掌控']
  },
  {
    name: 'Catch Colors',
    slug: 'catch-colors',
    summary: '围绕色彩捕捉展开的手速反应玩法。',
    focus: '根据提示快速选择正确颜色目标。',
    category: '休闲 / 反应',
    tags: ['颜色识别', '手眼协调', '极速挑战']
  },
  {
    name: 'Galaxy Shooter',
    slug: 'galaxy-shooter',
    summary: '驾驶战机清除敌潮的太空射击经典。',
    focus: '灵活走位并释放道具守护银河。',
    category: '射击 / 街机',
    tags: ['太空战斗', '弹幕闪避', '武器升级']
  },
  {
    name: 'Star Merge',
    slug: 'star-merge',
    summary: '以星体合成为主题的轻策略玩法。',
    focus: '合并恒星升级，点亮更多星域。',
    category: '合成 / 宇宙',
    tags: ['星系养成', '资源循环', '放松体验']
  },
  {
    name: 'Word Connect Puzzle',
    slug: 'word-connect-puzzle',
    summary: '连线拼字挑战词汇量的文字游戏。',
    focus: '从字母盘组合单词，完成关卡目标。',
    category: '文字 / 益智',
    tags: ['单词拼写', '词汇拓展', '每日训练']
  },
  {
    name: 'Brain Teaser 3D',
    slug: 'brain-teaser-3d',
    summary: '立体机关与空间推理结合的 3D 益智合集。',
    focus: '旋转、拖拽立体结构破解谜题。',
    category: '益智 / 3D',
    tags: ['空间思维', '机关解锁', '动脑挑战']
  },
  {
    name: 'Tower Defense Arena',
    slug: 'tower-defense-arena',
    summary: '构建防线抵御敌潮的塔防竞技场。',
    focus: '合理布置炮塔与技能，守住每一波进攻。',
    category: '塔防 / 策略',
    tags: ['阵地防守', '资源分配', '策略搭配']
  },
  {
    name: 'Merge Gardens',
    slug: 'merge-gardens',
    summary: '在庭院中合成植物与装饰的休闲游戏。',
    focus: '通过合成解锁新物品，打造梦幻花园。',
    category: '合成 / 模拟',
    tags: ['园艺设计', '装饰收藏', '慢节奏']
  },
  {
    name: 'Merge Kingdoms',
    slug: 'merge-kingdoms',
    summary: '建设与扩张王国的合成策略玩法。',
    focus: '升级建筑与士兵，提升王国实力。',
    category: '合成 / 策略',
    tags: ['王国发展', '军队养成', '资源管理']
  },
  {
    name: 'Water Sort 3D',
    slug: 'water-sort-3d',
    summary: '在试管间倒水排序的 3D 益智游戏。',
    focus: '观察颜色层级，将同色液体集中。',
    category: '益智 / 排序',
    tags: ['颜色分类', '逻辑思考', '减压玩法']
  },
  {
    name: 'Labyrinth Maze',
    slug: 'labyrinth-maze',
    summary: '穿越复杂迷宫寻找出口的探索游戏。',
    focus: '记忆路线并避开陷阱抵达终点。',
    category: '迷宫 / 探索',
    tags: ['路线规划', '机关破解', '冒险体验']
  },
  {
    name: 'Shadow Runner',
    slug: 'shadow-runner',
    summary: '以影子为主题的高速跑酷体验。',
    focus: '在光影交错的关卡中保持前进节奏。',
    category: '跑酷 / 动作',
    tags: ['剪影风格', '高速躲避', '节奏敏锐']
  },
  {
    name: 'Neon Grid Runner',
    slug: 'neon-grid-runner',
    summary: '霓虹网格赛道上的极速跑酷。',
    focus: '根据网格提示及时换道与跳跃。',
    category: '跑酷 / 科幻',
    tags: ['网格视效', '未来风格', '反应训练']
  },
  {
    name: 'Mini Golf Challenge',
    slug: 'mini-golf-challenge',
    summary: '轻松又考验手感的迷你高尔夫挑战。',
    focus: '控制力度与角度，完成多变球道。',
    category: '体育 / 休闲',
    tags: ['高尔夫推杆', '物理判定', '聚会娱乐']
  },
  {
    name: 'Memory Match Classic',
    slug: 'memory-match-classic',
    summary: '翻牌配对训练记忆力的经典小游戏。',
    focus: '记住图案位置，快速完成配对。',
    category: '益智 / 记忆',
    tags: ['翻牌挑战', '脑力训练', '家庭互动']
  }
];

function buildAudience(tags) {
  if (!tags || tags.length === 0) {
    return '喜爱轻量网页游戏的玩家';
  }
  if (tags.length === 1) {
    return `喜欢${tags[0]}体验的玩家`;
  }
  if (tags.length === 2) {
    return `喜欢${tags[0]}与${tags[1]}玩法的玩家`;
  }
  const last = tags[tags.length - 1];
  const others = tags.slice(0, -1).join('、');
  return `喜欢${others}与${last}体验的玩家`;
}

function cleanFocus(text) {
  return text.replace(/[。\s]+$/, '');
}

function buildSteps(page) {
  const focus = cleanFocus(page.focus);
  return [
    `点击页面顶部的“开始试玩”按钮，等待 ${page.name} 加载完成。`,
    `在体验过程中牢记「${focus}」这一核心节奏，并关注 ${page.tags[0]} 元素。`,
    '完成一轮挑战后，可刷新关卡或更换设备继续体验。'
  ];
}

function buildFaq(page) {
  const focus = cleanFocus(page.focus);
  return [
    {
      question: `${page.name} 是否支持移动端游玩？`,
      answer: `${page.name} 为 HTML5 形式，大多数现代浏览器（包括手机和平板）均可直接打开。如果遇到加载问题，建议切换 Wi-Fi 或更换浏览器重试。`
    },
    {
      question: `如何在本站快速开始 ${page.name}？`,
      answer: `滚动到“在线试玩”区域，点击占位区中的加载按钮即可。我们也会持续收录可靠来源，方便你第一时间体验 ${focus}。`
    }
  ];
}

function buildHtml(page) {
  const audience = buildAudience(page.tags);
  const steps = buildSteps(page);
  const faqs = buildFaq(page);
  const metaDescription = `${page.name} 在线试玩页面，${page.summary} 提供玩法指南、常见问题与热门关键词整理。`;
  const keywords = page.tags.join('、');

  return `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name} 在线玩 - Shadowmilk Scratch Arcade</title>
  <meta name="description" content="${metaDescription}">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/game-landing.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="/index.html">游戏导航</a>
      <nav class="site-nav" aria-label="主要导航">
        <a href="/index.html">首页</a>
        <a href="/latest-games.html">最新游戏</a>
        <a href="/games.html">游戏索引</a>
        <a href="/game-sites.html">游戏站榜单</a>
        <a href="/game-navigation.html">软件导航</a>
        <a href="/scratch-scraper.html">游戏抓取</a>
      </nav>
    </div>
  </header>

  <main class="game-landing">
    <section class="game-hero">
      <div class="container">
        <p class="eyebrow">在线小游戏</p>
        <h1>${page.name}</h1>
        <p class="game-subtitle">${page.summary} 支持在浏览器中直接体验。</p>
        <div class="cta-group">
          <a class="cta primary" href="#play">开始试玩</a>
          <a class="cta secondary" href="/game-sites.html">发现更多</a>
        </div>
      </div>
    </section>

    <section id="play" class="game-body">
      <div class="container game-layout">
        <article class="game-content" aria-label="${page.name} 玩法内容">
          <section class="game-section">
            <h2>游戏介绍</h2>
            <p>${page.summary} 这款 ${page.category} 类型的作品无需下载，打开网页即可畅玩。</p>
            <p>${page.focus} 页面同步整理了关键词与入门提示，帮助你在短时间内掌握要领。</p>
          </section>

          <section class="game-section">
            <h2>快速上手</h2>
            <ol>
              ${steps.map(step => `<li>${step}</li>`).join('\n              ')}
            </ol>
          </section>

          <section class="game-section">
            <h2>常见问题</h2>
            ${faqs.map(faq => `<details>
              <summary>${faq.question}</summary>
              <p>${faq.answer}</p>
            </details>`).join('\n            ')}
          </section>
        </article>

        <aside class="game-sidebar" aria-label="${page.name} 在线试玩与信息">
          <section class="game-section">
            <h2>在线试玩</h2>
            <div class="game-frame" role="img" aria-label="${page.name} 试玩占位区">
              <p>在此嵌入官方 ${page.name} iframe 或 WebGL 链接，即可立即体验。</p>
              <p class="frame-tip">若暂无可用 iframe，可链接到官方页面或下载入口。</p>
            </div>
          </section>

          <section class="game-section">
            <h2>基础信息</h2>
            <ul class="meta-list">
              <li><span>类型：</span>${page.category}</li>
              <li><span>关键词：</span>${keywords}</li>
              <li><span>适合人群：</span>${audience}</li>
            </ul>
          </section>

          <section class="game-section">
            <h2>SEO 建议</h2>
            <p>组合长尾词尝试：<strong>${page.name.toLowerCase()} online</strong>、<strong>${page.slug.replace(/-/g, ' ')} free play</strong>、<strong>${page.slug.replace(/-/g, ' ')} html5</strong>。</p>
            <p>建议在文章中加入 <em>${page.tags[0]}</em>、<em>${page.tags[1] || page.tags[0]}</em> 等语义相关词，提高收录表现。</p>
          </section>
        </aside>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>Shadowmilk Scratch Arcade · 一起守护 Scratch 的创意与乐趣</p>
      <div class="footer-links">
        <a href="https://scratch.mit.edu/parents" target="_blank" rel="noopener">家长指引</a>
        <a href="https://scratch.mit.edu/community_guidelines" target="_blank" rel="noopener">社区守则</a>
        <a href="mailto:hello@shadowmilk.org">联系站长</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

const gamesDir = path.join(__dirname, '..', 'games');

pages.forEach(page => {
  const dir = path.join(gamesDir, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  const htmlPath = path.join(dir, 'index.html');
  fs.writeFileSync(htmlPath, buildHtml(page), 'utf8');
  console.log(`Generated ${htmlPath}`);
});
