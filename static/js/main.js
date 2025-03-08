document.addEventListener('DOMContentLoaded', function () {
    const parkingLotSizeInput = document.getElementById('parkingLotSizeInput');
    const initializeBtn = document.getElementById('initializeBtn');
    const licensePlateInput = document.getElementById('licensePlateInput');
    const vehicleTypeSelect = document.getElementById('vehicleTypeSelect');
    const arriveBtn = document.getElementById('arriveBtn');
    const departBtn = document.getElementById('departBtn');
    const queueVisualization = document.getElementById('queueVisualization');
    const heapVisualization = document.getElementById('heapVisualization');
    const parkingVisualization = document.getElementById('parkingVisualization');
    const notifications = document.getElementById('notifications');

    updateSystemStatus();

  
    initializeBtn.addEventListener('click', initializeParkingLot);
    arriveBtn.addEventListener('click', handleVehicleArrival);
    departBtn.addEventListener('click', handleVehicleDeparture);

    
    licensePlateInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleVehicleArrival();
        }
    });

    function initializeParkingLot() {
        const size = parseInt(parkingLotSizeInput.value);
        if (isNaN(size) || size <= 0) {
            showNotification('Please enter a valid number of parking spots', true);
            return;
        }

        fetch('/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ size: size })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showNotification(data.error, true);
                } else {
                    showNotification(data.message);
                    updateSystemStatus();
                }
            })
            .catch(error => {
                showNotification('An error occurred: ' + error.message, true);
            });
    }

    
    function handleVehicleArrival() {
        const licensePlate = licensePlateInput.value.trim().toUpperCase();
        const vehicleType = vehicleTypeSelect.value;

        if (!licensePlate) {
            showNotification('Please enter a license plate number', true);
            return;
        }

        fetch('/arrive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ license_plate: licensePlate, vehicle_type: vehicleType })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showNotification(data.error, true);
                } else {
                    showNotification(data.message);
                    updateSystemStatus();
                    licensePlateInput.value = '';
                    licensePlateInput.focus();
                }
            })
            .catch(error => {
                showNotification('An error occurred: ' + error.message, true);
            });
    }

    
    function handleVehicleDeparture() {
        const licensePlate = licensePlateInput.value.trim().toUpperCase();

        if (!licensePlate) {
            showNotification('Please enter a license plate number', true);
            return;
        }

        fetch('/depart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ license_plate: licensePlate })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showNotification(data.error, true);
                } else {
                    let message = `Vehicle ${licensePlate} has departed from spot ${data.spot_freed}`;
                    if (data.next_vehicle_parked) {
                        message += `. ${data.next_vehicle_parked} has been parked.`;
                    }
                    showNotification(message);
                    updateSystemStatus();
                    licensePlateInput.value = '';
                    licensePlateInput.focus();
                }
            })
            .catch(error => {
                showNotification('An error occurred: ' + error.message, true);
            });
    }

    
    function updateSystemStatus() {
        fetch('/status')
            .then(response => response.json())
            .then(data => {
                updateQueueVisualization(data.queue);
                updateHeapVisualization(data.available_spots);
                updateParkingVisualization(data.parked_vehicles);
            })
            .catch(error => {
                showNotification('Failed to update system status: ' + error.message, true);
            });
    }

    function updateQueueVisualization(queue) {
        queueVisualization.innerHTML = '';

        if (queue.length === 0) {
            queueVisualization.innerHTML = '<div class="empty-message">No vehicles in queue</div>';
            return;
        }

        queue.forEach(([licensePlate, vehicleType], index) => {
            const queueItem = document.createElement('div');
            queueItem.className = 'queue-item';
            queueItem.style.animationDelay = `${index * 0.1}s`;

            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            if (vehicleType === 'car') {
                emoji.textContent = `🚘`;
            } else if (vehicleType === 'bike') {
                emoji.textContent = `🏍️`;
            } else if (vehicleType === 'truck') {
                emoji.textContent = `🚚`;
            }

            queueItem.textContent = licensePlate;
            queueItem.appendChild(emoji);
            queueVisualization.appendChild(queueItem);
        });
    }

    function updateHeapVisualization(availableSpots) {
        heapVisualization.innerHTML = '';

        if (availableSpots.length === 0) {
            heapVisualization.innerHTML = '<div class="empty-message">No available spots</div>';
            return;
        }

        availableSpots.sort((a, b) => a - b);

        availableSpots.forEach((spot, index) => {
            const heapItem = document.createElement('div');
            heapItem.className = 'heap-item';
            heapItem.style.animationDelay = `${index * 0.05}s`;
            heapItem.textContent = spot;
            heapVisualization.appendChild(heapItem);
        });
    }


    function updateParkingVisualization(parkedVehicles) {
        parkingVisualization.innerHTML = '';

        if (Object.keys(parkedVehicles).length === 0) {
            parkingVisualization.innerHTML = '<div class="empty-message">No vehicles parked</div>';
            return;
        }

        const sortedParkedVehicles = Object.entries(parkedVehicles).sort((a, b) => a[1].spot - b[1].spot);
        

        sortedParkedVehicles.forEach(([licensePlate, details], index) => {
            const parkingSpot = document.createElement('div');
            parkingSpot.className = 'parking-spot';
            parkingSpot.style.animationDelay = `${index * 0.1}s`;

            const spotNumber = document.createElement('div');
            spotNumber.className = 'spot-number';
            spotNumber.textContent = details.spot;

            const licensePlateElement = document.createElement('div');
            licensePlateElement.className = 'license-plate';
            licensePlateElement.textContent = licensePlate;

            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            if (details.vehicle_type === 'car') {
                emoji.textContent = `🚘`;
            } else if (details.vehicle_type === 'bike') {
                emoji.textContent = `🏍️`;
            } else if (details.vehicle_type === 'truck') {
                emoji.textContent = `🚚`;
            }

           
            const entryTime = new Date(details.entry_time * 1000);
            const now = new Date();
            const durationMinutes = Math.floor((now - entryTime) / 60000);

            const duration = document.createElement('div');
            duration.className = 'duration';
            duration.textContent = `${durationMinutes} min`;

            parkingSpot.appendChild(spotNumber);
            parkingSpot.appendChild(licensePlateElement);
            parkingSpot.appendChild(emoji);
            parkingSpot.appendChild(duration);

            parkingVisualization.appendChild(parkingSpot);
        });
    }

 
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : ''}`;
        notification.textContent = message;

        notifications.appendChild(notification);

        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notifications.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Update the status every 30 seconds for real-time data
    // setInterval(updateSystemStatus, 30000);
});