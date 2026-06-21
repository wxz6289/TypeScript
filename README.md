# TypeScript 学习仓库

TypeScript 学习笔记与示例代码，按 [官方 Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) 整理，并包含《Effective TypeScript》第二版读书笔记。

## 文档

| 内容 | 入口 |
|------|------|
| 体系化笔记（00–09） | [`docs/README.md`](./docs/README.md) |
| 深度专题（supplements） | [`docs/supplements/`](./docs/supplements/) |
| Effective TypeScript 第二版 | [`docs/effective-typescript/README.md`](./docs/effective-typescript/README.md) |
| 安装、tsconfig、本地实践与速查 | [`docs/09-仓库实践与入门速查.md`](./docs/09-仓库实践与入门速查.md) |

## 示例代码

- [`base/`](./base/) — 基础类型、类、模块等示例（`pnpm run dev` / `pnpm start`）
- [`examples/getts/`](./examples/getts/) — 《TypeScript Quickly》书籍章节（git submodule）
- [`examples/block-chain/`](./examples/block-chain/) · [`examples/blockchain-p2p/`](./examples/blockchain-p2p/) — 书籍区块链配套（submodule）

## 快速开始

```bash
# 克隆含书籍示例 submodule
git clone --recurse-submodules <repo-url>

# 运行 base 示例
cd base && pnpm install && pnpm run dev
```

安装 TypeScript、初始化 `tsconfig`、编译命令与迁移步骤见 **[docs/09-仓库实践与入门速查.md](./docs/09-仓库实践与入门速查.md)**。
