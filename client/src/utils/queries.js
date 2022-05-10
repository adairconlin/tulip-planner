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
            categories {
                _id
                categoryName
                color
            }
        }
    }
`;

export const QUERY_MY_EVENTS = gql`
    query myEvents {
        myEvents {
            _id
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
                color
            }
            createdAt
            user {
                _id
                name
            }
        }
    }
`;

export const QUERY_EVENT = gql`
    query event($_id: ID!) {
        event(_id: $_id) {
            _id
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
                color
            }
        }
    }
`;

export const QUERY_MY_DATES = gql`
    query myDates {
        myDates {
            _id
            day
            month
            year
            events {
                _id
                title
            }
        }
    }
`;

export const QUERY_TODAY = gql`
    query todaysDate($day: String!, $month: String!, $year: String!) {
        todaysDate(day: $day, month: $month, year: $year) {
            _id
            day
            month
            year
            events {
                _id
                title
                category {
                    categoryName
                    color
                }
            }
        }
    }
`;

export const QUERY_MY_CATEGORIES = gql`
    query myCategories {
        myCategories {
            _id
            categoryName
            color
        }
    }
`;