# Smart Parking Lot Management System

This project is a Smart Parking Lot Management System built using Flask for the backend and vanilla JavaScript for the frontend. The system allows users to initialize a parking lot with a specified number of spots, manage vehicle arrivals and departures, and visualize the current status of the parking lot.

## Features

- Initialize the parking lot with a specified number of spots.
- Handle vehicle arrivals and departures.
- Visualize the queue of waiting vehicles, available parking spots, and parked vehicles.
- Display vehicle type using emojis.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/smart-parking-lot.git
   cd smart-parking-lot
   ```

## Project Structure

```markdown
smart-parking-lot/
│
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
│
├── templates/
│   └── index.html
│
├── screenshots/
│   ├── image.png
│   └── image1.png
│
├── app.py
├── requirements.txt
└── README.md
```

### API Endpoints
GET /status: Get the current status of the parking lot.
POST /initialize: Initialize the parking lot with a specified number of spots.
POST /arrive: Handle vehicle arrival.
POST /depart: Handle vehicle departure.
### Frontend
The frontend is built using vanilla JavaScript and HTML. It includes the following components:

Controls: Allows users to initialize the parking lot, and manage vehicle arrivals and departures.
System Status: Displays the queue of waiting vehicles, available parking spots, and parked vehicles.
Controls
Initialize Parking Lot: Input the number of parking spots and click "Initialize" to set up the parking lot.
Vehicle Arrival: Input the license plate number, select the vehicle type (Car, Bike, Truck), and click "Arrive" to add a vehicle to the parking lot or queue.
Vehicle Departure: Input the license plate number and click "Depart" to remove a vehicle from the parking lot.
System Status
Queue Visualization: Displays the queue of waiting vehicles with their license plate numbers and vehicle type emojis.
Available Parking Spots (Min-Heap): Displays the available parking spots in a min-heap structure.
Parked Vehicles: Displays the parked vehicles with their license plate numbers, vehicle type emojis, and parking duration.
### Backend
The backend is built using Flask and includes the following routes:

/: Render the main page.
/status: Get the current status of the parking lot.
/initialize: Initialize the parking lot with a specified number of spots.
/arrive: Handle vehicle arrival.
/depart: Handle vehicle departure.
Data Structures
vehicle_queue: A deque to manage the queue of waiting vehicles.
parked_vehicles: A dictionary to store details of parked vehicles.
available_spots: A min-heap to manage available parking spots.
### Screenshots
Initial State 
![image](https://github.com/user-attachments/assets/5537ff90-9a4a-46e7-bdbc-ffd01bf895ee)


After Adding Vehicles
![image1](https://github.com/user-attachments/assets/1920fe92-304a-4781-993e-599b4f17d70f)



### Acknowledgements
Flask
Heapq
Deque
