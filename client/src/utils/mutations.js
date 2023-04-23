import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookData!) {
        saveBook(input: $input) {
        username
        savedBooks {
            authors
            bookId
            discription
            image
            link
            title
        }
        _id
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation Mutation($bookId: ID!) {
        deleteBook(bookId: $bookId) {
        _id
        username
        bookCount
        savedBooks {
            authors
            bookId
            discription
            image
            link
            title
        }
        }
    }  
`;