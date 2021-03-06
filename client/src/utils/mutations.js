import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
                email
                createdAt
            }
        }
    }
`;

export const ADD_EVENT = gql`
    mutation addEvent($title: String!, $description: String, $startDate: String!, $endDate: String $category: String) {
        addEvent(title: $title, description: $description, startDate: $startDate, endDate: $endDate, category: $category) {
            title
            description
            startDate {
                day
                month
                year
            }
            endDate {
                day
                month
                year
            }
            category {
                _id
                categoryName
                color
            }
            user {
                _id
                name
            }
        }
    }
`;

export const EDIT_EVENT = gql`
    mutation editEvent($eventId: ID!, $title: String, $description: String, $category: String) {
        editEvent(eventId: $eventId, title: $title, description: $description, category: $category) {
            title
            description
            startDate {
                day
                month
                year
            }
            endDate {
                day
                month
                year
            }
            category {
                categoryName
            }
            user {
                _id
                name
            }
        }
    }
`;

export const ADD_CATEGORY = gql`
    mutation addCategory($categoryName: String!, $color: String!) {
        addCategory(categoryName: $categoryName, color: $color) {
            _id
            categoryName
            color
        }
    }
`;