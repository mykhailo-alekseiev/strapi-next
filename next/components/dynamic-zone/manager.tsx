import React from 'react';
import dynamic from 'next/dynamic';

interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
}

const componentMapping: { [key: string]: any } = {
  'dynamic-zone.related-articles': dynamic(() => import('./related-articles').then(mod => mod.RelatedArticles), { ssr: false })
}

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone }) => {
  return (
    <div>
      {
        dynamicZone.map((componentData) => {
          const Component = componentMapping[componentData.__component];
          if (!Component) {
            console.warn(`No component found for: ${componentData.__component}`);
            return null;
          }
          return <Component key={componentData.id} {...componentData} />;
        })}
    </div>
  );
};

export default DynamicZoneManager;
