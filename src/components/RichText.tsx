import { JSX } from 'react'
import { PageContent } from 'models/Feature.JSS Experience Accelerator.Model'
import { ComponentProps } from 'lib/component-props'
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs'

export type RichTextProps = ComponentProps & PageContent.Text

export const Default = (props: RichTextProps): JSX.Element => {
    return (
        <>
        </>
    )
}
