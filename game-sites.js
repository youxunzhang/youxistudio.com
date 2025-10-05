const siteCategories = {
    news: "资讯",
    reviews: "评测",
    community: "社区",
    esports: "电竞",
    indie: "独立游戏"
};

const gameSites = [
    {
        rank: 1,
        name: "IGN",
        domain: "ign.com",
        description: "全球最具影响力的游戏与娱乐媒体之一，提供实时游戏新闻、深度评测与热门视频节目。",
        monthlyVisits: 118000000,
        categories: ["news", "reviews"],
        highlights: ["多语言内容", "跨平台测评", "独家采访"]
    },
    {
        rank: 2,
        name: "GameSpot",
        domain: "gamespot.com",
        description: "以详实的图文攻略和客观评分著称，覆盖主机、PC 与移动平台的最新大作与经典游戏。",
        monthlyVisits: 79000000,
        categories: ["news", "reviews"],
        highlights: ["视频评测", "发售日历", "社区讨论"]
    },
    {
        rank: 3,
        name: "PC Gamer",
        domain: "pcgamer.com",
        description: "专注 PC 平台的老牌媒体，从硬件测试到独立游戏推荐，应有尽有。",
        monthlyVisits: 56000000,
        categories: ["news", "reviews", "indie"],
        highlights: ["硬件指南", "Steam 优惠情报", "编辑推荐"]
    },
    {
        rank: 4,
        name: "Metacritic - Games",
        domain: "metacritic.com/game",
        description: "聚合全球媒体与玩家评分的权威指数，快速了解一款游戏的口碑走向。",
        monthlyVisits: 52000000,
        categories: ["reviews"],
        highlights: ["综合评分", "历史数据", "榜单检索"]
    },
    {
        rank: 5,
        name: "Steam",
        domain: "store.steampowered.com",
        description: "全球最大的 PC 数字发行平台，拥有庞大的游戏库、创意工坊与社区功能。",
        monthlyVisits: 450000000,
        categories: ["community", "indie"],
        highlights: ["创意工坊", "限时特惠", "玩家评测"]
    },
    {
        rank: 6,
        name: "Kotaku",
        domain: "kotaku.com",
        description: "以深入报道与文化视角闻名，关注游戏产业、玩家社区与相关亚文化。",
        monthlyVisits: 29000000,
        categories: ["news", "community"],
        highlights: ["行业洞察", "专栏评论", "生活方式"]
    },
    {
        rank: 7,
        name: "Game Rant",
        domain: "gamerant.com",
        description: "快速掌握热门话题、更新内容与技巧攻略的资讯站，适合跟进每日热点。",
        monthlyVisits: 41000000,
        categories: ["news", "reviews"],
        highlights: ["热点追踪", "攻略合集", "内容速递"]
    },
    {
        rank: 8,
        name: "MMO Champion",
        domain: "mmo-champion.com",
        description: "专注大型多人在线游戏的资讯社区，魔兽世界板块尤其活跃。",
        monthlyVisits: 16000000,
        categories: ["community", "news"],
        highlights: ["版本前瞻", "数据挖掘", "论坛交流"]
    },
    {
        rank: 9,
        name: "Dexerto",
        domain: "dexerto.com",
        description: "聚焦电竞、主播与直播文化的综合媒体，覆盖英雄联盟、Valorant 等热门项目。",
        monthlyVisits: 32000000,
        categories: ["esports", "news"],
        highlights: ["战队报道", "赛事解读", "主播访谈"]
    },
    {
        rank: 10,
        name: "Itch.io",
        domain: "itch.io",
        description: "独立开发者首选的平台，收录海量创意游戏与 Game Jam 作品，支持随心定价。",
        monthlyVisits: 26000000,
        categories: ["indie", "community"],
        highlights: ["独立创作", "社区打包", "开发者工具"]
    },
    {
        rank: 11,
        name: "GamesRadar+",
        domain: "gamesradar.com",
        description: "综合性游戏媒体，提供指南、评测与娱乐节目，覆盖主机与PC平台。",
        monthlyVisits: 68000000,
        categories: ["news", "reviews"],
        highlights: ["热门指南", "视频节目", "主机专题"]
    },
    {
        rank: 12,
        name: "Eurogamer",
        domain: "eurogamer.net",
        description: "欧洲地区影响力极高的游戏媒体，以深度特稿与行业分析见长。",
        monthlyVisits: 42000000,
        categories: ["news", "reviews"],
        highlights: ["专题报道", "发行商专访", "欧洲视角"]
    },
    {
        rank: 13,
        name: "Polygon",
        domain: "polygon.com",
        description: "关注游戏、影视与流行文化的综合站点，故事化写作风格鲜明。",
        monthlyVisits: 50000000,
        categories: ["news", "community"],
        highlights: ["文化观察", "独家采访", "故事化专题"]
    },
    {
        rank: 14,
        name: "Rock Paper Shotgun",
        domain: "rockpapershotgun.com",
        description: "英国老牌PC游戏杂志，重点关注独立与策略游戏。",
        monthlyVisits: 26000000,
        categories: ["news", "indie"],
        highlights: ["独立推荐", "策略专栏", "编辑长文"]
    },
    {
        rank: 15,
        name: "Game Informer",
        domain: "gameinformer.com",
        description: "拥有悠久历史的游戏杂志，提供深度评测与封面故事。",
        monthlyVisits: 36000000,
        categories: ["news", "reviews"],
        highlights: ["封面故事", "评分体系", "行业采访"]
    },
    {
        rank: 16,
        name: "GamesBeat",
        domain: "venturebeat.com/games",
        description: "VentureBeat旗下的行业站点，专注商业动向与市场趋势。",
        monthlyVisits: 24000000,
        categories: ["news"],
        highlights: ["产业分析", "投融资报道", "市场趋势"]
    },
    {
        rank: 17,
        name: "PCGamesN",
        domain: "pcgamesn.com",
        description: "聚焦PC平台的大型资讯站，提供硬件与游戏双重内容。",
        monthlyVisits: 30000000,
        categories: ["news", "community"],
        highlights: ["MOD推荐", "硬件指南", "社区讨论"]
    },
    {
        rank: 18,
        name: "Gematsu",
        domain: "gematsu.com",
        description: "专注日本与亚洲游戏信息，发售情报更新迅速。",
        monthlyVisits: 15000000,
        categories: ["news"],
        highlights: ["日式游戏", "发售速报", "官方公告"]
    },
    {
        rank: 19,
        name: "Siliconera",
        domain: "siliconera.com",
        description: "面向全球的日式游戏资讯站，涵盖二次元文化内容。",
        monthlyVisits: 12000000,
        categories: ["news", "community"],
        highlights: ["本地化消息", "二次元专题", "采访翻译"]
    },
    {
        rank: 20,
        name: "Destructoid",
        domain: "destructoid.com",
        description: "以独特幽默的笔触报道游戏新闻与评测，社区互动活跃。",
        monthlyVisits: 18000000,
        categories: ["news", "reviews"],
        highlights: ["独立观点", "每日播客", "社区活动"]
    },
    {
        rank: 21,
        name: "VG247",
        domain: "vg247.com",
        description: "提供快速新闻、攻略与直播节目，覆盖全球玩家。",
        monthlyVisits: 33000000,
        categories: ["news", "reviews"],
        highlights: ["快速报道", "视频直播", "发售日历"]
    },
    {
        rank: 22,
        name: "TheGamer",
        domain: "thegamer.com",
        description: "以攻略速递与娱乐化文章见长，帮助玩家跟进热门话题。",
        monthlyVisits: 38000000,
        categories: ["news", "community"],
        highlights: ["攻略整合", "娱乐清单", "趣味专栏"]
    },
    {
        rank: 23,
        name: "Nintendo Life",
        domain: "nintendolife.com",
        description: "任天堂生态专门站，提供Switch与怀旧平台的内容。",
        monthlyVisits: 21000000,
        categories: ["news", "reviews", "community"],
        highlights: ["Switch评测", "复古专区", "社区活动"]
    },
    {
        rank: 24,
        name: "Push Square",
        domain: "pushsquare.com",
        description: "PlayStation粉丝聚集地，从新闻到奖杯攻略一应俱全。",
        monthlyVisits: 19000000,
        categories: ["news", "reviews", "community"],
        highlights: ["奖杯指南", "固件更新", "编辑评测"]
    },
    {
        rank: 25,
        name: "Pure Xbox",
        domain: "purexbox.com",
        description: "Xbox阵营的权威资讯站，关注第一方与Game Pass内容。",
        monthlyVisits: 11000000,
        categories: ["news", "reviews", "community"],
        highlights: ["Game Pass 更新", "硬件评测", "社群话题"]
    },
    {
        rank: 26,
        name: "RPG Site",
        domain: "rpgsite.net",
        description: "专门报道角色扮演游戏的媒体，涵盖日式与西式作品。",
        monthlyVisits: 8000000,
        categories: ["news", "reviews", "indie"],
        highlights: ["支线攻略", "角色分析", "发售日历"]
    },
    {
        rank: 27,
        name: "Hardcore Gamer",
        domain: "hardcoregamer.com",
        description: "提供全面评测与行业评论的老牌媒体，维持高频更新。",
        monthlyVisits: 9000000,
        categories: ["news", "reviews"],
        highlights: ["评分详解", "周末专题", "播客节目"]
    },
    {
        rank: 28,
        name: "GameRevolution",
        domain: "gamerevolution.com",
        description: "自1996年以来的经典媒体，关注主机评测与指南。",
        monthlyVisits: 14000000,
        categories: ["news", "reviews"],
        highlights: ["经典栏目", "秘籍整理", "行业观察"]
    },
    {
        rank: 29,
        name: "Twinfinite",
        domain: "twinfinite.net",
        description: "以快速攻略与活动提示闻名，涵盖大量服务型游戏。",
        monthlyVisits: 27000000,
        categories: ["news", "community"],
        highlights: ["活动提示", "直播日程", "合作内容"]
    },
    {
        rank: 30,
        name: "Prima Games",
        domain: "primagames.com",
        description: "知名游戏攻略品牌，提供电子指南与装备推荐。",
        monthlyVisits: 16000000,
        categories: ["community"],
        highlights: ["官方攻略", "图文教程", "装备搭配"]
    },
    {
        rank: 31,
        name: "Noisy Pixel",
        domain: "noisypixel.net",
        description: "聚焦日式与独立游戏的媒体，风格轻松幽默。",
        monthlyVisits: 6000000,
        categories: ["news", "indie"],
        highlights: ["视觉小说", "轻松评测", "编辑推荐"]
    },
    {
        rank: 32,
        name: "TouchArcade",
        domain: "toucharcade.com",
        description: "移动平台核心媒体，专注 iOS 游戏评测与论坛。",
        monthlyVisits: 13000000,
        categories: ["news", "community", "indie"],
        highlights: ["iOS评测", "论坛讨论", "新作速递"]
    },
    {
        rank: 33,
        name: "Pocket Gamer",
        domain: "pocketgamer.com",
        description: "关注移动游戏的国际媒体，提供榜单与数据分析。",
        monthlyVisits: 20000000,
        categories: ["news", "community"],
        highlights: ["下载榜单", "开发者专访", "活动报道"]
    },
    {
        rank: 34,
        name: "DroidGamers",
        domain: "droidgamers.com",
        description: "Android 平台的核心站点，覆盖AR、VR与云游戏。",
        monthlyVisits: 7000000,
        categories: ["news", "community"],
        highlights: ["云游戏专区", "更新提醒", "论坛互动"]
    },
    {
        rank: 35,
        name: "TapTap",
        domain: "taptap.io",
        description: "全球独立游戏与手游发行平台，支持社区评分与预约。",
        monthlyVisits: 90000000,
        categories: ["community", "indie"],
        highlights: ["玩家评分", "试玩版本", "开发者活动"]
    },
    {
        rank: 36,
        name: "148Apps",
        domain: "148apps.com",
        description: "专注移动游戏与应用的评测站点，提供评分与榜单。",
        monthlyVisits: 4000000,
        categories: ["reviews"],
        highlights: ["App Store 榜单", "编辑推荐", "限免提示"]
    },
    {
        rank: 37,
        name: "AppSpy",
        domain: "appspy.com",
        description: "提供移动游戏视频评测与直播，帮助玩家快速了解新品。",
        monthlyVisits: 3000000,
        categories: ["news", "reviews"],
        highlights: ["视频速览", "试玩直播", "精品推荐"]
    },
    {
        rank: 38,
        name: "GameFAQs",
        domain: "gamefaqs.gamespot.com",
        description: "经典攻略社区，拥有海量玩家撰写的攻略与FAQ。",
        monthlyVisits: 35000000,
        categories: ["community"],
        highlights: ["玩家攻略", "作弊码", "论坛活动"]
    },
    {
        rank: 39,
        name: "NeoGAF",
        domain: "neogaf.com",
        description: "全球知名游戏论坛，讨论深度行业话题与传闻。",
        monthlyVisits: 9000000,
        categories: ["community"],
        highlights: ["行业爆料", "深度讨论", "独立区"]
    },
    {
        rank: 40,
        name: "ResetEra",
        domain: "resetera.com",
        description: "大型社区论坛，聚集行业从业者与核心玩家。",
        monthlyVisits: 12000000,
        categories: ["community"],
        highlights: ["实时讨论", "行业问答", "社群文化"]
    },
    {
        rank: 41,
        name: "SteamDB",
        domain: "steamdb.info",
        description: "提供Steam数据跟踪、折扣提醒与版本更新信息。",
        monthlyVisits: 23000000,
        categories: ["community", "indie"],
        highlights: ["折扣提醒", "在线人数", "版本记录"]
    },
    {
        rank: 42,
        name: "Pro Game Guides",
        domain: "progameguides.com",
        description: "覆盖吃鸡、二次元等热门网游的攻略站。",
        monthlyVisits: 22000000,
        categories: ["community"],
        highlights: ["活动攻略", "兑换码", "玩法教学"]
    },
    {
        rank: 43,
        name: "GameSkinny",
        domain: "gameskinny.com",
        description: "面向玩家创作的攻略社区，支持投稿与连载。",
        monthlyVisits: 8000000,
        categories: ["community"],
        highlights: ["玩家投稿", "专题连载", "经验分享"]
    },
    {
        rank: 44,
        name: "PCGamesHardware",
        domain: "pcgameshardware.de",
        description: "德语区硬件与PC游戏综合站，评测深入详尽。",
        monthlyVisits: 6000000,
        categories: ["news", "reviews"],
        highlights: ["硬件拆解", "性能测试", "驱动更新"]
    },
    {
        rank: 45,
        name: "GameWatcher",
        domain: "gamewatcher.com",
        description: "关注PC新作与MOD更新的资讯站，提供发售提醒。",
        monthlyVisits: 5000000,
        categories: ["news", "indie"],
        highlights: ["MOD数据库", "发售提醒", "开发者访谈"]
    },
    {
        rank: 46,
        name: "Shacknews",
        domain: "shacknews.com",
        description: "历史悠久的游戏资讯站，社区活跃且主打电竞直播。",
        monthlyVisits: 10000000,
        categories: ["news", "community"],
        highlights: ["直播节目", "赛事报道", "社区挑战"]
    },
    {
        rank: 47,
        name: "Niche Gamer",
        domain: "nichegamer.com",
        description: "聚焦小众精品与独立游戏，更新速度快。",
        monthlyVisits: 4000000,
        categories: ["news", "indie"],
        highlights: ["小众推荐", "日式新品", "编辑点评"]
    },
    {
        rank: 48,
        name: "RPGFan",
        domain: "rpgfan.com",
        description: "深耕RPG领域的媒体，拥有音乐、播客等丰富内容。",
        monthlyVisits: 3000000,
        categories: ["news", "reviews", "indie"],
        highlights: ["原声评测", "专题播客", "复古回顾"]
    },
    {
        rank: 49,
        name: "Co-Optimus",
        domain: "co-optimus.com",
        description: "专注合作游戏的站点，提供联机指南与支持列表。",
        monthlyVisits: 2000000,
        categories: ["community"],
        highlights: ["联机列表", "合作评测", "周末活动"]
    },
    {
        rank: 50,
        name: "Giant Bomb",
        domain: "giantbomb.com",
        description: "以节目化内容闻名，拥有wiki、播客与视频直播。",
        monthlyVisits: 26000000,
        categories: ["community", "reviews"],
        highlights: ["播客节目", "Quick Look", "社区Wiki"]
    },
    {
        rank: 51,
        name: "Video Games Chronicle",
        domain: "videogameschronicle.com",
        description: "英国媒体VGC，擅长行业独家与深度分析。",
        monthlyVisits: 17000000,
        categories: ["news"],
        highlights: ["独家报道", "财报速递", "行业访谈"]
    },
    {
        rank: 52,
        name: "Esports Insider",
        domain: "esportsinsider.com",
        description: "电竞商业媒体，关注赛事运营与投融资动态。",
        monthlyVisits: 5000000,
        categories: ["esports", "news"],
        highlights: ["商业案例", "品牌合作", "峰会活动"]
    },
    {
        rank: 53,
        name: "Dot Esports",
        domain: "dotesports.com",
        description: "覆盖全球电竞赛事的新闻网站，热点更新迅速。",
        monthlyVisits: 42000000,
        categories: ["esports", "news"],
        highlights: ["赛事战报", "战队动态", "数据速递"]
    },
    {
        rank: 54,
        name: "GosuGamers",
        domain: "gosugamers.net",
        description: "国际电竞社区，提供赛事数据库与直播导航。",
        monthlyVisits: 15000000,
        categories: ["esports", "community"],
        highlights: ["赛事数据库", "直播导航", "战术指南"]
    },
    {
        rank: 55,
        name: "HLTV",
        domain: "hltv.org",
        description: "CS:GO与CS2领域的权威赛事平台，拥有选手数据库。",
        monthlyVisits: 25000000,
        categories: ["esports", "news"],
        highlights: ["战队排名", "赛事日历", "数据中心"]
    },
    {
        rank: 56,
        name: "Liquipedia",
        domain: "liquipedia.net",
        description: "由Team Liquid维护的电竞百科，覆盖多款游戏。",
        monthlyVisits: 20000000,
        categories: ["esports", "community"],
        highlights: ["选手百科", "赛事档案", "开放编辑"]
    },
    {
        rank: 57,
        name: "The Esports Observer",
        domain: "esportsobserver.com",
        description: "电竞行业商业情报站，分析品牌与赞助趋势。",
        monthlyVisits: 3000000,
        categories: ["esports", "news"],
        highlights: ["商业案例", "市场洞察", "行业数据"]
    },
    {
        rank: 58,
        name: "Upcomer",
        domain: "upcomer.com",
        description: "提供电竞与直播文化新闻的多媒体网站。",
        monthlyVisits: 6000000,
        categories: ["esports", "news"],
        highlights: ["选手专题", "赛事盘点", "视频内容"]
    },
    {
        rank: 59,
        name: "Inven Global",
        domain: "invenglobal.com",
        description: "韩国Inven的全球站点，电竞与MMO资讯齐全。",
        monthlyVisits: 12000000,
        categories: ["esports", "community"],
        highlights: ["韩语直译", "电竞采访", "展会报道"]
    },
    {
        rank: 60,
        name: "AFK Gaming",
        domain: "afkgaming.com",
        description: "印度本土电竞媒体，关注移动电竞与亚洲赛事。",
        monthlyVisits: 5000000,
        categories: ["esports", "news"],
        highlights: ["亚洲战队", "移动电竞", "市场观察"]
    },
    {
        rank: 61,
        name: "CrazyGames",
        domain: "crazygames.com",
        description: "热门HTML5游戏平台，提供大量可嵌入的网页小游戏。",
        monthlyVisits: 41000000,
        categories: ["community", "indie"],
        highlights: ["HTML5 游戏库", "支持 iframe 嵌入", "开发者收益"]
    },
    {
        rank: 62,
        name: "Poki",
        domain: "poki.com",
        description: "国际化的H5游戏门户，精选可直接嵌入网站的休闲游戏。",
        monthlyVisits: 65000000,
        categories: ["community"],
        highlights: ["即点即玩", "iframe 集成", "跨端同步"]
    },
    {
        rank: 63,
        name: "Y8 Games",
        domain: "y8.com",
        description: "老牌Flash与HTML5游戏站，拥有庞大可嵌入资源。",
        monthlyVisits: 32000000,
        categories: ["community"],
        highlights: ["线上排行榜", "iframe 嵌入代码", "多人房间"]
    },
    {
        rank: 64,
        name: "Miniclip",
        domain: "miniclip.com",
        description: "知名网页游戏品牌，提供竞技类与休闲类热门作品。",
        monthlyVisits: 52000000,
        categories: ["community"],
        highlights: ["热门竞技", "多人对战", "跨平台账号"]
    },
    {
        rank: 65,
        name: "Coolmath Games",
        domain: "coolmathgames.com",
        description: "以益智数学游戏著称，支持在教学网站嵌入。",
        monthlyVisits: 47000000,
        categories: ["community"],
        highlights: ["益智脑洞", "课堂友好", "嵌入授权"]
    },
    {
        rank: 66,
        name: "Addicting Games",
        domain: "addictinggames.com",
        description: "拥有数千款网页游戏的老牌平台，持续更新新作。",
        monthlyVisits: 28000000,
        categories: ["community"],
        highlights: ["分类齐全", "iframe 分享", "周更新游"]
    },
    {
        rank: 67,
        name: "Armor Games",
        domain: "armorgames.com",
        description: "支持Flash与HTML5的独立游戏平台，拥有开发者计划。",
        monthlyVisits: 22000000,
        categories: ["community", "indie"],
        highlights: ["开发者计划", "嵌入授权", "排行榜"]
    },
    {
        rank: 68,
        name: "Kongregate",
        domain: "kongregate.com",
        description: "玩家与开发者社区，支持上传与嵌入网页游戏。",
        monthlyVisits: 25000000,
        categories: ["community", "indie"],
        highlights: ["成就系统", "嵌入小部件", "开发者分成"]
    },
    {
        rank: 69,
        name: "Newgrounds",
        domain: "newgrounds.com",
        description: "创意社区，涵盖动画、音乐与互动游戏，支持嵌入分享。",
        monthlyVisits: 30000000,
        categories: ["community", "indie"],
        highlights: ["创意作品", "评分系统", "开源素材"]
    },
    {
        rank: 70,
        name: "Lagged",
        domain: "lagged.com",
        description: "聚焦HTML5小游戏的平台，提供内嵌代码与开发者后台。",
        monthlyVisits: 15000000,
        categories: ["community"],
        highlights: ["嵌入代码", "每日更新", "成就系统"]
    },
    {
        rank: 71,
        name: "Friv",
        domain: "friv.com",
        description: "面向儿童与家庭的休闲网页游戏站，界面友好。",
        monthlyVisits: 20000000,
        categories: ["community"],
        highlights: ["家庭友好", "免注册体验", "iframe 接入"]
    },
    {
        rank: 72,
        name: "GamePix",
        domain: "gamepix.com",
        description: "专注跨平台HTML5游戏发行，提供嵌入式SDK与广告变现。",
        monthlyVisits: 18000000,
        categories: ["community", "indie"],
        highlights: ["跨平台SDK", "嵌入支持", "全球发行"]
    },
    {
        rank: 73,
        name: "Silvergames",
        domain: "silvergames.com",
        description: "收录动作、益智等多类型网页游戏，可一键嵌入。",
        monthlyVisits: 12000000,
        categories: ["community"],
        highlights: ["分类检索", "iframe 嵌入", "休闲精选"]
    },
    {
        rank: 74,
        name: "1001Games",
        domain: "1001games.com",
        description: "提供多语言的网页游戏合集，支持网站嵌入。",
        monthlyVisits: 8000000,
        categories: ["community"],
        highlights: ["多语言", "嵌入分享", "家庭向内容"]
    },
    {
        rank: 75,
        name: "GameMonetize",
        domain: "gamemonetize.com",
        description: "为站长提供可变现的HTML5游戏库，支持快速接入。",
        monthlyVisits: 9000000,
        categories: ["community", "indie"],
        highlights: ["站长后台", "嵌入脚本", "广告分成"]
    },
    {
        rank: 76,
        name: "A10",
        domain: "a10.com",
        description: "AGame旗下的网页游戏平台，涵盖动作、冒险与策略。",
        monthlyVisits: 14000000,
        categories: ["community"],
        highlights: ["热门合集", "iframe 接入", "家长控制"]
    },
    {
        rank: 77,
        name: "Agame",
        domain: "agame.com",
        description: "提供大量休闲网页游戏，支持iframe嵌入与排行榜。",
        monthlyVisits: 20000000,
        categories: ["community"],
        highlights: ["排行榜", "嵌入游戏", "家庭娱乐"]
    },
    {
        rank: 78,
        name: "BGames",
        domain: "bgames.com",
        description: "提供街机与动作类网页游戏，集成嵌入代码与评分。",
        monthlyVisits: 6000000,
        categories: ["community"],
        highlights: ["街机体验", "嵌入代码", "用户评分"]
    },
    {
        rank: 79,
        name: "Kizi",
        domain: "kizi.com",
        description: "家庭友好的网页游戏站，提供多类别免下载游戏。",
        monthlyVisits: 17000000,
        categories: ["community"],
        highlights: ["儿童向精选", "即开即玩", "嵌入授权"]
    },
    {
        rank: 80,
        name: "Yad",
        domain: "yad.com",
        description: "面向儿童教育的HTML5小游戏平台，支持嵌入教学网站。",
        monthlyVisits: 5000000,
        categories: ["community"],
        highlights: ["儿童教育", "嵌入代码", "中文支持"]
    },
    {
        rank: 81,
        name: "Snokido",
        domain: "snokido.com",
        description: "法国休闲游戏站，提供街机、平台跳跃等多种类型。",
        monthlyVisits: 4000000,
        categories: ["community"],
        highlights: ["法语支持", "嵌入分享", "街机合集"]
    },
    {
        rank: 82,
        name: "POG",
        domain: "pog.com",
        description: "Play Online Games平台，提供大量H5游戏资源。",
        monthlyVisits: 9000000,
        categories: ["community"],
        highlights: ["每日更新", "iframe 嵌入", "多人排行"]
    },
    {
        rank: 83,
        name: "Play123",
        domain: "play123.in",
        description: "提供益智、动作等多类型小游戏，带有嵌入选项。",
        monthlyVisits: 3000000,
        categories: ["community"],
        highlights: ["分类检索", "嵌入按钮", "家庭向内容"]
    },
    {
        rank: 84,
        name: "GamePost",
        domain: "gamepost.com",
        description: "经典网页游戏站，支持用户在博客嵌入游戏。",
        monthlyVisits: 3500000,
        categories: ["community"],
        highlights: ["嵌入分享", "用户评论", "经典收藏"]
    },
    {
        rank: 85,
        name: "HTMLGames",
        domain: "htmlgames.com",
        description: "专注HTML5益智与纸牌游戏，提供嵌入代码。",
        monthlyVisits: 2500000,
        categories: ["community"],
        highlights: ["纸牌合集", "嵌入脚本", "跨平台适配"]
    },
    {
        rank: 86,
        name: "Gameflare",
        domain: "gameflare.com",
        description: "来自捷克的网页游戏平台，拥有多人和单机类别。",
        monthlyVisits: 2800000,
        categories: ["community"],
        highlights: ["本地化分类", "嵌入选项", "每日推荐"]
    },
    {
        rank: 87,
        name: "ArcadeSpot",
        domain: "arcadespot.com",
        description: "提供经典街机与复古游戏模拟，支持在线直接游玩。",
        monthlyVisits: 8000000,
        categories: ["community"],
        highlights: ["复古模拟", "支持嵌入", "用户评分"]
    },
    {
        rank: 88,
        name: "Funbrain",
        domain: "funbrain.com",
        description: "教育类小游戏与互动内容，为学生提供安全环境。",
        monthlyVisits: 15000000,
        categories: ["community"],
        highlights: ["课堂资源", "嵌入许可", "家长指南"]
    },
    {
        rank: 89,
        name: "PrimaryGames",
        domain: "primarygames.com",
        description: "面向教师的教育小游戏平台，提供嵌入代码。",
        monthlyVisits: 6000000,
        categories: ["community"],
        highlights: ["教学支持", "嵌入选项", "按年级筛选"]
    },
    {
        rank: 90,
        name: "Cartoon Network Games",
        domain: "cartoonnetwork.com/games",
        description: "卡通频道官方网页游戏合集，包含热门IP小游戏。",
        monthlyVisits: 30000000,
        categories: ["community"],
        highlights: ["正版IP", "儿童向", "嵌入合作"]
    },
    {
        rank: 91,
        name: "IO Games Space",
        domain: "iogames.space",
        description: "整理热门.io类型的实时对战游戏，提供嵌入链接。",
        monthlyVisits: 7000000,
        categories: ["community"],
        highlights: ["实时对战", "iframe 支持", "排行榜"]
    },
    {
        rank: 92,
        name: "CoolGames",
        domain: "coolgames.com",
        description: "发行商CoolGames的H5门户，提供授权嵌入解决方案。",
        monthlyVisits: 5000000,
        categories: ["community"],
        highlights: ["授权发行", "嵌入SDK", "多语言支持"]
    },
    {
        rank: 93,
        name: "GameDistribution",
        domain: "gamedistribution.com",
        description: "为站长提供H5游戏联播与广告收益的发行平台。",
        monthlyVisits: 8000000,
        categories: ["community", "indie"],
        highlights: ["嵌入脚本", "广告管理", "开发者接入"]
    },
    {
        rank: 94,
        name: "PlayJolt",
        domain: "playjolt.com",
        description: "聚合休闲小游戏的网站，提供即时嵌入代码。",
        monthlyVisits: 4000000,
        categories: ["community"],
        highlights: ["即时加载", "嵌入分享", "家庭向内容"]
    },
    {
        rank: 95,
        name: "Simmer.io",
        domain: "simmer.io",
        description: "专注Unity WebGL作品展示的平台，支持嵌入展示。",
        monthlyVisits: 2000000,
        categories: ["community", "indie"],
        highlights: ["Unity 上传", "嵌入展示", "开发者评论"]
    },
    {
        rank: 96,
        name: "Construct Arcade",
        domain: "construct.net/en/arcade",
        description: "Construct引擎官方游戏平台，展示用户创作的HTML5作品。",
        monthlyVisits: 1500000,
        categories: ["community", "indie"],
        highlights: ["引擎示例", "嵌入导出", "开发者激励"]
    },
    {
        rank: 97,
        name: "GDevelop Arcade",
        domain: "gdevelop.io/games",
        description: "GDevelop引擎展示平台，支持 iframe 嵌入与源码分享。",
        monthlyVisits: 1200000,
        categories: ["community", "indie"],
        highlights: ["开源示例", "嵌入链接", "社区评分"]
    },
    {
        rank: 98,
        name: "Game Jolt",
        domain: "gamejolt.com",
        description: "独立游戏社区与发行平台，支持网页版试玩与嵌入。",
        monthlyVisits: 14000000,
        categories: ["community", "indie"],
        highlights: ["Web试玩", "粉丝社区", "开发者活动"]
    },
    {
        rank: 99,
        name: "Indie DB",
        domain: "indiedb.com",
        description: "收录独立游戏项目的资料库，提供下载与试玩信息。",
        monthlyVisits: 5000000,
        categories: ["news", "indie"],
        highlights: ["项目档案", "开发日志", "试玩链接"]
    },
    {
        rank: 100,
        name: "Nexus Mods",
        domain: "nexusmods.com",
        description: "全球最大的Mod分享站，提供社区讨论与插件管理工具。",
        monthlyVisits: 33000000,
        categories: ["community"],
        highlights: ["Mod 管理器", "社区支持", "热门排行榜"]
    }
];

