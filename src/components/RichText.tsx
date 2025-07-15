import { JSX } from 'react'
import { PageContent } from 'models/Feature.JSS Experience Accelerator.Model'
import { ComponentProps } from 'lib/component-props'

export type RichTextProps = ComponentProps & PageContent.Text

export const Default = (): JSX.Element => {
    return <></>
}
