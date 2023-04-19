export const useFetch = () => {
    const get = async (slug: string) =>
        await fetch(`http://localhost:1337/api${slug}`, {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer 3df7cd2c6bc95d78a8934059f0587fd11ce305018b8b940e862c0fb27eab51aeaca0de285fae9fb1912ca534ecb169e6301fcb99d6316dae876337181d82521990a15b53e702cb5fd755736fe26762a3abde66b9ec7fb5a3281fd4745b1db3a1a92a91a9977a78359f64d17b389fdb7403b98d9640e5003fce0cbbac26f6e98c',
            },
        }).then(async (response) => await response.json())

    return {
        get,
    }
}
