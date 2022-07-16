import chalk from "chalk";

export class Manifest {
	/** Url of top page */
	topPageUrl: string = "";
	/** Title of the article */
	title: string = "";
	/** Link of thumbnail */
	thumbnail: string = "";
	/** Author of the article */
	author: {
		name: string;
		url: string;
	} = { name: "", url: "" };
	/** Publisher of the blog */
	publisher: {
		name: string;
		logoUrl: string;
	} = { name: "", logoUrl: "" };
	/** Published date */
	datePublished: Date = new Date();
	/** Modified date */
	dateModified: Date = new Date();

	constructor() { }

	private highlight = (str: string): string => {
		if (str === "") {
			return chalk.redBright(`""`);
		} else {
			return chalk.green(`"${str}"`);
		}
	};
	private dateToString = (date: Date): string => {
		const yyyy = date.getFullYear().toString().padStart(4, "0");
		const mm = date.getMonth().toString().padStart(2, "0");
		const dd = date.getDate().toString().padStart(2, "0");
		return `${yyyy}-${mm}-${dd}`;
	};
	public preview = () => console.log(
		[
			`{`,
			`	"@context": "https://schema.org"`,
			`	"@type": "BlogPosting`,
			`	"mainEntityOfPage": {`,
			`		"@type": "WebPage",`,
			`		"@id": ${this.highlight(this.topPageUrl)},`,
			`	}`,
			`	"headline": ${this.highlight(this.title)},`,
			`	"image": ${this.highlight(this.thumbnail)},`,
			`	"author: {"`,
			`		"@type": "Person",`,
			`		"name": ${this.highlight(this.author.name)},`,
			`		"url": ${this.highlight(this.author.url)},`,
			`	},`,
			`	"publisher": {`,
			`		"@type": "Organization",`,
			`		"name": ${this.highlight(this.publisher.name)},`,
			`		"logo": {`,
			`			"@type": "ImageObject",`,
			`			"url": ${this.highlight(this.publisher.logoUrl)}`,
			`		}`,
			`	},`,
			`	"datePublished": ${this.highlight(
				this.dateToString(this.datePublished)
			)},`,
			`	"dateModified": ${this.highlight(this.dateToString(this.dateModified))}`,
			`}`,
		].join("\n")
	);
	public toJSON = () => {
		return {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": this.topPageUrl,
			},
			headline: this.title,
			image: this.thumbnail,
			author: {
				"@type": "Person",
				name: this.author.name,
				url: this.author.url,
			},
			publisher: {
				"@type": "Organization",
				name: this.publisher.name,
				logo: {
					"@type": "ImageObject",
					url: this.publisher.logoUrl,
				},
			},
			datePublished: this.dateToString(this.datePublished),
			dateModified: this.dateToString(this.dateModified),
		};
	};
}