import { JSX } from 'react'
import {
    Field,
    RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs'
import { PageContent } from 'models/Feature.JSS Experience Accelerator.Model'
import { ComponentProps } from 'lib/component-props'

export type RichTextProps = ComponentProps & PageContent.Text

export const Default = (props: RichTextProps): JSX.Element => {
    const text = props.fields ? (
        <JssRichText field={props.fields.Text} />
    ) : (
        <span className="is-empty-hint">Rich text</span>
    )
    const id = props.params.RenderingIdentifier

    return (
        <div
            className={`component rich-text ${props?.params?.styles.trimEnd()} `}
            id={id ? id : undefined}
        >
            <div className="component-content">{text}</div>
        </div>
    )
}
