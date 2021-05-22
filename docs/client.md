# React Client App

This defines how the front-end application desing decisions have been made.
What is written in this document is going to clarify

- What types are expected as a global data in the state-tree
- How to break up the application into smaller more managable components
- What the redux actions are, and their action types

## Type Definitions

Type definition:

    User:
        - userId
        - name
        - birth_date
        - gender
        - salary

## Request Action Definitions

List of action types.

- Get List of Users
- Get Single User
- Create User
- Update User
- Delete User

Which action require communication with API.

- Get User List
- Create User
- Delete User
- Update User

Action Creators, every action creator has three states. These states correspond
to Begin, Success and Error.

- Create User
- Update User
- Delete User
- Fetch All Users
- Fetch Single User

Action Sagas.

- Fetch All Users

## UI Components
