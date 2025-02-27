import Room from "../models/Room";
import Player from "../models/Player";
import mongoose from "mongoose";

export const resolvers = {
  Query: {
    //Get all rooms
    rooms: async () => {
      return await Room.find().sort({ createdAt: -1 });
    },
    //Get a single room by ID
    room: async (_: any, { id }: { id: string }) => {
      return await Room.findById(id);
    },
    //Get all players
    players: async () => {
      return await Player.find();
    },
    //Get a single player by ID
    player: async (_: any, { id }: { id: string }) => {
      return await Player.findById(id);
    },
    //Get all players by room ID
    playersByRoom: async (_: any, { roomId }: { roomId: string }) => {
      return await Player.find({ room: roomId });
    },
  },

  Mutation: {
    // Mutations for Rooms
    //Create a new room
    createRoom: async (
      _: any,
      { name, maxPlayers = 8 }: { name: string; maxPlayers: number }
    ) => {
      const newRoom = new Room({
        name,
        maxPlayers,
      });
      return await newRoom.save();
    },
    //Delete a room by ID
    deleteRoom: async (_: any, { id }: { id: string }) => {
      const result = await Room.findByIdAndDelete(id);

      if (result) {
        await Player.deleteMany({ room: id });
        return true;
      }
      return false;
    },
    // Mutations for Players
    createPlayer: async (
      _: any,
      { name, roomId }: { name: string; roomId: string }
    ) => {
      // Check if the room exists
      const room = await Room.findById(roomId);
      if (!room) {
        throw new Error("Room not found");
      }

      // Check if the room is full
      const playerCount = await Player.countDocuments({ room: roomId });
      if (playerCount >= room.maxPlayers) throw new Error("Room is full");

      // Create a new player
      const newPlayer = new Player({
        name,
        room: roomId,
      });

      const savePlayer = await newPlayer.save();

      // Update the room to include the new player
      await Room.findByIdAndUpdate(roomId, {
        $push: { players: savePlayer._id },
      });
      return savePlayer;
    },
    joinRoom: async (
      _: any,
      { playerId, roomId }: { playerId: string; roomId: string }
    ) => {
      // Check if the room exists
      const room = await Room.findById(roomId);
      if (!room) throw new Error("Room not found");

      // Check if the room is full
      const playersCount = await Player.countDocuments({ room: roomId });
      if (playersCount >= room.maxPlayers) throw new Error("Room is full");

      // Check if the player exists
      const updatedPlayer = await Player.findByIdAndUpdate(
        playerId,
        { room: roomId },
        { new: true }
      );

      // Check if the player was updated successfully
      if (!updatedPlayer) throw new Error("Player not found");

      // Update the room to include the new player
      await Room.findByIdAndUpdate(roomId, {
        $addRoSet: { players: playerId },
      });

      return updatedPlayer;
    },
    leaveRoom: async (_: any, { playerId }: { playerId: string }) => {
      // Check if the player exists
      const player = await Player.findById(playerId);
      if (!player) throw new Error("Player not found or already left the room");

      const roomId = player.room;

      // Remove the player from the room
      await Room.findByIdAndUpdate(roomId, { $pull: { players: playerId } });

      // Update the player to remove the room
      const updatePlayer = await Player.findByIdAndUpdate(
        playerId,
        { $unset: { room: "" } },
        { new: true }
      );
      return updatePlayer;
    },
  },

  // Resolvers for Rooms
  Room: {
    players: async (parent: any) => {
      return await Player.find({ room: parent.id });
    },
  },
  // Resolvers for Players
  Player: {
    room: async (parent: any) => {
      if (!parent.room) return null;
      return await Room.findById(parent.room);
    },
  },
};
