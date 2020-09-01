import { fork } from "child_process";
export type SearchFn = (...searchParam: string[]) => Promise<any>;

export async function SearchFn(...searchParam: string[]) {
   let ChildProcess = fork('./build/lib/glob.js', [...searchParam]);
    ChildProcess.on('found', (m) => {
        console.log('Found w/ data: ', m);
    })
    .on('notFound', (m) => {
        console.log('Not found w/ data', m);
    })
};
