import { JSX } from 'react'
import { ComponentProps } from 'lib/component-props'
import { Components } from 'models/Project.BlogModule.Model'
import { container } from 'assets/tailwindcss'
import {
    ImageField,
    Item,
    Link,
    LinkField,
    NextImage,
    Text,
    TextField,
} from '@sitecore-jss/sitecore-jss-nextjs'

export type HeaderProps = ComponentProps & Components.Header.Header

export const Default = (props: HeaderProps): JSX.Element => {
    const navItems = props.fields?.Navigation?.fields.menu as Item[]
    return (
        <div className={`${container()}`}>
            <div className="flex items-center justify-between py-3 text-white md:py-6">
                <div>
                    <NextImage
                        field={props.fields?.Logo?.value}
                        width={parseInt(
                            props.fields?.Logo?.value?.width as string
                        )}
                        height={parseInt(
                            props.fields?.Logo?.value?.height as string
                        )}
                        priority
                    />
                </div>
                <div className="hidden gap-x-3 md:flex">
                    {navItems?.map((item, ind) => {
                        return (
                            <Link
                                field={item.fields.link as LinkField}
                                key={ind}
                            >
                                <div className="p-3 hover:bg-green-600">
                                    <Text
                                        field={item.fields.title as TextField}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="flex cursor-pointer md:hidden">
                    <NextImage
                        field={
                            props.fields?.Navigation?.fields
                                .DrawerLogo as ImageField
                        }
                    />
                </div>
            </div>
        </div>
    )
}
