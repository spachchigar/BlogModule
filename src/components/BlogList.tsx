import { JSX, useEffect, useState } from 'react'
import { BlogList as BlogListModel } from 'models/Feature.BlogModule.Model'
import { ComponentProps } from 'lib/component-props'
import BlogCard from './BlogCard'
import { container } from '../assets/tailwindcss'
import { FieldValue, Link, Image } from 'src/utils/blogListType'
import { graphQLClient } from 'src/utils/graphqlClient'
import { BLOGS_QUERY } from 'src/utils/graphqlQuery'
import { Item } from '@sitecore-jss/sitecore-jss-nextjs'
type BlogListProps = ComponentProps & BlogListModel.BlogList

export interface BlogItem {
    displayName: string
    description: FieldValue<string>
    bannerImage: Image
    title: FieldValue<string>
    content: FieldValue<string>
    publishDate: FieldValue<string>
    goToBlog: Link
    image: Image
    author: {
        jsonValue: Item
    }
    relatedBlog: {
        jsonValue: Item[]
    }
}

export interface QueryResponse {
    item: {
        children: {
            total: number
            pageInfo: {
                endCursor: string
                hasNext: boolean
            }
            results: BlogItem[]
        }
    }
}

export interface paginationDataState {
    hasNext: boolean
    hasPrev: boolean
    prevUrl?: string
    nextUrl?: string
}

export const Default = (props: BlogListProps): JSX.Element => {
    /** ➊ Allow null and start with it */

    const ITEMS_PER_PAGE = 3

    const [blogs, setBlogs] = useState<QueryResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [endCursors, setCursors] = useState<string[]>([''])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    // const [pageNumber, setPageNumber] = useState(1);
    const handleNext = async () => {
        setCurrentPage((prv) => prv + 1)
    }
    const handlePrev = async () => {
        setCurrentPage((prv) => prv - 1)
    }

    const fetchBlogs = async () => {
        try {
            const result = await graphQLClient.request<QueryResponse>(
                BLOGS_QUERY,
                {
                    first: ITEMS_PER_PAGE,
                    after: endCursors[currentPage - 1],
                }
            )
            const endCursor = result?.item?.children?.pageInfo?.endCursor
            setBlogs(result)
            setCursors((prv) => [...prv, endCursor])
            setTotalPage(
                Math.ceil(result?.item?.children?.total / ITEMS_PER_PAGE)
            )
        } catch (err) {
            console.error('GraphQL error', err)
            setBlogs(null)
            setCursors([''])
        } finally {
            setLoading(false)
        }
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
            <h1 className="mb-6 text-3xl font-bold">Latest Blog</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* ➍ Need an explicit return when using braces */}
                {blogs?.item.children.results.map((blog, index) => (
                    <BlogCard key={index} data={blog} />
                ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePrev()}
                        className="rounded-xl bg-gray-200 px-4 py-2 text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-300 hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    >
                        ← Prev
                    </button>
                )}

                {currentPage < totalPage && (
                    <button
                        onClick={() => handleNext()}
                        className="rounded-xl bg-gray-800 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:bg-gray-700 hover:shadow-md focus:ring-2 focus:ring-gray-600 focus:outline-none"
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    )
}
