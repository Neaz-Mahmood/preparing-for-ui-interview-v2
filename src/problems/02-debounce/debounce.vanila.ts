// bun test src/problems/02-debounce/test/debounce.test.ts

export function debounce<T extends (arg: any[]) => any> (func:T, delay: number): (args: Parameters<T>) => void  {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args )  {
    if(timerId){
      clearTimeout(timerId);
    }
    timerId = setTimeout(():void => {
      func.apply(this, args);
      timerId = null;
    }, delay)
  }
}

// --- Examples ---
// Uncomment to test your implementation:

const log = debounce((msg: string) => console.log(msg), 300)
log('a')  // cancelled by next call
log('b')  // cancelled by next call
log('c')  // only this one fires after 300ms → "c"
