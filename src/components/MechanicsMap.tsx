
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Define the mechanic type with proper coordinates typing
interface Mechanic {
  id: number;
  name: string;
  coordinates: [number, number]; // This ensures it's a tuple with exactly 2 elements
  rating: number;
}

const DUMMY_MECHANICS: Mechanic[] = [
  { id: 1, name: "Mike's Auto", coordinates: [-74.006, 40.7128], rating: 4.8 },
  { id: 2, name: "Quick Fix Motors", coordinates: [-73.986, 40.7428], rating: 4.5 },
  { id: 3, name: "Pro Mechanics", coordinates: [-74.026, 40.7328], rating: 4.9 },
];

interface MechanicsMapProps {
  onClose: () => void;
}

const MechanicsMap = ({ onClose }: MechanicsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = apiKey;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128] as [number, number], // Type assertion to ensure proper type
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for mechanics
    DUMMY_MECHANICS.forEach(mechanic => {
      const markerElement = document.createElement('div');
      markerElement.className = 'flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90';
      markerElement.innerHTML = '🔧';
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${mechanic.name}</h3>
            <p class="text-sm">Rating: ${mechanic.rating} ⭐</p>
          </div>
        `);

      // Use the properly typed coordinates
      new mapboxgl.Marker(markerElement)
        .setLngLat(mechanic.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    setIsMapReady(true);
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Nearby Mechanics</h2>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        {!isMapReady && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Please enter your Mapbox public token to view the map. 
              You can get one at mapbox.com
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Mapbox public token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button onClick={initializeMap} disabled={!apiKey}>
                Load Map
              </Button>
            </div>
          </div>
        )}
        
        <div ref={mapContainer} className="w-full h-[60vh] rounded-lg overflow-hidden" />
      </div>
    </div>
  );
};

export default MechanicsMap;
