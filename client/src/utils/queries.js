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