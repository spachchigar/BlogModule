import { gql } from 'graphql-request';

export const BLOGS_QUERY = gql`
 query($first:Int,$after:String) {
  item(path: "{3B5ED475-61FE-4CBB-953C-0A2DC12A3342}", language: "en") {
    children(first:$first,after:$after) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        displayName
        bannerImage:field(name:"bannerImage"){
          ... on ImageField{
              src
              alt
          }
        }
        title:field(name:"title"){
          ... on TextField{
            value
          }
        }
         content:field(name:"content"){
          ... on TextField{
            value
          }
        } 
         publishDate:field(name:"publishDate"){
            ... on DateField{
              value
            }
          }
        isFeatured:field(name:"isFeatured"){
          ... on CheckboxField{
            value
          }
        }
         isArchived:field(name:"isArchived"){
          ... on CheckboxField{
            value
          }
        }
         goToBlog:field(name:"goToBlog"){
          ... on LinkField{
            url
            anchor
            target
            text
          }
        }
        image:field(name:"cardImage"){
          ... on ImageField{
            alt
            description
            src
          }
        }
        }
      }
    }
  }

`;
