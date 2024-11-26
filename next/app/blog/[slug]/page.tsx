import { Metadata } from 'next';

import { BlogLayout } from "@/components/blog-layout";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { generateMetadataObject } from '@/lib/shared/metadata';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType("articles", `filters[slug]=${params?.slug}&populate=seo.metaImage`, true)

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export const revalidate = 60
 
export const dynamicParams = true 
 
export async function generateStaticParams() {
  const articles = await fetchContentType('articles')

  return articles.data.map((article: any) => ({
    slug: String(article.slug),
  }))
}


export default async function singleArticlePage({ params }: { params: { slug: string} }) {
  const article = await fetchContentType("articles", `filters[slug]=${params?.slug}`, true)

  if (!article) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogLayout article={article}>
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
