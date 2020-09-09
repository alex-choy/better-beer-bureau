import "./styles/main.css";
// alert("connected js");
import { breweryAPIKey } from './config/keys_dev';
const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Adds Acces-Control-Allow-Origin header to the request

document.addEventListener("DOMContentLoaded", () => {
    const req = new XMLHttpRequest();
    req.open(
      "GET",
      `${proxyurl}https://sandbox-api.brewerydb.com/v2/beer/c4f2KE/?key=${breweryAPIKey}`
    );
    req.onload = () => {
        console.log(JSON.parse(req.response).data);
    }
    const res = req.send();
})