import {Glob} from "glob";
type searcFn = (patt:string, loc:string) => Promise<any>;
function searchFn(pattern:string, loc:string) {
    let p = new Promise( (resolve, reject) => {
        console.log("WORKER starts",pattern, loc );
        let mg = new Glob(pattern, {'cwd' : loc}, (err, data)=>{
            if (err) 
                console.log("PWET", err)
            if(data)
                console.log("Twep (",pattern, loc, ")", data)
            resolve("ZOOM");
        });
    });
    return p;
}

// Startin worker

const patt = "**/*" + process.argv[2] + "*";
const searchPool:Promise<any>[] = process.argv.slice(3).map(
    (cLoc:string, i:Number) => { return searchFn(patt, cLoc); }
);
(<any>process).send({'type': 'status', 'data' : 'searching start'});

Promise.all(searchPool).then( (values) => {
    console.log("WORKER resolved w/ ");
    console.dir(values);
    // Hacky
    (<any>process).send({ 'type': 'results', 'data' : values });
}
);