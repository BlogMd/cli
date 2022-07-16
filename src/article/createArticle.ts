import fs from "fs/promises";
import inquirer from 'inquirer';
import { Manifest } from './Manifest.js';

export const createArticle = async () => {
	// マニフェストファイルを作成するために必要な情報を受け付ける
	const { headline, author, publisher } = await inquirer.prompt([
		// 記事のタイトル
		{
			type: "input",
			name: "headline",
			message: "Title of this article",
		},
		// 筆者の名前
		{
			type: "input",
			name: "author",
			message: "Author of this article",
		},
		// 発行者の名前
		{
			type: "input",
			name: "publisher",
			message: "Publisher of this blog",
		},
	]);
	// マニフェストファイルを準備
	const manifest = new Manifest();
	manifest.title = headline;
	manifest.author.name = author;
	manifest.publisher.name = publisher;
	// マニフェストファイルのプレビューを表示
	manifest.preview();
	// 新規記事を作成してよいか確認する
	const { confirmation } = await inquirer.prompt([
		{
			type: "confirm",
			name: "confirmation",
			message: "Are you sure you want to generate article?",
		},
	]);
	if (confirmation === false) {
		return;
	}
	// 新規記事のディレクトリを作成
	const dirNames = [
		`./articles/${headline}`,
		`./articles/${headline}/resources`,
	];
	for (let dirName of dirNames) {
		await fs.mkdir(dirName).catch((error) => {
			throw new Error(`Cannot create directory: ${dirName}`);
		});
	}
	// Markdownファイルを作成
	const markdown = [
		"# Header",
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"## SubHeader",
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	].join("\n");
	const articlePath = `./articles/${headline}/article.md`;
	await fs.writeFile(articlePath, markdown).catch((error) => {
		throw new Error(`Cannot create file: ${articlePath}`);
	});
	// マニフェストファイルを作成
	const jsonld = manifest.toJSON();
	const jsonldPath = `./articles/${headline}/meta.jsonld`;
	await fs.writeFile(jsonldPath, JSON.stringify(jsonld, null, "\t")).catch(error => {
		throw new Error(`Cannot create file: ${articlePath}`);
	});
};