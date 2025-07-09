import { JSX } from 'react'
import { RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs'
import { PageContent } from 'models/Feature.JSS Experience Accelerator.Model'
import { ComponentProps } from 'lib/component-props'
import { container } from '../assets/tailwindcss'

export type RichTextProps = ComponentProps & PageContent.Text

export const Default = (props: RichTextProps): JSX.Element => {
    const text = props.fields ? (
        <JssRichText field={props.fields.Text} />
    ) : (
        <span className="is-empty-hint">Rich text</span>
    )
    const id = props.params.RenderingIdentifier

    return (
       <></>
    )
}
