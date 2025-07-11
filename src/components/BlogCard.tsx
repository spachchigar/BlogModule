

import React, { JSX } from 'react';
import { Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { BlogItem } from "./BlogList"; 

const BlogCard = ({ data }: { data: BlogItem }): JSX.Element => {
    const blogLink = data?.goToBlog?.url || '#';

    
    const imageField = data.image ? { value: { src: data.image.src, alt: data.image.alt } } : null;

    return (
        <article className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <a href={blogLink} className="block">
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                    {imageField?.value?.src ? (
                        <Image
                            field={imageField}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        // Placeholder for missing or broken images
                        <div className="text-gray-400 text-center p-4">
                            No Image Available
                        </div>
                    )}
                </div>
            </a>
            <div className="p-4 flex flex-col flex-grow">
                <header className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        <a href={blogLink}>
                            <Text field={data?.title} />
                        </a>
                    </h2>
                    <div className="text-sm text-gray-500">
                        {data?.author?.value || 'Unknown Author'} • {new Date(data?.publishDate?.value).toDateString()}
                    </div>
                </header>
                <p className="text-gray-700 text-sm flex-grow mb-4">
                    <Text field={data?.content} />
                </p>
                <a href={blogLink} className="text-blue-600 font-semibold text-sm hover:underline">
                    Read more →
                </a>
            </div>
        </article>
    );
};

export default BlogCard;