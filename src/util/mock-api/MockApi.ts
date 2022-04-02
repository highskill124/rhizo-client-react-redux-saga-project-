const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class MockApi {
    static request = async (ctx) => {
        await sleep(1000);
        return new Promise((resolve) => {
            return resolve(ctx.data);
        });
    };
}

export { MockApi };
