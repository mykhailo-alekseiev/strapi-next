"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const SearchArticlesInput = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((articleName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (articleName) {
      params.set("query", articleName);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="text"
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search articles"
      className="text-sm min-w-full sm:min-w-96  p-2 rounded-md bg-neutral-800 border-none  focus:ring-0 focus:outline-none outline-none text-neutral-200 placeholder-neutral-400"
    />
  );
};
