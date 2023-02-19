export default async function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ error: "only accept GET method" });

    //address = req.address;
    const address = "south";
    const direction = "onewaytrip";
    const from = "HEL";
    const to = "OUL";
    const date = "2023-05-20";
    const currency = "USD";

    const url = `https://api.flightapi.io/${direction}/${process.env.flight_API_key}/${from}/${to}/${date}/1/0/0/Economy/${currency}`;

    async function fetchFlightData(url) {
        const response = await fetch(url);
        // waits until the request completes...
        const jsonResponse = await response.json();

        return jsonResponse;
    }

    const response = await fetchFlightData(url);
    console.log(response);
    res.status(200).send(response);
}
