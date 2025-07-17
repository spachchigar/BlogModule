import React, { JSX } from 'react'
import {
    Text,
    Image,
    ImageField,
    DateField,
} from '@sitecore-jss/sitecore-jss-nextjs'
import { BlogItem } from './BlogList'
import { formatDate } from './authorable/BlogTitle'
import Link from 'next/link'

const BlogCard = ({ data }: { data: BlogItem }): JSX.Element => {
    const blogLink = data?.goToBlog?.path || '#'
    const imageField = data.cardImage
        ? data.cardImage?.value
            ? data.cardImage
            : {
                  value: {
                      src: data?.cardImage?.src,
                      alt: data?.cardImage?.alt,
                  },
              }
        : null
    const publishDate = data.publishDate
    console.log(data)
    console.log(publishDate)
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <Link href={blogLink} className="block">
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
                    {imageField?.value?.src ? (
                        <Image
                            field={imageField as ImageField}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        // Placeholder for missing or broken images
                        <div className="p-4 text-center text-gray-400">
                            No Image Available
                        </div>
                    )}
                </div>
            </Link>
            <div className="flex flex-grow flex-col p-4">
                <header className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        <a href={blogLink}>
                            <Text field={data?.pageTitle} />
                        </a>
                    </h2>
                    {/* <div className="text-sm text-gray-500">
                        {data.author.jsonValue ? (
                            <Text
                                field={
                                    data.author.jsonValue.fields
                                        .fullName as TextField
                                }
                            />
                        ) : (
                            <Text field={data.author.fields?.fullName} />
                        )}
                        •
                        {new Date(
                            fixSitecoreDate(data?.publishDate?.value)
                        ).toDateString()}
                    </div> */}
                    <div className="text-sm text-gray-500">
                        {publishDate && (
                            <DateField
                                field={publishDate}
                                render={(date) => formatDate(date)}
                            />
                        )}
                    </div>
                </header>
                <p className="mb-4 flex-grow text-sm text-gray-700">
                    <Text field={data?.shortDescription} />
                </p>
                <a
                    href={blogLink}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    Read more →
                </a>
            </div>
        </div>
    )
}

export default BlogCard
