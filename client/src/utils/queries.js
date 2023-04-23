import { gql } from '@apollo/client';
export const QUERY_USER = gql`
    query getMe {
        me {
        _id
        bookCount
        email
        username
        savedBooks {
            bookId
            authors
            discription
            image
            link
            title
        }
        }
    }
`;