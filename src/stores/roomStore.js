import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';
class RoomStore {
  rooms = [];

  constructor() {
    makeObservable(this, {
      rooms: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
      createMsg: action,
      fetchRooms: action,
    });
  }

  createRoom = async (room) => {
    try {
      const res = await axios.post(
        'https://coded-task-authentication-be.herokuapp.com/rooms',
        room
      );
      this.rooms.push(res.data);
    } catch (error) {
      console.log('RoomStore -> createRoom -> error', error);
    }
  };

  createMsg = async (roomId, msg) => {
    try {
      const res = await axios.post(
        `https://coded-task-authentication-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      const room = this.rooms.find((_room) => _room.id === +roomId);
      room.messages.push(res.data);
    } catch (error) {
      console.log('RoomStore -> createRoom -> error', error);
    }
  };

  updateRoom = async (updatedRoom) => {
    try {
      await axios.put(
        `https://coded-task-authentication-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      const room = this.rooms.find((room) => room.id === updatedRoom.id);
      room.title = updatedRoom.title;
      room.description = updatedRoom.description;
      room.image = updatedRoom.image;
    } catch (error) {
      console.log('RoomStore -> updateRoom -> error', error);
    }
  };

  fetchRooms = async () => {
    try {
      const response = await axios.get(
        'https://coded-task-authentication-be.herokuapp.com/rooms'
      );
      this.rooms = response.data;
    } catch (error) {
      console.error('RoomStore -> fetchRooms -> error', error);
    }
  };

  deleteRoom = async (roomId) => {
    try {
      await axios.delete(
        `https://coded-task-authentication-be.herokuapp.com/rooms/${roomId}`
      );
      this.rooms = this.rooms.filter((room) => room.id !== roomId);
    } catch (error) {
      console.log('RoomStore -> deleteRoom -> error', error);
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;
