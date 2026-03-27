// bun test src/problems/05-throttle/test/throttle.test.ts

export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) :  (...args: Parameters<T>) => void{
    let last: number = 0;
    return function(this: any, ...args: any[]): void {
      const now = Date.now();
      if(now - last >= delay) {
        fn.apply(this, args);
        last = now;
      }
    }
}
// --- Examples ---
// Uncomment to test your implementation:

// const log = throttle((msg: string) => console.log(msg), 300)
// log('a')  // fires immediately → "a"
// log('b')  // ignored (within 300ms)
// log('c')  // ignored (within 300ms)
// setTimeout(() => log('d'), 400)  // fires → "d" (300ms passed)
