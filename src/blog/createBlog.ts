import childProcess from 'child_process';
import fs from "fs/promises";
import inquirer from 'inquirer';
import { chdir } from 'process';
import util from "util";

const exec = util.promisify(childProcess.exec);

export const createBlog = async () => {
	const { blogTitle } = await inquirer.prompt([
		{
			type: "input",
			name: "blogTitle",
			message: "Blog title"
		}
	]);
	// ディレクトリを作成
	await fs.mkdir(`${blogTitle}/articles`, { recursive: true });
	// package.jsonを作成
	const packageJson = {
		name: blogTitle,
		version: "0.0.1",
		private: true,
		scripts: {
			build: "npx @blogmd/cli build"
		}
	}
	await fs.writeFile(`${blogTitle}/package.json`, JSON.stringify(packageJson, null, "\t"));
	// 作業ディレクトリを変更
	chdir(blogTitle);
	// @blogmd/coreをインストール
	await exec(`npm install -D @blogmd/core`).then(() => {
		console.info("@blogmd/core was successfully installed!");
	});
	// @blogmd/cliをインストールするか尋ねる
	const { bundleBlogmdCli } = await inquirer.prompt([
		{
			type: "confirm",
			name: "bundleBlogmdCli",
			message: "(Recommended) Bundle @blogmd/cli"
		}
	]);
	// @blogmd/cliをインストールする
	if (bundleBlogmdCli) {
		await exec(`npm install -D @blogmd/cli`).then(() => {
			console.info("@blogmd/cli was successfully installed!");
		});
	}
}