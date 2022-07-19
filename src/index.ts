import BlogMd from '@blogmd/core';
import { Command } from "commander";
import { createArticle } from './article/createArticle.js';
import { createBlog } from './blog/createBlog.js';

const app = new Command();

app.name("@blogmd/cli").description("Command line tool for BlogMd");

app.command("create")
	.description("Create new")
	.argument("<subcommand>", "blog, article, manifest")
	.action(async (subcommand) => {
		switch (subcommand) {
			// Create new blog
			case "blog": {
				await createBlog()
				break;
			}
			// Create new article
			case "article": {
				await createArticle()
				break;
			}
			default: {
				console.log("例外");
			}
		}
	});

app.command("build")
	.description("Build blog")
	.action(() => {
		const blogmd = new BlogMd({});
		blogmd.build();
		blogmd.buildIndex();
	});

app.parse();

