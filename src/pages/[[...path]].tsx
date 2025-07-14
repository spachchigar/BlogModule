import { useEffect, JSX } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import NotFound from 'src/NotFound'
import Layout from 'src/Layout'
import {
    SitecoreContext,
    ComponentPropsContext,
    StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs'
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils'
import { SitecorePageProps } from 'lib/page-props'
import { sitecorePagePropsFactory } from 'lib/page-props-factory'
import { componentBuilder } from 'temp/componentBuilder'
import { sitemapFetcher } from 'lib/sitemap-fetcher'

const SitecorePage = ({
    notFound,
    componentProps,
    layoutData,
    headLinks,
}: SitecorePageProps): JSX.Element => {
    useEffect(() => {
        // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
        handleEditorFastRefresh()
    }, [])

    if (notFound || !layoutData.sitecore.route) {
        // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
        return <NotFound />
    }

    const isEditing = layoutData.sitecore.context.pageEditing

    return (
        <ComponentPropsContext value={componentProps}>
            <SitecoreContext
                componentFactory={componentBuilder.getComponentFactory({
                    isEditing,
                })}
                layoutData={layoutData}
            >
                <Layout layoutData={layoutData} headLinks={headLinks} />
            </SitecoreContext>
        </ComponentPropsContext>
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    let paths: StaticPath[] = []
    let fallback: boolean | 'blocking' = 'blocking'

    if (
        process.env.NODE_ENV !== 'development' &&
        process.env.DISABLE_SSG_FETCH?.toLowerCase() !== 'true'
    ) {
        try {
            // Note: Next.js runs export in production mode
            paths = await sitemapFetcher.fetch(context)
        } catch (error) {
            console.log('Error occurred while fetching static paths')
            console.log(error)
        }

        fallback = process.env.EXPORT_MODE ? false : fallback
    }

    return {
        paths,
        fallback,
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const props = await sitecorePagePropsFactory.create(context)

    return {
        props,

        revalidate: 5, // In seconds
        notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    }
}

export default SitecorePage
