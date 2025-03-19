import { gql } from "@apollo/client";

export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!, $maxPlayers: Int) {
    createRoom(name: $name, maxPlayers: $maxPlayers) {
      id
      name
      maxPlayers
      createdAt
    }
  }
`;

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($name: String!, $roomId: ID!) {
    createPlayer(name: $name, roomId: $roomId) {
      id
      name
      chips
      joinedAt
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation JoinRoom($playerId: ID!, $roomId: ID!) {
    joinRoom(playerId: $playerId, roomId: $roomId) {
      id
      name
      room {
        id
        name
      }
    }
  }
`;
