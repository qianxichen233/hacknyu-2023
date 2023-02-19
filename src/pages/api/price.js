export default handler = (req, res) => {
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });

    if (!req.body.location)
        return res.status(406).json({ error: "No location information" });

    const location = req.body.location;
    const date = req.body.date;
};
