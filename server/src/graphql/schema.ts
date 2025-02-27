import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Room {
        id:ID!
        name:String!
        maxPlayers: Int!
        createdAt: String!
        players: [Players!]
    }

    type Player {
        id: ID!
        name: String!
        chips: Int!
        joinedAt: String!

    }

    type Query {
        #Room Queries
        rooms: [Room!]!
        room: (id: ID!): Room

        #Player Queries
        players: [Player!]!
        player(id: ID!): Player
        playersByRoom(roomId: ID!): [Player!]!

    }

    type Mutation {
        #Room Mutations
        createRoom(name:String!, maxPlayers: Int): Room!
        deleteRoom(id:ID!):Boolean

        #Player Mutations
        createPlayer(name: String!, roomId: ID!): Player!
        joinRoom(playerId: ID!,roomId:ID!): Player!
        leaveRoom(playerId:ID!): Player!
    }

`;
