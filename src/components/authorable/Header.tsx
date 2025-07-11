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
import { tv } from 'tailwind-variants'

const header = tv({
    slots: {
        wrapper: 'flex items-center justify-between py-3 text-white md:py-6',
        navigationMenu: 'hidden gap-x-3 md:flex',
        navigationItem: 'p-3 hover:bg-green-600',
    },
})
export type HeaderProps = ComponentProps & Components.Header.Header

export const Default = (props: HeaderProps): JSX.Element => {
    const { wrapper, navigationMenu, navigationItem } = header()
    const navItems = props.fields?.Navigation?.fields.menu as Item[]
    return (
        <div className={`${container()}`}>
            <div className={wrapper()}>
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
                <div className={navigationMenu()}>
                    {navItems?.map((item, ind) => {
                        return (
                            <Link
                                field={item.fields.link as LinkField}
                                key={ind}
                            >
                                <div className={navigationItem()}>
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
