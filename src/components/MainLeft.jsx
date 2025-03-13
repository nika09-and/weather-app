import LocationsComponent from "./LocationsComponent"
import newYork from "../assets/new-york-02-02.svg";
import london from "../assets/London-02-02.svg";
import dubai from "../assets/dubai-02.svg";
import pisa from "../assets/pisa-02.svg";

export default function MainLeft(){
    return(
        <div id="leftSide">
            <h1 className="header">Locations</h1>
            <div id="locationsContainer">
                <LocationsComponent name = "New York" imageSrc={newYork} />
                <LocationsComponent name = "London" imageSrc={london} />
                <LocationsComponent name = "Pisa" imageSrc={pisa} />
                <LocationsComponent name = "Dubai" imageSrc={dubai} />
            </div>
        </div>
    )
}