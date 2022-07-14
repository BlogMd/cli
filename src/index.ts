import { Command } from 'commander';
import { createArticle } from './createArticle';

const app = new Command();

app.name("@blogmd/cli")
	.description("Command line tool for BlogMd")

// サブコマンド `article`
app.command("article")
	.description("新しい記事を作成します")
	.argument("<title>", "新しい記事のタイトル")
	.action(argument => {
		createArticle(argument);
	});

app.parse();