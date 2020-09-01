import  {SearchFn} from './index';

(async () => {
    await SearchFn(...process.argv.slice(2));
    console.log("test completed");
})();