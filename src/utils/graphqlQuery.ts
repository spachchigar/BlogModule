import { gql } from 'graphql-request'

export const BLOGS_QUERY = gql`
    query ($first: Int, $after: String) {
        item(path: "{3B5ED475-61FE-4CBB-953C-0A2DC12A3342}", language: "en") {
            children(first: $first, after: $after) {
                total
                pageInfo {
                    endCursor
                    hasNext
                }
                results {
                    displayName
                    bannerImage: field(name: "bannerImage") {
                        ... on ImageField {
                            src
                            alt
                        }
                    }
                    title: field(name: "title") {
                        ... on TextField {
                            value
                        }
                    }
                    content: field(name: "content") {
                        ... on TextField {
                            value
                        }
                    }
                    publishDate: field(name: "publishDate") {
                        ... on DateField {
                            value
                        }
                    }
                    goToBlog: field(name: "goToBlog") {
                        ... on LinkField {
                            url
                            anchor
                            target
                            text
                        }
                    }
                    image: field(name: "cardImage") {
                        ... on ImageField {
                            alt
                            description
                            src
                        }
                    }
                }
            }
        }
    }
`

export const BLOG_DETAIL_QUERY = gql`
    query ($itemId: String) {
        item(path: $itemId, language: "en") {
            description: field(name: "description") {
                ... on RichTextField {
                    value
                }
            }
            bannerImage: field(name: "bannerImage") {
                ... on ImageField {
                    src
                    alt
                }
            }
            title: field(name: "title") {
                ... on TextField {
                    value
                }
            }
            content: field(name: "content") {
                ... on TextField {
                    value
                }
            }
            publishDate: field(name: "publishDate") {
                ... on DateField {
                    value
                }
            }
            goToBlog: field(name: "goToBlog") {
                ... on LinkField {
                    url
                    anchor
                    target
                    text
                }
            }
            author: field(name: "author") {
                ... on ItemField {
                    jsonValue
                }
            }
            relatedBlog: field(name: "relatedBlog") {
                ... on MultilistField {
                    jsonValue
                }
            }
            image: field(name: "cardImage") {
                ... on ImageField {
                    alt
                    description
                    src
                }
            }
        }
    }
`
