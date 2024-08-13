import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import './PlaceSearch.css'; 


const PlaceSearch = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const requestData = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
      };

     
      if (!latitude || !longitude || !radius) {
          setError('Please fill in all fields.');
          return;
        }
    

      const response = await axios.post('http://localhost:8070/api/v1/places', requestData);
      console.log('API Response:', response.data);
      setPlaces(response.data.results); 
      setError(null);
    } catch (err) {
      setError('Error fetching place data');
      setPlaces([]);
    }
  };

  return (
    <div>
      <div className="title">
      <h2>Nearby Places Finder</h2>
      </div>
      <div className='input'>
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Radius (meters)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}

      {places.length > 0 && <MapComponent places={places} />}
    </div>
  );
};

export default PlaceSearch;
