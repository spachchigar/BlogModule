import { JSX } from 'react'
import {
    Field,
    Image,
    ImageField,
    Text,
} from '@sitecore-jss/sitecore-jss-nextjs'
import { ComponentProps } from 'lib/component-props'
import { container, heading, subHeading } from '../assets/tailwindcss'
// interface HeroBannerProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
//   fields: {
//     heading: Field<string>;
//     content: Field<string>;
//   };
// }
type HeroBannerProps = ComponentProps & {
    fields: {
        title: Field<string>
        description: Field<string>
        image: ImageField
    }
    params: {
        backgroundColor: Field<string>
        tectColor: Field<string>
    }
}

export const Default = ({ fields, params }: HeroBannerProps): JSX.Element => {
    console.log('prams', params.backgroundColor)
    return (
        <div className={`${container()} ${params.backgroundColor} `}>
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-[20px] p-5 md:flex-row">
                <div
                    className={`${params.textColor} flex flex-col items-center gap-3 md:items-start`}
                >
                    <h1 className={`${heading()}`}>
                        <Text field={fields?.title} />
                    </h1>
                    {fields?.description && (
                        <p className={`${subHeading()} text-center`}>
                            <Text field={fields?.description} />
                        </p>
                    )}
                </div>
                <div className="">
                    <Image
                        field={fields?.image}
                        editable={false}
                        imageParams={{ mw: 500, mh: 50 }}
                        height="100"
                        width="500"
                        data-sample="other-attributes-pass-through"
                    />
                </div>
            </div>
        </div>
    )
}
