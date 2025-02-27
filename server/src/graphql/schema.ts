import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Room {
        id:ID!
        name:String!
        maxPlayers: Int!
        createdAt: String!
        players: [Player!]
    }

    type Player {
        id: ID!
        name: String!
        chips: Int!
        room: Room
        joinedAt: String!

    }

    type Query {
        rooms: [Room!]!
        room(id: ID!): Room 
        players: [Player!]!
        player(id: ID!): Player
        playersByRoom(roomId: ID!): [Player!]!

    }

    type Mutation {
        createRoom(name: String!, maxPlayers: Int): Room!
        deleteRoom(id: ID!): Boolean!
        createPlayer(name: String!, roomId: ID!): Player!
        joinRoom(playerId: ID!,roomId: ID!): Player!
        leaveRoom(playerId:ID!): Player!
    }

`;
