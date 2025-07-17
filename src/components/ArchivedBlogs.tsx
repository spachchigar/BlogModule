import { JSX, useEffect, useState } from 'react'
import { Text } from '@sitecore-jss/sitecore-jss-nextjs'
import { ComponentProps } from 'lib/component-props'
import { BlogList } from 'models/Feature.BlogModule.Model'
import BlogCard from './BlogCard'
import { QueryOperators, SortResponse } from './BlogList'
import { container } from 'assets/tailwindcss'
import { graphQLClient } from 'src/utils/graphqlClient'
import { BLOG_LIST } from 'src/utils/graphqlQuery'
import Pagination from './Pagination'
type ArchivedBlogsProps = ComponentProps & BlogList.BlogList

export const Default = (props: ArchivedBlogsProps): JSX.Element => {
    const ITEMS_PER_PAGE = 3

    const [blogs, setBlogs] = useState<SortResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [endCursors, setCursors] = useState<string[]>([''])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    // const [currentSortOrder, setCurrentSortOrder] = useState<'ASC' | 'DESC'>(
    //     'DESC'
    // )

    const fetchBlogs = async () => {
        try {
            const result = await graphQLClient.request<SortResponse>(
                BLOG_LIST,
                {
                    first: ITEMS_PER_PAGE,
                    after: endCursors[currentPage - 1],
                    path: '{0D1B78BE-6A64-4160-8DA5-4E5DAB9F1FF5}',
                    templateId: '{AD4713B7-4A01-4642-ACFF-9A0AA72499DF}',
                    archiveQuery: QueryOperators.EQ,
                }
            )
            const endCursor = result?.search?.pageInfo?.endCursor
            setBlogs(result)
            setCursors((prv) => [...prv, endCursor])
            setTotalPage(Math.ceil(result?.search?.total / ITEMS_PER_PAGE))
        } catch (err) {
            console.error('GraphQL error', err)
            setBlogs(null)
            setCursors([''])
        } finally {
            setLoading(false)
        }
    }

    const handleNext = async () => {
        setCurrentPage((prv) => prv + 1)
    }
    const handlePrev = async () => {
        setCurrentPage((prv) => prv - 1)
    }

    useEffect(() => {
        fetchBlogs()
    }, [currentPage])

    if (loading) {
        return <div>Loading…</div>
    }

    if (!blogs) {
        return <div>No Blog Found.</div>
    }
    return (
        <div className={`${container()} my-5`}>
            <div className="component-content">
                <h1 className="mb-6 text-3xl font-bold">
                    <Text field={props?.fields?.title} />
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs?.search.results.map((blog, index) => (
                        <BlogCard key={index} data={blog} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPage={totalPage} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        </div>
    )
}
