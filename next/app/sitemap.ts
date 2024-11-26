import fetchContentType from "@/lib/strapi/fetchContentType";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ['/blog'].map((route) => ({
    url: `${process.env.WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const articlesPromise = fetchContentType('articles').then((articles) =>
    articles?.data.map((article: any) => ({
        url: `${process.env.WEBSITE_URL}/blog/${article.slug}`,
        lastModified: article.publishedAt,
      }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([articlesPromise])).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [
    ...routesMap,
    ...fetchedRoutes,
  ]
}
