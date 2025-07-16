import { JSX } from 'react'

import { PageContent } from 'models/Feature.BlogModule.Model'
import { ComponentProps } from 'lib/component-props'
import { DateField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs'
import { format } from 'date-fns'
import { container } from 'assets/tailwindcss'
type BlogTitleProps = ComponentProps & PageContent.BlogTitle

export const Default = (props: BlogTitleProps): JSX.Element => {
    const formatDate = (date?: Date | null): string =>
        date ? format(date, 'MMMM dd, yyyy') : ''
    return (
        <div
            className={`flex flex-col ${container()} my-5 bg-gray-500 text-white`}
        >
            <div className="p-6">
                <div className="text-start text-2xl font-bold md:text-4xl">
                    <Text field={props.fields?.title} />
                </div>
                <div className="flex justify-start gap-x-5 text-sm md:text-lg">
                    <div>
                        <span className="font-bold">
                            <Text
                                field={
                                    props.fields?.author?.fields
                                        .fullName as TextField
                                }
                            />
                        </span>
                    </div>
                    <div>
                        <span className="font-bold">
                            {props.fields?.publishDate && (
                                <DateField
                                    field={props.fields.publishDate}
                                    render={(date) => formatDate(date)}
                                />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
