#!/bin/bash

# Start backend in the background
cd backend && npm start &

# Start frontend in the background
cd frontend && npm start &

# Wait for both services to start 
# (replace with appropriate checks)
wait

echo "Both services are running!"