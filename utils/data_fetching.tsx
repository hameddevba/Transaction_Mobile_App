// type Headers = { [key: string]: string };

interface FetchDataOptions {
    url: string;
    headers?: { [key: string]: string };
    body?: any;
}

async function fetchData<T>({ url, headers = {}, body = null }: FetchDataOptions): Promise<T> {
    try {
        const options: RequestInit = {
            method: body ? 'POST' : 'GET', // Use POST if body is provided, otherwise GET
            headers: headers,
            body: body ? JSON.stringify(body) : null // Convert body to JSON string if provided
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json(); // Assuming the response is JSON
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default fetchData;
// Usage example:
// const url = 'https://api.example.com/data';
// const headers = { 'Content-Type': 'application/json' };
// const body = { key: 'value' };

// fetchData<{ result: string }>({ url, headers, body })
//     .then(data => console.log(data))
//     .catch(error =>
