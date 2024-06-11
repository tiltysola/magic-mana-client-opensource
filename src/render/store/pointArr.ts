import { atom } from 'recoil';

const pointArrState = atom<any>({
  key: 'pointArrState',
  default: [],
});

export default pointArrState;
