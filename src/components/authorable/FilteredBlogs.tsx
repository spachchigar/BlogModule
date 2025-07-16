import { JSX } from 'react'
import { Text } from '@sitecore-jss/sitecore-jss-nextjs'
import { ComponentProps } from 'lib/component-props'
import { BlogList } from 'models/Feature.BlogModule.Model'

import { container } from 'assets/tailwindcss'
import BlogCard from 'components/BlogCard'
import { BlogItem } from 'components/BlogList'

type ArchivedBlogsProps = ComponentProps & BlogList.BlogList

export const Default = (props: ArchivedBlogsProps): JSX.Element => {
    return (
        <div className={`${container()} my-5`}>
            <div className="component-content">
                <h1 className="mb-6 text-3xl font-bold">
                    <Text field={props?.fields?.title} />
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {props.fields?.blogs?.map(({ fields }, key) =>
                        fields ? (
                            <BlogCard
                                data={fields as unknown as BlogItem}
                                key={key}
                            />
                        ) : null
                    )}
                </div>
            </div>
        </div>
    )
}
