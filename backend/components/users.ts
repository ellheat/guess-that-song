import { CharacterType } from './characters';

interface UserType extends CharacterType {
  id: string;
}

const USER_LIST: UserType[] = [];

export const addUser = (character: CharacterType, id: string) => {
  const user = <UserType>Object.assign(character, { id })
  user.id = id;
  USER_LIST.push(user);
};

export const removeUser = (id: string) => new Promise((resolve) => {
  const removedUser = <UserType>USER_LIST.find(user => user.id === id);
  USER_LIST.splice(USER_LIST.indexOf(removedUser), 1);
  resolve(removedUser.name);
});

export const getUserList = () => USER_LIST;
