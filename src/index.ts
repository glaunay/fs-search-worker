import { fork } from "child_process";
export type SearchFn = (...searchParam: string[]) => Promise<any>;



export async function SearchFn(...searchParam: string[]) {
    return new Promise ( (resolve, reject)=>{
        let ChildProcess = fork(`${__dirname}/lib/glob.js`, [...searchParam]);
        ChildProcess.on('message', (d:{}) => {
            if('type' in d)
                if(d["type"] === 'results'){
                    let empty = true; 
                    const data: string[][] = d["data"]
                    data.map(path_results => {if (path_results.length !== 0)empty=false }) //check if we found results
                    if (empty) reject("not found")
                    else resolve(data)
                }

            //console.log('Found w/ data: ', d);
        })
    });
}
