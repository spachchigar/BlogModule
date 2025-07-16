/**
 * This Layout is needed for Starter Kit.
 */
import { JSX } from 'react'
import Head from 'next/head'
import {
    LayoutServiceData,
    Field,
    HTMLLink,
    Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs'
import config from 'temp/config'
import Scripts from 'src/Scripts'

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl

interface LayoutProps {
    layoutData: LayoutServiceData
    headLinks: HTMLLink[]
}

interface RouteFields {
    [key: string]: unknown
    Title?: Field
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
    const { route } = layoutData.sitecore
    const fields = route?.fields as RouteFields
    const isPageEditing = layoutData.sitecore.context.pageEditing
    const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode'

    const renderContent = () => (
        <>
            <header>
                <div id="header" className="bg-black">
                    {route && (
                        <Placeholder name="headless-header" rendering={route} />
                    )}
                </div>
            </header>
            <main>
                <div id="content">
                    {route && (
                        <Placeholder name="headless-main" rendering={route} />
                    )}
                </div>
            </main>
            <footer>
                <div id="footer">
                    {route && (
                        <Placeholder name="headless-footer" rendering={route} />
                    )}
                </div>
            </footer>
        </>
    )

    return (
        <>
            <Scripts />
            <Head>
                <title>{fields?.Title?.value?.toString() || 'Page'}</title>
                <link rel="icon" href={`${publicUrl}/favicon.ico`} />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                ></link>
                {headLinks.map((headLink) => (
                    <link
                        rel={headLink.rel}
                        key={headLink.href}
                        href={headLink.href}
                    />
                ))}
            </Head>

            {/* root placeholder for the app, which we add components to using route data */}
            <div className={mainClassPageEditing}>{renderContent()}</div>
        </>
    )
}

export default Layout
