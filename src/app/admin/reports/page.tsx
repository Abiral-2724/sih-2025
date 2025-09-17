'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, LayersControl, Circle, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when position changes
function MapUpdater({ position, zoom, bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (position) {
      map.setView(position, zoom || 10);
    }
  }, [map, position, zoom, bounds]);
  
  return null;
}

// Enhanced Forest Layers Component with Green and Red visualization
function ForestLayers({ showForestCover, showForestLoss }) {
  const map = useMap();
  
  useEffect(() => {
    const layers = [];
    
    if (showForestCover) {
      // Tree Cover layer - GREEN for existing forests
      const treeCoverLayer = L.tileLayer(
        'https://storage.googleapis.com/earthenginepartners-hansen/tiles/gfc_v1.8/treecover2000/{z}/{x}/{y}.png',
        {
          attribution: '&copy; Hansen/UMD/Google/USGS/NASA - Tree Cover 2000',
          opacity: 0.7,
          maxZoom: 18,
          className: 'forest-cover-layer'
        }
      );
      
      // Apply green color filter using CSS
      const style = document.createElement('style');
      style.innerHTML = `
        .forest-cover-layer {
          filter: hue-rotate(90deg) saturate(2) brightness(0.8) contrast(1.2);
          mix-blend-mode: multiply;
        }
      `;
      document.head.appendChild(style);
      
      treeCoverLayer.addTo(map);
      layers.push({ layer: treeCoverLayer, style });
    }
    
    if (showForestLoss) {
      // Forest Loss layer - RED for deforested areas
      const forestLossLayer = L.tileLayer(
        'https://storage.googleapis.com/earthenginepartners-hansen/tiles/gfc_v1.8/lossyear/{z}/{x}/{y}.png',
        {
          attribution: '&copy; Hansen/UMD/Google/USGS/NASA - Forest Loss',
          opacity: 0.8,
          maxZoom: 18,
          className: 'forest-loss-layer'
        }
      );
      
      // Apply red color filter
      const lossStyle = document.createElement('style');
      lossStyle.innerHTML = `
        .forest-loss-layer {
          filter: hue-rotate(0deg) saturate(3) brightness(1.2) contrast(1.5);
          mix-blend-mode: multiply;
        }
      `;
      document.head.appendChild(lossStyle);
      
      forestLossLayer.addTo(map);
      layers.push({ layer: forestLossLayer, style: lossStyle });
    }
    
    return () => {
      layers.forEach(({ layer, style }) => {
        if (map.hasLayer(layer)) {
          map.removeLayer(layer);
        }
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    };
  }, [map, showForestCover, showForestLoss]);
  
  return null;
}

// Additional enhanced forest visualization layers
function EnhancedForestVisualization() {
  const map = useMap();
  
  useEffect(() => {
    // GLAD Deforestation Alerts - Recent deforestation in bright red
    const gladAlertsLayer = L.tileLayer(
      'https://tiles.globalforestwatch.org/glad_alerts/latest/{z}/{x}/{y}.png',
      {
        attribution: '&copy; Global Forest Watch - GLAD Alerts (Recent)',
        opacity: 0.9,
        maxZoom: 18,
        className: 'glad-alerts-layer'
      }
    );
    
    // Style for GLAD alerts - bright red for recent deforestation
    const gladStyle = document.createElement('style');
    gladStyle.innerHTML = `
      .glad-alerts-layer {
        filter: hue-rotate(0deg) saturate(4) brightness(1.5) contrast(2);
      }
    `;
    document.head.appendChild(gladStyle);
    
    gladAlertsLayer.addTo(map);
    
    return () => {
      if (map.hasLayer(gladAlertsLayer)) {
        map.removeLayer(gladAlertsLayer);
      }
      if (gladStyle.parentNode) {
        gladStyle.parentNode.removeChild(gladStyle);
      }
    };
  }, [map]);
  
  return null;
}

// Boundary style for city/state boundaries
const boundaryStyle = {
  color: '#FFD700',
  weight: 3,
  opacity: 0.9,
  fillColor: 'transparent',
  fillOpacity: 0,
  dashArray: '10, 5'
};

// Custom boundary styles
const customBoundaryStyles = {
  circle: { color: '#FF6B35', weight: 3, fillOpacity: 0.1 },
  rectangle: { color: '#4A90E2', weight: 3, fillOpacity: 0.1, dashArray: '5, 5' },
  region: { color: '#8E44AD', weight: 4, fillOpacity: 0.15, dashArray: '15, 10' }
};

export default function IndiaForestMap() {
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('India');
  const [isLoading, setIsLoading] = useState(false);
  const [mapZoom, setMapZoom] = useState(10);
  const [cityBoundary, setCityBoundary] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [forestStats, setForestStats] = useState(null);
  
  // New state for lat/lng navigation
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [boundaryType, setBoundaryType] = useState('circle');
  const [boundaryRadius, setBoundaryRadius] = useState(5000); // in meters
  const [customBoundary, setCustomBoundary] = useState(null);
  const [boundaryWidth, setBoundaryWidth] = useState(0.1); // for rectangle width in degrees
  const [boundaryHeight, setBoundaryHeight] = useState(0.1); // for rectangle height in degrees
  
  // New state for map scanning and OCR
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ocrResults, setOcrResults] = useState(null);
  const [extractedBoundaries, setExtractedBoundaries] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapScale, setMapScale] = useState({ pixelsPerKm: 100 });
  const [referencePoints, setReferencePoints] = useState([]);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  
  // Layer visibility controls
  const [showForestCover, setShowForestCover] = useState(true);
  const [showForestLoss, setShowForestLoss] = useState(true);
  const [showRecentAlerts, setShowRecentAlerts] = useState(true);

  // API Configuration
  const OPENSTREETMAP_NOMINATIM_API = "https://nominatim.openstreetmap.org/search";

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        
        // Reset previous results
        setOcrResults(null);
        setExtractedBoundaries([]);
      } else {
        alert('Please upload a valid image file (JPG, PNG, etc.)');
      }
    }
  };

  // Mock OCR processing function (in real implementation, you'd use Tesseract.js or similar)
  const performOCR = async (imageFile) => {
    setIsProcessing(true);
    
    try {
      // Simulate OCR processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock OCR results - in reality, this would come from actual OCR
      const mockOcrResults = {
        text: "Map Scale: 1:50000\nGrid Reference: 28°30'N 77°15'E\nForest Area: Aravalli Hills\nElevation: 200-400m\nVillage: Sultanpur\nRoad: NH-48\nRiver: Yamuna tributary",
        coordinates: [
          { type: 'point', name: 'Sultanpur', lat: 28.5, lng: 77.25 },
          { type: 'area', name: 'Aravalli Hills', coordinates: [
            [77.2, 28.45], [77.3, 28.45], [77.35, 28.55], [77.25, 28.6], [77.2, 28.45]
          ]},
        ],
        scale: '1:50000',
        gridReference: '28°30\'N 77°15\'E'
      };
      
      setOcrResults(mockOcrResults);
      
      // Extract boundaries from OCR results
      const boundaries = mockOcrResults.coordinates.map((item, index) => ({
        id: index,
        name: item.name,
        type: item.type,
        coordinates: item.coordinates || [[item.lng, item.lat]],
        color: `hsl(${index * 60}, 70%, 50%)`
      }));
      
      setExtractedBoundaries(boundaries);
      
    } catch (error) {
      console.error('OCR processing error:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to convert image coordinates to map coordinates
  const convertImageToMapCoords = (imageX, imageY, imageWidth, imageHeight) => {
    // This is a simplified conversion - in reality, you'd need proper georeferencing
    const baselat = 28.5; // Base latitude from reference point
    const baseLng = 77.25; // Base longitude from reference point
    
    // Convert pixel coordinates to lat/lng (mock implementation)
    const lat = baselat + ((imageHeight - imageY) / imageHeight) * 0.2 - 0.1;
    const lng = baseLng + ((imageX) / imageWidth) * 0.3 - 0.15;
    
    return [lat, lng];
  };

  // Function to overlay extracted boundaries on the main map
  const overlayExtractedBoundaries = () => {
    if (extractedBoundaries.length === 0) {
      alert('No boundaries extracted yet. Please upload and process an image first.');
      return;
    }
    
    // Convert the first extracted boundary to the main map
    const firstBoundary = extractedBoundaries[0];
    if (firstBoundary.type === 'area' && firstBoundary.coordinates) {
      const geoJsonBoundary = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [firstBoundary.coordinates.map(coord => [coord[0], coord[1]])]
        },
        properties: {
          name: `Extracted: ${firstBoundary.name}`,
          source: 'OCR Extraction',
          color: firstBoundary.color
        }
      };
      
      // Set as city boundary to display on main map
      setCityBoundary(geoJsonBoundary);
      
      // Calculate center and set position
      const centerLat = firstBoundary.coordinates.reduce((sum, coord) => sum + coord[1], 0) / firstBoundary.coordinates.length;
      const centerLng = firstBoundary.coordinates.reduce((sum, coord) => sum + coord[0], 0) / firstBoundary.coordinates.length;
      
      setPosition([centerLat, centerLng]);
      setCurrentLocation(`Extracted Region: ${firstBoundary.name}`);
      setMapZoom(12);
      
      // Generate forest stats
      const stats = calculateForestStats(geoJsonBoundary);
      setForestStats(stats);
      
      alert(`Successfully overlayed "${firstBoundary.name}" boundary on the main map!`);
    }
  };
  const navigateToCoordinates = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid latitude and longitude values');
      return;
    }
    
    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }
    
    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }
    
    setPosition([lat, lng]);
    setMapZoom(12);
    setCurrentLocation(`Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    
    // Create custom boundary based on selected type
    createCustomBoundary(lat, lng);
    
    // Generate forest stats for the area
    const stats = calculateForestStats(null);
    setForestStats(stats);
  };

  // Function to create custom boundary around coordinates
  const createCustomBoundary = (lat, lng) => {
    let boundary;
    
    switch (boundaryType) {
      case 'circle':
        boundary = {
          type: 'circle',
          center: [lat, lng],
          radius: boundaryRadius
        };
        break;
      case 'rectangle':
        const halfWidth = boundaryWidth / 2;
        const halfHeight = boundaryHeight / 2;
        boundary = {
          type: 'rectangle',
          bounds: [
            [lat - halfHeight, lng - halfWidth],
            [lat + halfHeight, lng + halfWidth]
          ]
        };
        break;
      case 'region':
        // Create a custom polygon region
        const offset = 0.05;
        boundary = {
          type: 'region',
          coordinates: [
            [lng - offset, lat + offset],
            [lng + offset, lat + offset],
            [lng + offset * 1.5, lat],
            [lng + offset, lat - offset],
            [lng - offset, lat - offset],
            [lng - offset * 1.5, lat],
            [lng - offset, lat + offset]
          ]
        };
        break;
      default:
        boundary = null;
    }
    
    setCustomBoundary(boundary);
  };

  // Function to get city boundaries using OpenStreetMap
  const getCityBoundary = async (placeName) => {
    try {
      const nominatimUrl = `${OPENSTREETMAP_NOMINATIM_API}?q=${encodeURIComponent(placeName + ', India')}&format=json&addressdetails=1&limit=1&polygon_geojson=1`;
      
      const response = await fetch(nominatimUrl);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const place = data[0];
        
        if (place.geojson) {
          return {
            type: "Feature",
            geometry: place.geojson,
            properties: {
              name: place.display_name,
              place_id: place.place_id
            }
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching city boundary:', error);
      return null;
    }
  };

  // Enhanced forest statistics calculation
  const calculateForestStats = (boundaryData) => {
    const mockStats = {
      totalArea: Math.round(Math.random() * 1000 + 500),
      forestCover: Math.round(Math.random() * 200 + 50),
      forestLoss2023: Math.round(Math.random() * 10 + 1),
      forestLoss2022: Math.round(Math.random() * 8 + 1),
      forestLoss2021: Math.round(Math.random() * 12 + 2),
      recentAlerts: Math.round(Math.random() * 5 + 1),
      forestCoverPercentage: Math.round((Math.random() * 30 + 10) * 100) / 100
    };
    
    return mockStats;
  };

  // Enhanced search with boundary fetching
  const searchLocationWithBoundary = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setCityBoundary(null);
    setCustomBoundary(null);
    setMapBounds(null);
    setForestStats(null);
    
    try {
      const boundary = await getCityBoundary(searchQuery);
      
      if (boundary) {
        setCityBoundary(boundary);
        setCurrentLocation(boundary.properties.name);
        
        if (boundary.geometry.type === 'Polygon') {
          const coords = boundary.geometry.coordinates[0];
          
          // Calculate center
          let centerLat = 0, centerLng = 0;
          coords.forEach(coord => {
            centerLat += coord[1];
            centerLng += coord[0];
          });
          centerLat /= coords.length;
          centerLng /= coords.length;
          
          setPosition([centerLat, centerLng]);
          
          // Calculate bounds
          const bounds = coords.reduce((bounds, coord) => {
            return bounds.extend([coord[1], coord[0]]);
          }, L.latLngBounds());
          setMapBounds(bounds);
          
          // Calculate forest statistics
          const stats = calculateForestStats(boundary);
          setForestStats(stats);
        }
      } else {
        alert(`Boundary data for "${searchQuery}" not found. Try searching for major cities like Delhi, Mumbai, Bangalore, Kerala, etc.`);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLocationWithBoundary();
    }
  };

  const handleCoordKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigateToCoordinates();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32, #4CAF50)',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '20px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em', fontWeight: 'bold' }}>
          🌳 Enhanced Forest Monitor with Coordinates
        </h1>
        <p style={{ margin: 0, fontSize: '1.2em', opacity: 0.9 }}>
          Navigate by Place Name or Lat/Lng | Green = Forest | Red = Deforestation
        </p>
      </div>

      {/* Place Name Search */}
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city or state (e.g., Delhi, Mumbai, Karnataka)"
          style={{ 
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #4CAF50',
            borderRadius: '8px',
            flex: '1',
            minWidth: '300px',
            outline: 'none'
          }}
          disabled={isLoading}
        />
        <button 
          onClick={searchLocationWithBoundary} 
          disabled={isLoading}
          style={{ 
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: isLoading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
        >
          {isLoading ? 'Searching...' : 'Search Place'}
        </button>
      </div>

      {/* Map Image Upload and OCR Section */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff3e0',
        borderRadius: '12px',
        border: '2px solid #FF9800'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#F57C00' }}>📷 Upload Old Map for Boundary Extraction</h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  border: '2px dashed #FF9800',
                  borderRadius: '8px',
                  width: '100%',
                  backgroundColor: 'white'
                }}
              />
            </div>
            
            {imagePreview && (
              <div style={{ marginBottom: '15px' }}>
                <img
                  src={imagePreview}
                  alt="Uploaded map preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => uploadedImage && performOCR(uploadedImage)}
                disabled={!uploadedImage || isProcessing}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: isProcessing ? '#ccc' : '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isProcessing ? 'Processing...' : 'Extract Boundaries (OCR)'}
              </button>
              
              <button
                onClick={overlayExtractedBoundaries}
                disabled={extractedBoundaries.length === 0}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: extractedBoundaries.length === 0 ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: extractedBoundaries.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Overlay on Main Map
              </button>
            </div>
          </div>
          
          {/* OCR Results Display */}
          {ocrResults && (
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#F57C00' }}>📝 Extracted Information</h4>
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ddd',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Text Detected:</strong>
                  <pre style={{ 
                    fontSize: '12px', 
                    margin: '5px 0', 
                    padding: '8px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {ocrResults.text}
                  </pre>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Extracted Boundaries: {extractedBoundaries.length}</strong>
                  {extractedBoundaries.map((boundary, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      margin: '5px 0',
                      fontSize: '12px'
                    }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: boundary.color,
                        borderRadius: '2px'
                      }}></div>
                      <span>{boundary.name} ({boundary.type})</span>
                    </div>
                  ))}
                </div>
                
                {ocrResults.scale && (
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <strong>Scale:</strong> {ocrResults.scale}<br/>
                    <strong>Grid Ref:</strong> {ocrResults.gridReference}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#fff8e1', 
          borderRadius: '6px',
          fontSize: '13px',
          color: '#ff8f00'
        }}>
          <strong>📋 How it works:</strong>
          <ol style={{ margin: '5px 0 0 20px' }}>
            <li>Upload an old map image (PNG, JPG, etc.)</li>
            <li>Click "Extract Boundaries" to perform OCR and identify regions</li>
            <li>Review extracted boundaries and information</li>
            <li>Click "Overlay on Main Map" to display the extracted region on your forest map</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>
            <strong>Note:</strong> This demo uses mock OCR results. In production, integrate with Tesseract.js or Google Vision API for real text recognition.
          </p>
        </div>
      </div>
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '12px',
        border: '2px solid #2196F3'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1976D2' }}>📍 Navigate by Coordinates</h3>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            onKeyPress={handleCoordKeyPress}
            placeholder="Latitude (e.g., 28.6139)"
            step="any"
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '2px solid #2196F3',
              borderRadius: '6px',
              minWidth: '150px',
              outline: 'none'
            }}
          />
          
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            onKeyPress={handleCoordKeyPress}
            placeholder="Longitude (e.g., 77.2090)"
            step="any"
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '2px solid #2196F3',
              borderRadius: '6px',
              minWidth: '150px',
              outline: 'none'
            }}
          />

          <select
            value={boundaryType}
            onChange={(e) => setBoundaryType(e.target.value)}
            style={{
              padding: '10px 12px',
              fontSize: '14px',
              border: '2px solid #2196F3',
              borderRadius: '6px',
              minWidth: '120px',
              outline: 'none'
            }}
          >
            <option value="circle">Circle</option>
            <option value="rectangle">Rectangle</option>
            <option value="region">Custom Region</option>
          </select>

          <button 
            onClick={navigateToCoordinates}
            style={{ 
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Go to Coordinates
          </button>
        </div>

        {/* Boundary Configuration */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          {boundaryType === 'circle' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Radius (m):</label>
              <input
                type="number"
                value={boundaryRadius}
                onChange={(e) => setBoundaryRadius(parseInt(e.target.value))}
                min="100"
                max="50000"
                step="100"
                style={{
                  padding: '6px 10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '100px'
                }}
              />
            </div>
          )}

          {boundaryType === 'rectangle' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: '#555' }}>Width (°):</label>
                <input
                  type="number"
                  value={boundaryWidth}
                  onChange={(e) => setBoundaryWidth(parseFloat(e.target.value))}
                  min="0.01"
                  max="1"
                  step="0.01"
                  style={{
                    padding: '6px 10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '80px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: '#555' }}>Height (°):</label>
                <input
                  type="number"
                  value={boundaryHeight}
                  onChange={(e) => setBoundaryHeight(parseFloat(e.target.value))}
                  min="0.01"
                  max="1"
                  step="0.01"
                  style={{
                    padding: '6px 10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '80px'
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <strong>Quick coordinates:</strong> Delhi (28.6139, 77.2090) | Mumbai (19.0760, 72.8777) | Bangalore (12.9716, 77.5946)
        </div>
      </div>

      {/* Layer Controls */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '2px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Map Layer Controls</h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showForestCover}
              onChange={(e) => setShowForestCover(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#2E7D32', borderRadius: '3px' }}></div>
              Forest Cover (Green)
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showForestLoss}
              onChange={(e) => setShowForestLoss(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#D32F2F', borderRadius: '3px' }}></div>
              Historical Forest Loss (Red)
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showRecentAlerts}
              onChange={(e) => setShowRecentAlerts(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#FF1744', borderRadius: '3px' }}></div>
              Recent Deforestation Alerts
            </span>
          </label>
        </div>
      </div>

      {/* Enhanced Forest Statistics Panel */}
      {forestStats && (
        <div style={{
          marginBottom: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '2px solid #4CAF50',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2E7D32' }}>
            📊 Detailed Forest Analysis for {currentLocation.split(',')[0]}
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '15px' 
          }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                {forestStats.totalArea} km²
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Total Area</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
                {forestStats.forestCover} km²
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Current Forest Cover</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF5722' }}>
                {forestStats.forestLoss2023} km²
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Forest Loss (2023)</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF1744' }}>
                {forestStats.recentAlerts}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Recent Alerts</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#795548' }}>
                {forestStats.forestCoverPercentage}%
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Forest Cover %</div>
            </div>
          </div>
          
          {/* Trend Analysis */}
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2E7D32' }}>3-Year Forest Loss Trend</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>2021: <strong>{forestStats.forestLoss2021} km²</strong></div>
              <div>2022: <strong>{forestStats.forestLoss2022} km²</strong></div>
              <div>2023: <strong style={{ color: '#FF5722' }}>{forestStats.forestLoss2023} km²</strong></div>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        border: '3px solid #4CAF50',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          style={{ height: '650px', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          {/* Base Map - Satellite Imagery */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            maxZoom={18}
          />

          {/* Enhanced Forest Layers with Green/Red Color Coding */}
          <ForestLayers showForestCover={showForestCover} showForestLoss={showForestLoss} />
          
          {/* Recent Deforestation Alerts */}
          {showRecentAlerts && <EnhancedForestVisualization />}

          {/* Map updater component */}
          <MapUpdater position={position} zoom={mapZoom} bounds={mapBounds} />

          {/* Enhanced City/State Boundary - Golden outline */}
          {cityBoundary && (
            <GeoJSON 
              data={cityBoundary} 
              style={{
                ...boundaryStyle,
                color: cityBoundary.properties.source === 'OCR Extraction' ? '#8E44AD' : '#FFD700',
                weight: cityBoundary.properties.source === 'OCR Extraction' ? 4 : 3,
                dashArray: cityBoundary.properties.source === 'OCR Extraction' ? '15, 5' : '10, 5'
              }}
              onEachFeature={(feature, layer) => {
                const isExtracted = feature.properties.source === 'OCR Extraction';
                layer.bindPopup(`
                  <div style="text-align: center;">
                    <strong>${feature.properties.name.split(',')[0]}</strong><br/>
                    <em>${isExtracted ? 'Extracted from Old Map' : 'Administrative Boundary'}</em><br/>
                    ${isExtracted ? `<div style="margin: 5px 0; font-size: 11px; color: #8E44AD;"><strong>Source:</strong> OCR Analysis</div>` : ''}
                    <div style="margin-top: 8px; font-size: 12px;">
                      <span style="color: #4CAF50;">● Forest Cover</span> |
                      <span style="color: #FF5722;"> ● Forest Loss</span> |
                      <span style="color: #FF1744;"> ● Recent Alerts</span>
                    </div>
                  </div>
                `);
              }}
            />
          )}

          {/* Custom Boundaries based on coordinates */}
          {customBoundary && customBoundary.type === 'circle' && (
            <Circle
              center={customBoundary.center}
              radius={customBoundary.radius}
              pathOptions={customBoundaryStyles.circle}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>Custom Boundary (Circle)</strong><br/>
                  <small>Center: {customBoundary.center[0].toFixed(4)}, {customBoundary.center[1].toFixed(4)}</small><br/>
                  <small>Radius: {customBoundary.radius}m</small>
                </div>
              </Popup>
            </Circle>
          )}

          {customBoundary && customBoundary.type === 'rectangle' && (
            <Rectangle
              bounds={customBoundary.bounds}
              pathOptions={customBoundaryStyles.rectangle}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>Custom Boundary (Rectangle)</strong><br/>
                  <small>SW: {customBoundary.bounds[0][0].toFixed(4)}, {customBoundary.bounds[0][1].toFixed(4)}</small><br/>
                  <small>NE: {customBoundary.bounds[1][0].toFixed(4)}, {customBoundary.bounds[1][1].toFixed(4)}</small>
                </div>
              </Popup>
            </Rectangle>
          )}

          {customBoundary && customBoundary.type === 'region' && (
            <GeoJSON
              data={{
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [customBoundary.coordinates]
                },
                properties: { name: "Custom Region" }
              }}
              style={customBoundaryStyles.region}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>Custom Region Boundary</strong><br/>
                  <small>Irregular polygon shape</small><br/>
                  <em>Purple outline with fill</em>
                </div>
              </Popup>
            </GeoJSON>
          )}

          {/* Center marker */}
          {position && (
            <Marker position={position}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>{currentLocation.split(',')[0]}</strong>
                  <br />
                  <small>Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}</small>
                  <br />
                  <em>🌳 Green areas = Forest | 🔴 Red areas = Deforested</em>
                  {customBoundary && (
                    <>
                      <br />
                      <strong style={{ color: '#FF6B35' }}>Custom Boundary: {boundaryType}</strong>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>🎨 Color Coding & Boundary Guide</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '20px' 
        }}>
          <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', border: '2px solid #4CAF50' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#2E7D32', borderRadius: '4px' }}></div>
              <strong style={{ color: '#2E7D32' }}>Forest Cover (Green)</strong>
            </div>
            <ul style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              <li>Existing forest areas as of 2000</li>
              <li>Dense tree canopy coverage</li>
              <li>Protected and natural forests</li>
            </ul>
          </div>
          
          <div style={{ padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', border: '2px solid #FF5722' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#D32F2F', borderRadius: '4px' }}></div>
              <strong style={{ color: '#D32F2F' }}>Historical Forest Loss (Red)</strong>
            </div>
            <ul style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              <li>Areas deforested since 2000</li>
              <li>Permanent forest cover loss</li>
              <li>Shows year-by-year loss patterns</li>
            </ul>
          </div>
          
          <div style={{ padding: '15px', backgroundColor: '#fce4ec', borderRadius: '8px', border: '2px solid #FF1744' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#FF1744', borderRadius: '4px' }}></div>
              <strong style={{ color: '#FF1744' }}>Recent Alerts (Bright Red)</strong>
            </div>
            <ul style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              <li>Recent deforestation activity</li>
              <li>Real-time forest loss alerts</li>
              <li>Updated weekly/monthly</li>
            </ul>
          </div>
        </div>

        {/* Boundary Types Guide */}
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '2px solid #2196F3'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1976D2' }}>🔲 Custom Boundary Types</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                border: '3px solid #FF6B35',
                borderRadius: '50%'
              }}></div>
              <div>
                <strong style={{ color: '#FF6B35' }}>Circle</strong><br/>
                <small style={{ color: '#666' }}>Configurable radius</small>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '24px', 
                height: '16px', 
                backgroundColor: 'rgba(74, 144, 226, 0.2)', 
                border: '2px dashed #4A90E2'
              }}></div>
              <div>
                <strong style={{ color: '#4A90E2' }}>Rectangle</strong><br/>
                <small style={{ color: '#666' }}>Adjustable dimensions</small>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '24px', 
                height: '20px', 
                backgroundColor: 'rgba(142, 68, 173, 0.2)', 
                border: '3px dashed #8E44AD',
                clipPath: 'polygon(0 50%, 25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%)'
              }}></div>
              <div>
                <strong style={{ color: '#8E44AD' }}>Custom Region</strong><br/>
                <small style={{ color: '#666' }}>Irregular shape</small>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '24px', 
                height: '16px', 
                backgroundColor: 'rgba(142, 68, 173, 0.2)', 
                border: '4px dashed #8E44AD'
              }}></div>
              <div>
                <strong style={{ color: '#8E44AD' }}>OCR Extracted</strong><br/>
                <small style={{ color: '#666' }}>From uploaded maps</small>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '5px', marginTop: '15px' }}>
          <strong>💡 Navigation Tips:</strong>
          <ul style={{ margin: '10px 0 0 20px', fontSize: '14px' }}>
            <li><strong>Place Search:</strong> Enter any Indian city/state name for automatic boundary detection</li>
            <li><strong>Coordinates:</strong> Use decimal degrees (e.g., 28.6139, 77.2090 for Delhi)</li>
            <li><strong>Boundaries:</strong> Choose circle for radius-based areas, rectangle for geometric regions, or custom for irregular shapes</li>
            <li><strong>Map Upload:</strong> Upload old maps to extract boundaries using OCR technology</li>
            <li><strong>Forest Analysis:</strong> All boundary types provide detailed forest statistics for the enclosed area</li>
          </ul>
          
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '5px' }}>
            <strong>🗺️ Old Map Processing:</strong>
            <p style={{ margin: '5px 0', fontSize: '13px' }}>
              Upload historical maps, survey documents, or hand-drawn boundaries. The system will:
              <br/>• Perform OCR to extract text and coordinates
              <br/>• Identify boundary markers and reference points
              <br/>• Convert image coordinates to geographic coordinates
              <br/>• Overlay extracted regions on the main forest map
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}