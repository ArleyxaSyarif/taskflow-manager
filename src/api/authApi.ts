export async function loginApi(
    username: string,
    password: string
) {

    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );


    if (
        username === "admin" &&
        password === "123456"
    ) {

        return {
            user: username,
            token: "fake-token-123"
        };

    }


    throw new Error(
        "Username atau password salah"
    );

}