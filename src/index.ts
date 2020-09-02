import { fork } from "child_process";
export type SearchFn = (...searchParam: string[]) => Promise<any>;

export async function SearchFn(...searchParam: string[]) {
    return new Promise ( (resolve, reject)=>{
        let ChildProcess = fork(`${__dirname}/lib/glob.js`, [...searchParam]);
        ChildProcess.on('message', (d:{}) => {
            if('type' in d)
                if(d['type'] === 'results')
                    resolve(d['data']);
            //console.log('Found w/ data: ', d);
        })
    });
}
