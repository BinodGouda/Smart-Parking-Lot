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
GET /status: Get the current status of the parking lot. <br>
POST /initialize: Initialize the parking lot with a specified number of spots.  <br>
POST /arrive: Handle vehicle arrival. <br>
POST /depart: Handle vehicle departure. <br>
### Frontend
The frontend is built using vanilla JavaScript and HTML. It includes the following components: <br>
Controls: Allows users to initialize the parking lot, and manage vehicle arrivals and departures. <br>
System Status: Displays the queue of waiting vehicles, available parking spots, and parked vehicles. <br><br>
### Controls 
Initialize Parking Lot: Input the number of parking spots and click "Initialize" to set up the parking lot. <br>
Vehicle Arrival: Input the license plate number, select the vehicle type (Car, Bike, Truck), and click "Arrive" to add a vehicle to the parking lot or queue. <br>
Vehicle Departure: Input the license plate number and click "Depart" to remove a vehicle from the parking lot. <br><br>
### System Status 
Queue Visualization: Displays the queue of waiting vehicles with their license plate numbers and vehicle type emojis.<br>
Available Parking Spots (Min-Heap): Displays the available parking spots in a min-heap structure.<br>
Parked Vehicles: Displays the parked vehicles with their license plate numbers, vehicle type emojis, and parking duration.<br>
### Backend
The backend is built using Flask and includes the following routes:<br>

/: Render the main page.<br>
/status: Get the current status of the parking lot.<br>
/initialize: Initialize the parking lot with a specified number of spots.<br>
/arrive: Handle vehicle arrival.<br>
/depart: Handle vehicle departure.<br><br>
### Data Structures
vehicle_queue: A deque to manage the queue of waiting vehicles.<br>
parked_vehicles: A dictionary to store details of parked vehicles.<br>
available_spots: A min-heap to manage available parking spots.<br>
### Screenshots
Initial State 
![image](https://github.com/user-attachments/assets/5537ff90-9a4a-46e7-bdbc-ffd01bf895ee)

After Adding Vehicles
![image](https://github.com/user-attachments/assets/38ad3bd6-a96c-4eea-b8cc-16a3aff54fd7)


After Parking Spots Full Vehicles
![image1](https://github.com/user-attachments/assets/1920fe92-304a-4781-993e-599b4f17d70f)



### Technology Used
Flask: A micro web framework written in Python.<br>
JavaScript: A programming language used to create dynamic and interactive effects within web browsers.<br>
HTML: The standard markup language for creating web pages.<br>
CSS: A style sheet language used for describing the presentation of a document written in HTML.<br>
Heapq: A Python module that provides an implementation of the heap queue algorithm, also known as the priority queue algorithm.<br>
Deque: A double-ended queue, which allows append and pop operations from both ends of the queue.<br>