const siteListElement = document.getElementById('siteList');
const siteSearchInput = document.getElementById('siteSearchInput');
const siteResultsCount = document.getElementById('siteResultsCount');
const filterButtons = document.querySelectorAll('.site-filters .filter-button');

let activeFilter = 'all';

function formatVisits(visits) {
    if (visits >= 100000000) {
        const formatted = (visits / 100000000).toFixed(1);
        return `${Number(formatted)} 亿次/月`;
    }
    if (visits >= 10000) {
        const formatted = (visits / 10000).toFixed(1);
        return `${Number(formatted)} 万次/月`;
    }
    return `${visits.toLocaleString()} 次/月`;
}

function renderSite(site) {
    const categoriesHtml = site.categories
        .map((category) => `<span class="site-chip">${siteCategories[category] || category}</span>`)
        .join('');

    const highlightsHtml = site.highlights
        .map((item) => `<li>${item}</li>`)
        .join('');

    return `
        <article class="site-card">
            <div class="site-rank" aria-hidden="true">#${site.rank}</div>
            <div class="site-content">
                <header class="site-header-row">
                    <div>
                        <h2 class="site-title">${site.name}</h2>
                        <a class="site-domain" href="https://${site.domain}" target="_blank" rel="noopener">${site.domain}</a>
                    </div>
                    <div class="site-visits" aria-label="月访问量">${formatVisits(site.monthlyVisits)}</div>
                </header>
                <p class="site-description">${site.description}</p>
                <div class="site-meta">
                    <div class="site-tags" aria-label="站点类别">${categoriesHtml}</div>
                    <ul class="site-highlights" aria-label="站点亮点">${highlightsHtml}</ul>
                </div>
            </div>
            <a class="site-visit-button" href="https://${site.domain}" target="_blank" rel="noopener" aria-label="访问 ${site.name}">访问站点</a>
        </article>
    `;
}

function applyFilters() {
    const query = siteSearchInput.value.trim().toLowerCase();

    const filtered = gameSites.filter((site) => {
        const matchesFilter = activeFilter === 'all' || site.categories.includes(activeFilter);
        const haystack = `${site.name} ${site.domain} ${site.description} ${site.highlights.join(' ')}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        return matchesFilter && matchesQuery;
    });

    siteListElement.innerHTML = filtered.map(renderSite).join('');

    if (filtered.length === 0) {
        siteResultsCount.textContent = '没有找到符合条件的站点。';
    } else {
        siteResultsCount.textContent = `共找到 ${filtered.length} 个站点。`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.filter === activeFilter) {
            return;
        }

        activeFilter = button.dataset.filter;
        filterButtons.forEach((btn) => {
            btn.classList.toggle('is-active', btn === button);
            btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
        });
        applyFilters();
    });
});

siteSearchInput.addEventListener('input', applyFilters);

applyFilters();
