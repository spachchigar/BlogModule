import { JSX } from 'react';
import { ComponentParams, ComponentRendering, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props'
import { BlogList } from 'models/Feature.BlogModule.Model';
import BlogCard from './BlogCard';
import { BlogItem } from './BlogList';
import { container } from 'assets/tailwindcss';

type ArchivedBlogsProps = ComponentProps & BlogList.BlogList

// interface ArchivedBlogsProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
// }

export const Default = (props: ArchivedBlogsProps): JSX.Element => {

  return (
    <div className={`${container()} `} >
      <div className="component-content">
        <h1 className="text-3xl font-bold mb-6"><Text field={props?.fields?.title}/></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            props.fields?.blogs?.map(({ fields }) =>
              fields ? (<BlogCard data={fields as unknown as BlogItem} />) : null
            )
          }
        </div>

      </div>
    </div>
  );
};
