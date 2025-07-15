import { JSX, useEffect, useState } from 'react'
import {
    ComponentParams,
    ComponentRendering,
    DateField,
    Image,
    ImageField,
    ImageFieldValue,
    RichText,
    Text,
    TextField,
} from '@sitecore-jss/sitecore-jss-nextjs'
import { graphQLClient } from 'src/utils/graphqlClient'
import { BLOG_DETAIL_QUERY } from 'src/utils/graphqlQuery'
import { BlogItem } from 'components/BlogList'
import { BlogCompponent } from 'models/Feature.BlogModule.Model'
import { container } from 'assets/tailwindcss'
import { format, parse } from 'date-fns'
import BlogCard from 'components/BlogCard'

interface BlogDetailProps {
    rendering: ComponentRendering & { params: ComponentParams }
    params: ComponentParams
}

interface DetailQueryResponse {
    item: BlogItem
}
export const Default = (props: BlogDetailProps): JSX.Element => {
    const [itemId, setItemId] = useState<string>('')
    const [blog, setBlog] = useState<DetailQueryResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash
            const id = hash.startsWith('#') ? hash.substring(1) : hash
            setItemId(id)
        }
    }, [])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const result = await graphQLClient.request<DetailQueryResponse>(
                    BLOG_DETAIL_QUERY,
                    {
                        itemId: itemId,
                    }
                )
                setBlog(result)
            } catch (err) {
                console.log('Graphql Error', err)
                setBlog(null)
            } finally {
                setLoading(false)
            }
        }
        if (itemId !== '') {
            fetchBlog()
        }
    }, [itemId])

    const formatDate = (date?: Date | null): string =>
        date ? format(date, 'MMMM dd, yyyy') : ''

    if (loading) {
        return <div>Loading</div>
    }

    if (!blog) {
        return <div>Error fetching the blog</div>
    }
    const imageField = blog.item.bannerImage
        ? {
              value: {
                  src: blog.item.bannerImage.src,
                  alt: blog.item.bannerImage.alt,
              },
          }
        : null

    const rawValue = blog.item.publishDate?.value ?? ''

    // Parse the Sitecore date string safely
    const parsedDate = parse(rawValue, "yyyyMMdd'T'HHmmssX", new Date())

    const formattedDateField = {
        value: parsedDate.toISOString(), // Now safe to use
    }
    return (
        <div className={`${container()}`}>
            <div className="py-6">
                <div className="my-6">
                    {imageField?.value?.src ? (
                        <Image field={imageField} className="w-full" />
                    ) : (
                        // Placeholder for missing or broken images
                        <div className="p-4 text-center text-gray-400">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className="my-6 text-center text-2xl font-bold md:text-4xl">
                    <Text field={blog.item.title} />
                </div>
                <div className="my-6 flex justify-center gap-x-5 text-center text-sm text-gray-500 md:text-lg">
                    <div>
                        Author:
                        <span className="font-bold text-black">
                            <Text
                                field={
                                    blog.item.author.jsonValue?.fields
                                        .fullName as TextField
                                }
                            />
                        </span>
                    </div>
                    <div>
                        Published On:
                        <span className="font-bold text-black">
                            {formattedDateField && (
                                <DateField
                                    field={formattedDateField}
                                    render={(date) => formatDate(date)}
                                />
                            )}
                        </span>
                    </div>
                </div>
                <div className="my-6">
                    <RichText field={blog.item.description} />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blog.item.relatedBlog?.jsonValue?.map((blogItem, key) => {
                        console.log(blogItem)
                        return <BlogCard key={key} data={blogItem.fields} />
                    })}
                </div>
            </div>
        </div>
    )
}
