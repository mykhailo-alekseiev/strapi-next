"use client";
import { truncate } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "next-view-transitions";
import React from "react";
import { Article } from "@/types/types";
import { IconBook } from "@tabler/icons-react";

export const BlogPostRows = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="divide-y divide-neutral-800">
      {articles.length === 0 ? (
        <p className="text-neutral-400 text-center p-4">No results found</p>
      ) : (
        articles.map((article, index) => (
          <BlogPostRow article={article} key={article.slug + index} />
        ))
      )}
    </div>
  );
};

export const BlogPostRow = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`blog/${article.slug}`}
      key={`${article.slug}`}
      className="flex md:flex-row flex-col items-start justify-between md:items-center group py-4"
    >
      <div>
        <p className="text-neutral-300 text-lg font-medium group-hover:text-white transition duration-200">
          {article.title}
        </p>
        <p className="text-neutral-300 text-sm mt-2 max-w-xl group-hover:text-white transition duration-200">
          {truncate(article.description, 80)}
        </p>

        <div className="flex gap-2 items-center my-4">
          <p className="text-neutral-300 text-sm  max-w-xl group-hover:text-white transition duration-200">
            {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
          </p>
          <div className="h-1 w-1 rounded-full bg-neutral-800" />
          {article.readTimeEstimate && (
            <>
              <div className="flex gap-1 items-center">
                <IconBook className="size-3.5"/>
                <p className="text-neutral-300 text-sm  max-w-xl group-hover:text-white transition duration-200">
                  {article.readTimeEstimate}
                </p>
              </div>

              <div className="h-1 w-1 rounded-full bg-neutral-800" />
            </>
          )}
          <div className="flex gap-4 flex-wrap ">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="text-xs font-bold text-muted px-2 py-1 rounded-full bg-neutral-800 capitalize"
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
