import { v4 as uuid } from 'uuid';

import { Player as PlayerIf} from '../../types'

export default class Player implements PlayerIf {
  _id: string;
  _username: string;
  _isHost: boolean;
  _isAlive: boolean;
  _score: number;
  _avatar: string;
  
  constructor(username: string = '') {
    this._id = uuid();
    this._username = username;
    this._isAlive = true;
    this._isHost = false;
    this._score = 0;
    this._avatar = '';
  }
  
  get id(): string {
    return this._id;
  }
  get username(): string {
    return this._username;
  }
  get score(): number {
    return this._score;
  }
  get isAlive(): boolean {
    return this._isAlive;
  }
  get avatar(): string {
    return this._avatar;
  }
  get isHost(): boolean {
    return this._isHost;
  }

  set username(newName: string) {
    this._username = newName;
  }
  set score(score: number) {
    this._score = score;
  }
  set isAlive(state: boolean) {
    this._isAlive = state; 
  }
  set isHost(state: boolean) {
    this._isHost = state;
  }
  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  kill(): void {
    this._isAlive = false;
  }
  revive(): void {
    this._isAlive = true;
  }
  promote(): void {
    this._isHost = true;
  }
  demote(): void {
    this._isHost = false;
  }
}