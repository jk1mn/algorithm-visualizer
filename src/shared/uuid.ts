// todo: remove lib
import { v4 as uuid } from 'uuid';

export type UUID = ReturnType<typeof uuid>;

export default function () {
  return uuid();
}
