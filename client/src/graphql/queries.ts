import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      name
      maxPrice
      createdAt
      players {
        id
        name
      }
    }
  }
`;

export const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      idd
      name
      maxPlayers
      createdAt
      players {
        id
        name
        chips
        joinedAt
      }
    }
  }
`;
