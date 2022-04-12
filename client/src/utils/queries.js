import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
    {
        users {
        _id
        name
        email
        events {
            _id
            title
            description
            category {
                categoryName
            }
        }
        categories {
            _id
            categoryName
            color
        }
        createdAt
    }
}
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            name
            email
            createdAt
        }
    }
`;

export const QUERY_ME_LONG = gql`
    {
        me {
            _id
            name
            email
            createdAt
            events {
                _id
                title
                description
                startDate
                endDate
                category {
                    categoryName
                }
            }
            categories {
                _id
                categoryName
                color
            }
        }
    }
`;