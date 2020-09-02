import {glob} from "glob";
type searchFn = (patt:string, loc:string) => Promise<any>;
async function searchFn(pattern:string, loc:string) {
    let p:Promise<string[]> = new Promise( (resolve, reject) => {
        //console.log(`WORKER starts ${loc}/**/${pattern}*`);
        glob(`${loc}/**/${pattern}*`, function (err:any, fsElem:string[]) {
            if(err)
                reject(err);
            else
                resolve(fsElem);
        });
    });
    return p;
}

// Startin worker
//console.log("WORKER args" + process.argv);
const patt = process.argv[2];
const searchPool:Promise<any>[] = process.argv.slice(3).map(
    (cLoc:string, i:Number) => { return searchFn(patt, cLoc); }
);
(<any>process).send({'type': 'status', 'data' : 'searching start'});

Promise.all(searchPool).then( (values) => {
    /*
    console.log("WORKER asyncPOOL resolved w/ ");
    console.dir(values);
    */
    // Hacky
    (<any>process).send({ 'type': 'results', 'data' : values });
}
);