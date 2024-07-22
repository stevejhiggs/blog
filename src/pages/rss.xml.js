import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";
import rss from "@astrojs/rss";

export async function get(context) {
	const posts = await getCollection("blog");
	return rss({
		title: siteConfig.name,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
