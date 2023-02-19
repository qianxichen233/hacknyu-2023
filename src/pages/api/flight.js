import { flight } from "@/utils/utility_backend";

export default async function handler(req, res) {
    const response = await flight("Toyko", "New York", "2023-02-20");
    //console.log(response);
    res.status(200).send(response);
}
