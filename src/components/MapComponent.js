import React, { useEffect, useRef } from 'react';

const MapComponent = ({ places }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && places.length > 0) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: places[0].geometry.location.lat,
          lng: places[0].geometry.location.lng
        },
        zoom: 12
      });

      places.forEach(place => {
        const { lat, lng } = place.geometry.location;

        new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: place.name || 'No name available',
        });
      });
    }
  }, [places]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;
