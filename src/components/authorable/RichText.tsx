import { JSX } from 'react'
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs'
import { PageContent } from 'models/Feature.BlogModule.Model'
import { ComponentProps } from 'lib/component-props'
import { container } from 'assets/tailwindcss'

type RichTextProps = ComponentProps & PageContent.RichText

export const Default = (props: RichTextProps): JSX.Element => {
    return (
        <div className={container()}>
            <div className="p-6">
                <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
                    <RichText field={props.fields?.text} />
                </div>
            </div>
        </div>
    )
}
