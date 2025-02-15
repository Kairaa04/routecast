import React, { useState } from "react";
import "./Location.css"; // Custom styles for the component

const LocationForm = () => {
  const [startInput, setStartInput] = useState(""); // User input for start location
  const [endInput, setEndInput] = useState(""); // User input for end location
  const [startLocation, setStartLocation] = useState(null); // Latitude/Longitude for start
  const [endLocation, setEndLocation] = useState(null); // Latitude/Longitude for end
  const [routeUrl, setRouteUrl] = useState(""); // To store the updated route URL
  const [waypointAddresses, setWaypointAddresses] = useState([]); // Addresses of waypoints

  const fetchCoordinates = async (location, setLocation) => {
    try {
      const apiKey = "4ace96f7b3364c87b840a33b42a408f9"; // Replace with your OpenCage API key
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng });
        console.log(
          `Coordinates for "${location}": Latitude: ${lat}, Longitude: ${lng}`
        );
      } else {
        console.log(`No coordinates found for "${location}".`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const apiKey = "4ace96f7b3364c87b840a33b42a408f9"; // Replace with your OpenCage API key
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].formatted; // Return the formatted address
      } else {
        return "Unknown location";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartInput(value);
      fetchCoordinates(value, setStartLocation); // Fetch coordinates dynamically
    } else {
      setEndInput(value);
      fetchCoordinates(value, setEndLocation); // Fetch coordinates dynamically
    }
  };

  const handleGetRoute = async () => {
    if (startLocation && endLocation) {
      // Construct route URL
      const { lat: startLat, lng: startLng } = startLocation;
      const { lat: endLat, lng: endLng } = endLocation;
      const newUrl = `https://maps.gomaps.pro/maps?q=${startLat},${startLng}+to+${endLat},${endLng}&t=&z=10&ie=UTF8&iwloc=&output=embed`;
      setRouteUrl(newUrl);

      try {
        // Fetch route data from OSRM API
        const osrmApiUrl = `http://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&steps=true&geometries=geojson`;

        const response = await fetch(osrmApiUrl);
        const data = await response.json();

        // Log the full response for debugging
        console.log("Full API Response:", data);

        if (data.routes && data.routes.length > 0) {
          const waypoints = data.routes[0].legs[0].steps.map(
            (step) => step.maneuver.location
          );

          if (waypoints.length > 0) {
            console.log("Intermediate locations:", waypoints);

            // Convert waypoint coordinates to addresses
            const addresses = await Promise.all(
              waypoints.map(([lng, lat]) => fetchAddress(lat, lng))
            );

            setWaypointAddresses(addresses);
            console.log("Waypoint Addresses:", addresses);
          } else {
            console.log("No intermediate locations found.");
          }
        } else {
          console.log("No routes found in the response.");
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    } else {
      alert("Please enter valid start and end locations!");
    }
  };

  return (
    <div className="location-form">
      <h2 className="form-title">Plan Your Route</h2>
      <div className="form-group">
        <label htmlFor="start">Start Location</label>
        <input
          type="text"
          id="start"
          name="start"
          placeholder="Enter start location"
          value={startInput}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="end">End Location</label>
        <input
          type="text"
          id="end"
          name="end"
          placeholder="Enter end location"
          value={endInput}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary w-100 mt-3" onClick={handleGetRoute}>
        Get Route
      </button>

      {routeUrl && (
        <div className="map-container mt-4">
          <iframe
            width="100%"
            height="400px"
            src={routeUrl} // Dynamically updated iframe URL
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {waypointAddresses.length > 0 && (
        <div className="waypoints mt-4">
          <h3>Waypoint Addresses:</h3>
          <ul>
            {waypointAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationForm;
