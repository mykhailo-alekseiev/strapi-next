import React from 'react'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

// Default Global SEO for pages without them
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const pageData = await fetchContentType(
        'global',
        `&populate=seo.metaImage`,
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    return metadata;
}

export default async function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pageData = await fetchContentType('global', undefined, true);
    return (
        <html>
            <ViewTransitions>
                    <body
                        className={cn(
                            inter.className,
                            "bg-charcoal antialiased h-full w-full"
                        )}
                    >
                        <Navbar data={pageData?.navbar} />
                        {children}
                    </body>
            </ViewTransitions>
        </html>
    );
}
