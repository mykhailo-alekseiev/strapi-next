import { type Metadata } from "next";
import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { Subheading } from "@/components/elements/subheading";
import { FeatureIconContainer } from "@/components/dynamic-zone/features/feature-icon-container";
import { IconClipboardText } from "@tabler/icons-react";
import { BlogPostRows } from "@/components/blog-post-rows";
import { AmbientColor } from "@/components/decorations/ambient-color";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";
import { SearchArticlesInput } from "@/app/blog/[slug]/_components/search";
import { Article } from "@/types/types";
import Pagination from "@/components/ui/pagination";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "blog-page",
    `populate=seo.metaImage`,
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const blogPage = await fetchContentType("blog-page", undefined, true);
  const articles = (await fetchContentType(
    "articles",
    `pagination[page]=${currentPage}&pagination[pageSize]=5&filters[title][$containsi]=${query}`
  )) as {
    data: Article[];
    meta: {
      pagination: {
        pageCount: number;
      };
    };
  };

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconClipboardText className="h-6 w-6 text-white" />
          </FeatureIconContainer>
          <Heading as="h1" className="mt-4">
            {blogPage?.heading}
          </Heading>
          <Subheading className="max-w-3xl mx-auto">
            {blogPage?.sub_heading}
          </Subheading>
        </div>

        <div className="w-full py-20">
          <div className="flex sm:flex-row flex-col justify-between gap-4 items-center mb-10">
            <p className="text-2xl font-bold text-white">
              Posts
            </p>
            <SearchArticlesInput />
          </div>
          <BlogPostRows articles={articles?.data ?? []} />
          <div className="py-4 flex justify-end">
            <Pagination totalPages={articles.meta.pagination.pageCount} />
          </div>
        </div>
      </Container>
    </div>
  );
}
