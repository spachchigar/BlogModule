import { JSX, useEffect, useState } from 'react';
import { BlogList as BlogListModel } from 'models/Feature.BlogModule.Model';
import { ComponentProps } from 'lib/component-props';
import BlogCard from './BlogCard';
import { container } from '../assets/tailwindcss';
import { FieldValue, Link, Image } from 'src/utils/blogListType';
import { graphQLClient } from 'src/utils/graphqlClient';
import { BLOGS_QUERY } from 'src/utils/graphqlQuery';
import PaginationComponent from './PaginationUtil';
import { useSearchParams } from 'next/navigation';
type BlogListProps = ComponentProps & BlogListModel.BlogList;

export interface BlogItem {
  displayName: string;
  bannerImage: Image;
  title: FieldValue<string>;
  content: FieldValue<string>;
  publishDate: FieldValue<string>;
  isFeatured: FieldValue<string>;
  isArchived: FieldValue<string>;
  goToBlog: Link;
  image: Image;
  author: {
    value: string
  }
}

export interface QueryResponse {
  item: {
    children: {
      total: number;
      pageInfo: {
        endCursor: string;
        hasNext: boolean;
      };
      results: BlogItem[];
    };
  };
}

export interface paginationDataState {
  hasNext: boolean,
  hasPrev: boolean,
  prevUrl?: string,
  nextUrl?: string
}



export const Default = (props: BlogListProps): JSX.Element => {
  /** ➊ Allow null and start with it */

  const ITEMS_PER_PAGE = 3;

  const [blogs, setBlogs] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [endCursors, setCursors] = useState<string[]>([""]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
      const result = await graphQLClient.request<QueryResponse>(BLOGS_QUERY, {
        first: ITEMS_PER_PAGE,
        after: endCursors[currentPage - 1],
      });
      const endCursor = result?.item?.children?.pageInfo?.endCursor
      setBlogs(result);
      setCursors((prv) => [...prv, endCursor])
      setTotalPage(Math.ceil(result?.item?.children?.total/ITEMS_PER_PAGE))


    } catch (err) {
      console.error('GraphQL error', err);
      setBlogs(null);
      setCursors([""])
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBlogs();
    console.log(currentPage,"  ", totalPage)
  }, [currentPage]);



  if (loading) {
    return <div>Loading…</div>;
  }

  if (!blogs) {
    return (
      <div>No Blog Found.</div>
    )
  }

  return (
    <div className={container()}>
      <h1 className="text-3xl font-bold mb-6">Latest Blog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ➍ Need an explicit return when using braces */}
        {blogs?.item.children.results.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => handlePrev()}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            ← Prev
          </button>
        )}

      

        {currentPage < totalPage && (
          <button
            onClick={() => handleNext()}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Next →
          </button>
        )}
      </div>

    </div>
  );
};
