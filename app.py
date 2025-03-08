from flask import Flask, jsonify, request, render_template
import heapq
import time
from collections import deque

app = Flask(__name__)


vehicle_queue = deque()  
parked_vehicles = {}    
available_spots = []     

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/status', methods=['GET'])
def status():
    """Get the current status of the parking lot"""
    return jsonify({
        'queue': list(vehicle_queue),
        'parked_vehicles': parked_vehicles,
        'available_spots': list(available_spots)
    })

@app.route('/initialize', methods=['POST'])
def initialize():
    """Initialize the parking lot with a specified number of spots"""
    data = request.json
    size = data.get('size', 10)
    
    
    vehicle_queue.clear()
    parked_vehicles.clear()
    available_spots.clear()
    
   
    for i in range(1, size + 1):
        heapq.heappush(available_spots, i)
    
    return jsonify({
        'status': 'initialized',
        'message': f'Parking lot initialized with {size} spots'
    })

@app.route('/arrive', methods=['POST'])
def arrive():
    """Handle vehicle arrival"""
    data = request.json
    license_plate = data.get('license_plate', '')
    vehicle_type = data.get('vehicle_type', 'car')
    
    if not license_plate or license_plate in parked_vehicles:
        return jsonify({'error': 'Invalid or duplicate license plate'}), 400
    
    if available_spots:
        spot = heapq.heappop(available_spots)
        
        parked_vehicles[license_plate] = {
            'spot': spot,
            'vehicle_type': vehicle_type,
            'entry_time': time.time()
        }
        
        return jsonify({
            'status': 'parked',
            'spot': spot,
            'message': f'Vehicle {license_plate} parked at spot {spot}'
        })
    else:
        vehicle_queue.append((license_plate, vehicle_type))
        return jsonify({
            'status': 'queued',
            'position': len(vehicle_queue),
            'message': f'Vehicle {license_plate} added to queue at position {len(vehicle_queue)}'
        })

@app.route('/depart', methods=['POST'])
def depart():
    """Handle vehicle departure"""
    data = request.json
    license_plate = data.get('license_plate', '')
    
    if license_plate not in parked_vehicles:
        return jsonify({'error': f'Vehicle {license_plate} not found in parking lot'}), 404
    
    spot = parked_vehicles[license_plate]['spot']
    entry_time = parked_vehicles[license_plate]['entry_time']
    del parked_vehicles[license_plate]
    
    heapq.heappush(available_spots, spot)
    
    next_vehicle = None
    if vehicle_queue:
        print(f"Vehicle queue before popping: {list(vehicle_queue)}")  # Debugging statement
        next_vehicle, vehicle_type = vehicle_queue.popleft()
        next_spot = heapq.heappop(available_spots)
        parked_vehicles[next_vehicle] = {
            'spot': next_spot,
            'vehicle_type': vehicle_type,
            'entry_time': time.time()
        }
    
    return jsonify({
        'status': 'departed',
        'spot_freed': spot,
        'parking_duration': time.time() - entry_time,
        'next_vehicle_parked': next_vehicle
    })

if __name__ == '__main__':
    app.run(debug=True)