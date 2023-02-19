export default async function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ error: "only accept GET method" });

    //address = req.address;
    const address = "south";

    //console.log(process.env.Geoapify_API_key);

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.Geoapify_API_key}`;

    async function fetchAutocompleteData(url) {
        const response = await fetch(url);
        // waits until the request completes...
        const jsonResponse = await response.json();

        return jsonResponse;
    }

    const response = await fetchAutocompleteData(url);
    //console.log(response);
    res.status(200).send(response);
}
