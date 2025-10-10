# hotspotgame 数据来源与维护指引

## 页面如何取得数据

`https://youxistudio.com/hotspotgame` 运行在打包于仓库 `gameone.zip` 的 Next.js 应用中。页面组件 `app/games/[game_name]/page.tsx` 会在客户端发起请求，调用同目录下的 API 路由 `/api/games/[game_name]` 获取一条游戏记录，然后渲染到详情页中。

API 路由的实现位于 `app/api/games/[game_name]/route.ts`，它通过 Prisma 客户端查询 `gm_games` 数据表（参见 `prisma/schema.prisma`），并把匹配 `game_name` 的记录与标签信息打包成 JSON 返回给前端。换句话说，页面显示的数据直接来源于 Postgres 数据库中的 `gm_games` 表，而不是仓库里的某个静态 JSON 文件。

## 数据是否安全？

- Prisma 在运行时会读取 `DATABASE_URL` 环境变量来连接 Postgres。该连接串只保存在部署环境或本地 `.env` 文件中，本仓库没有提交任何真实的数据库凭据。
- 外部访客只能通过公开的 `/api/games/<game_name>` 接口读取已经发布的数据，没有写入或删除权限。
- 只有持有数据库凭据（或部署平台的环境变量管理权限）的人才能修改底层数据。因此，只要妥善保管 `DATABASE_URL`，数据就是受保护的。

## 如何修改页面内容？

由于页面依赖数据库数据，没有提供「在线改文件」的静态页面。如果想更新 `hotspotgame`（或其他游戏详情页）的内容，需要直接修改数据库中的对应记录，可选方式包括：

1. **使用 Prisma Studio**：在解压 `gameone.zip` 并安装依赖后，运行 `npx prisma studio`，通过浏览器界面修改 `gm_games` 和 `gm_tags` 表中的字段。
2. **执行自定义脚本或 SQL**：同样在拥有数据库凭据的前提下，可以运行 Prisma Client 脚本（例如 `prisma gm_games.update({...})`），或使用任何支持 Postgres 的客户端执行 SQL 语句。

完成修改后，页面会在下一次请求 `/api/games/<game_name>` 时自动展示最新数据，无需额外的构建步骤。
