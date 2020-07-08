export const randInt = (start: number = 1, end: number) => {
  return Math.floor((Math.random() * end) + start);
}
export const shuffle = (arr: Array<any>) => {
  let j, x ,i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i+1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
export const generateWord = (
  playerSlot: number, 
  undercoverSlot: number, 
  mrwhiteSlot: number, 
  player: number,
  wordPair: string[]
  ) => {
    wordPair = shuffle(wordPair);
    const undercover = Math.max(Math.ceil(playerSlot/player*undercoverSlot)-1, 1);
    const mrwhite = Math.max(Math.ceil(playerSlot/player*mrwhiteSlot)-1,0);
    const words: string[] = [];

    for (let i = 0; i < undercover; i++) {
      words.push(wordPair[0]);
    }
    for (let i = 0; i < mrwhite; i++) {
      words.push('');
    }
    for (let i = 0; i < playerSlot - undercover - mrwhite; i++) {
      words.push(wordPair[1]);
    }

    return {
      undercover: undercover,
      mrwhite: mrwhite,
      words: shuffle(words)
    };
}