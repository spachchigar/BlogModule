import { JSX } from 'react'
import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs'
import { ComponentProps } from 'lib/component-props'
import { container, heading, subHeading } from '../assets/tailwindcss'
import { HeroBanner as HeroBannerModel } from 'models/Feature.BlogModule.Model'
import clsx from 'clsx'
type HeroBannerProps = ComponentProps & HeroBannerModel.HeroBanner
type BannerProps = HeroBannerProps & {
    variant: string
}
const Content = ({ variant, params, fields }: BannerProps): JSX.Element => {
    console.log('Variant', variant)
    return (
        // <div className={`w-full ${(variant === 'Default' || variant === 'LeftImage') ? 'md:w-1/2' : ''} h-full min-h-[300px] flex items-center justify-center px-4 py-6 rounded-t-2xl md:rounded-t-none  md:rounded-l-2xl  ${params.backgroundColor}`
        // }>
        <div
            className={clsx(
                'flex h-full min-h-[300px] w-full items-center justify-center rounded-t-2xl px-4 py-6 md:rounded-t-none md:rounded-l-2xl',
                params.backgroundColor,
                {
                    'md:w-1/2':
                        variant === 'Default' || variant === 'LeftImage',
                }
            )}
        >
            <div
                className={`${params.textColor} flex flex-col items-center gap-2 ${clsx({ 'md:items-start': variant === 'Default' || variant === 'LeftImage' })}`}
            >
                <h1
                    className={`${heading()} text-center ${clsx({ 'md:text-start': variant === 'Default' || variant === 'LeftImage' })}`}
                >
                    <Text field={fields?.title} />
                </h1>
                {fields?.description && (
                    <p className={`${subHeading()} text-center md:text-left`}>
                        <Text field={fields?.description} />
                    </p>
                )}
            </div>
        </div>
    )
}
const ImageComponent = ({ fields }: BannerProps): JSX.Element => {
    return (
        <div className="flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden md:w-1/2">
            <Image
                field={fields?.image}
                editable={false}
                imageParams={{ mw: 800, mh: 300 }}
                className="h-full min-h-[300px] w-full object-cover object-center"
            />
        </div>
    )
}
const Banner = (props: BannerProps): JSX.Element => {
    const variant = props?.variant
    return (
        <div className="flex h-[300px] w-full flex-col md:flex-row">
            {variant === 'Default' || variant === 'LeftImage' ? (
                variant === 'Default' ? (
                    <>
                        <Content {...props} />
                        <ImageComponent {...props} />
                    </>
                ) : (
                    <>
                        <ImageComponent {...props} />
                        <Content {...props} />
                    </>
                )
            ) : (
                <Content {...props} />
            )}
        </div>
    )
}

export const Default = (props: HeroBannerProps): JSX.Element => {
    return (
        <div className={`mt-5 w-full`}>
            <div className={`${container()}`}>
                {/* Main wrapper with fixed height to ensure both sides match */}
                <div className="flex items-center justify-center">
                    <Banner {...props} variant="Default" />
                </div>
            </div>
        </div>
    )
}

export const LeftImage = (props: HeroBannerProps): JSX.Element => {
    return (
        <div className={`mt-5 w-full`}>
            <div className={`${container()}`}>
                {/* Main wrapper with fixed height to ensure both sides match */}
                <div className="flex items-center justify-center">
                    <Banner {...props} variant="LeftImage" />
                </div>
            </div>
        </div>
    )
}

export const WithoutImage = (props: HeroBannerProps): JSX.Element => {
    return (
        <div className={`mt-5 w-full`}>
            <div className={`${container()}`}>
                {/* Main wrapper with fixed height to ensure both sides match */}
                <div className="flex items-center justify-center">
                    <Banner {...props} variant="WithoutImage" />
                </div>
            </div>
        </div>
    )
}
