
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Map, MapPin } from 'lucide-react';

interface Mechanic {
  id: number;
  name: string;
  coordinates: [number, number];
  rating: number;
  specialty?: string;
  distance?: string;
}

const DUMMY_MECHANICS: Mechanic[] = [
  { 
    id: 1, 
    name: "Mike's Auto", 
    coordinates: [-74.006, 40.7128], 
    rating: 4.8, 
    specialty: "Engine & Transmission",
    distance: "1.2 miles"
  },
  { 
    id: 2, 
    name: "Quick Fix Motors", 
    coordinates: [-73.986, 40.7428], 
    rating: 4.5,
    specialty: "Electrical Systems",
    distance: "0.8 miles" 
  },
  { 
    id: 3, 
    name: "Pro Mechanics", 
    coordinates: [-74.026, 40.7328], 
    rating: 4.9,
    specialty: "Tires & Brakes", 
    distance: "2.5 miles"
  },
];

interface MechanicsMapProps {
  onClose: () => void;
}

const MechanicsMap = ({ onClose }: MechanicsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = apiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128] as [number, number],
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    DUMMY_MECHANICS.forEach(mechanic => {
      const markerElement = document.createElement('div');
      markerElement.className = 'flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 shadow-lg';
      markerElement.innerHTML = '🔧';
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-lg">${mechanic.name}</h3>
            <p class="text-sm mb-1">Rating: ${mechanic.rating} ⭐</p>
            <p class="text-sm text-gray-600">${mechanic.specialty || 'General Mechanic'}</p>
            <p class="text-sm text-gray-600">${mechanic.distance || 'Distance unavailable'}</p>
            <button class="mt-2 bg-primary text-white px-3 py-1 rounded-md text-sm font-medium" onclick="document.dispatchEvent(new CustomEvent('selectMechanic', {detail: ${mechanic.id}}))">
              Contact
            </button>
          </div>
        `);

      new mapboxgl.Marker(markerElement)
        .setLngLat(mechanic.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Handle custom events from popups
    document.addEventListener('selectMechanic', ((e: CustomEvent) => {
      const mechanic = DUMMY_MECHANICS.find(m => m.id === e.detail);
      setSelectedMechanic(mechanic || null);
    }) as EventListener);

    setIsMapReady(true);
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
      // Clean up event listener
      document.removeEventListener('selectMechanic', (() => {}) as EventListener);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-2xl font-semibold">
              {selectedMechanic ? selectedMechanic.name : "Nearby Mechanics"}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>✕</Button>
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
                className="flex-grow"
              />
              <Button onClick={initializeMap} disabled={!apiKey}>
                <Map size={18} className="mr-2" />
                Load Map
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <div ref={mapContainer} className="w-full md:w-2/3 h-[60vh] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" />
          
          <div className="w-full md:w-1/3">
            {selectedMechanic ? (
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md h-full">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedMechanic.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      ★★★★★ <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{selectedMechanic.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="mb-1"><span className="font-medium">Specialty:</span> {selectedMechanic.specialty}</p>
                    <p className="mb-1"><span className="font-medium">Distance:</span> {selectedMechanic.distance}</p>
                    <p className="mb-1"><span className="font-medium">Response Time:</span> ~10 mins</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <h4 className="font-medium mb-2">Services</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Roadside Assistance</li>
                    <li>• Basic Repairs</li>
                    <li>• Diagnostics</li>
                  </ul>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button className="w-full" variant="accent">
                    Request Assistance
                  </Button>
                  <Button variant="outline" className="w-full">
                    Message Mechanic
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setSelectedMechanic(null)}
                  >
                    Back to All Mechanics
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md h-full">
                <h3 className="font-semibold mb-3">Available Mechanics</h3>
                
                {DUMMY_MECHANICS.map(mechanic => (
                  <div 
                    key={mechanic.id}
                    className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-3 mb-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => setSelectedMechanic(mechanic)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-2xl">🔧</div>
                      <div>
                        <h4 className="font-medium">{mechanic.name}</h4>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">{mechanic.rating}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{mechanic.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                  Click on a mechanic or marker for more details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicsMap;
