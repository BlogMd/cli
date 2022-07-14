import * as fs from "fs/promises";

export const createArticle = async (title: string) => {
	// ディレクトリを作成
	const dirNames = [
		`./articles/${title}`,
		`./articles/${title}/resources`
	];
	for (let dirName of dirNames) {
		await fs.mkdir(dirName).catch(error => {
			throw new Error(`Cannot create directory: ${dirName}`);
		});
	}
	// Markdownファイルを作成
	const markdown = [
		"# Header",
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"## SubHeader",
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	].join("\n");
	const articlePath = `./articles/${title}/article.md`;
	await fs.writeFile(articlePath, markdown).catch(error => {
		throw new Error(`Cannot create file: ${articlePath}`);
	});
	// マニフェストファイルを作成
	const jsonld = {
		"@context": "https://schema.org",
		"@type": "BlogPosting"
	}
	const jsonldPath = `./articles/${title}/meta.jsonld`;
	await fs.writeFile(jsonldPath, JSON.stringify(jsonld, null, "\t")).catch(error => {
		throw new Error(`Cannot create file: ${articlePath}`);
	});
}
export type BlogPostMetadata = {
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": string // ブログのURL
	},
	"headline": string, // 記事のタイトル
	"image": string, // 記事のトップ画像へのリンク
	"author": {
		"@type": "Person",
		"name": string, // 筆者の名前
		"url": string // 筆者のプロフィールページへのリンク
	},
	"publisher": {
		"@type": "Organization",
		"name": string, // 発行者の名前
		"logo": {
			"@type": "ImageObject",
			"url": string // ロゴのURL
		}
	},
	"datePublished": string, // 記事の作成日
	"dateModified": string // 記事の更新日
}