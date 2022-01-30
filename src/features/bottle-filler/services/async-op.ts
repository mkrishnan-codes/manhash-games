export function giveTimeout(data: any, time = 500) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data }), time)
    );
}
