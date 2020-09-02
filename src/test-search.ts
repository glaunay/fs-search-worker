import  {SearchFn} from './index';

console.log("Looking for", process.argv[2], "in", ...process.argv.slice(3) );

(async () => {
    let results = await SearchFn(...process.argv.slice(2));
    console.log("test completed", results);
})();