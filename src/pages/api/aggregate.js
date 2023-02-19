import { hackathon, flight, airport, autocomplete } from "@/utils/utility_backend";
import data from './test_data.json' assert { type: 'JSON' };
export default async function handler(req, res) {
    // if (req.method !== "POST")
    //     return res.status(405).json({ error: "only accept POST method" });

    const hackathonData = await hackathon();
    //console.log(hackathonData);


    const online = [
        'Everywhere', 'North American Timezone', 'APAC Timezone'
    ] 

    const year = new Date().getFullYear();

    const monthNames = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };
      
      let hackathonFlightData = [];
    // 3 is just used for testing, in order to iterate through the whole list, we should be 
    // doing hackathonData.length
    for (let i = 0; i < 6; i++) {
        if (typeof hackathonData[i].date != "undefined") {
            const hackathonObject = hackathonData[i];
        const dateRange = hackathonObject.date;
        const location = hackathonObject.location;
        const city = location.city;
        if (online.includes(city)){
            continue;
        }
        else {
            console.log(city)
        }
        //console.log(dateRange);
        const [departureDate, arrivalDate] = dateRange.split('-');
        console.log(departureDate);
          const month = monthNames[departureDate.substr(0, 3)]; // get month number from month name
          
          const day = departureDate.match(/\d+/)[0]; // extract day from input string using regex
          
          const newDateString = `${year}-${month}-${day}`; // combine year, month, and day in YYYY-MM-DD format

          console.log(newDateString);
          
          //const from = req.body.location;
          const from = "New York"
          const to = city;
          //flight(from, to, departureDate)
          const flight_dummy_data = get_flight_data_dummy();
          console.log(flight_dummy_data['legs'][0]['carriers'][0]["name"]);
          let hackathonFlightObject = {};
          let hackObject = {};
          let flightObject = {};
          let flightSource = {};
          let flightDestination = {};

          hackObject["hackathonName"] = hackathonObject.name;
          hackObject["hackathonLocation"] = city;
          hackObject["hackathonDate"] = dateRange;
          hackObject["imgURL"] = hackathonObject.logoImageURL;

          flightSource["name"] = flight_dummy_data['legs'][0]['origin']['name'];
          flightSource["displayCode"] = flight_dummy_data['legs'][0]['origin']['display_code'];

          flightDestination["name"] = flight_dummy_data['legs'][0]['destination']['name'];
          flightDestination["displayCode"] = flight_dummy_data['legs'][0]['destination']['display_code'];

          flightObject["price"] = flight_dummy_data['price']['amount'];
          flightObject["source"] = flightSource;
          flightObject["destination"] = flightDestination;
          flightObject["totalDuration"] = flight_dummy_data['totalDuration']/120;
          flightObject["Carriers"] = flight_dummy_data['legs'][0]['carriers'][0]["name"];

          hackathonFlightObject["hackathon"] = hackObject;
          hackathonFlightObject["flight"] = flightObject;

          console.log(hackathonFlightObject)
 
          hackathonFlightData.push(hackathonFlightObject);


        }
    }

    res.status(200).send(hackathonFlightData);

}

function get_flight_data_dummy(){
    return data;
}