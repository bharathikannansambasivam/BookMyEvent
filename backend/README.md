# BookMyEvent 🎬

A real-time movie ticket booking platform built with the MERN stack.

## Features

* User Authentication (JWT & Refresh Tokens)
* Browse Movies
* View Movie Details
* Real-Time Seat Reservation
* Redis-Based Seat Locking
* Socket.IO Real-Time Updates
* Multi-Seat Booking
* My Bookings

## Application Flow

```text
Login / Signup
      ↓
Fetch Movies
      ↓
Select Seats
      ↓
Redis Seat Lock
      ↓
Socket.IO Real-Time Update
      ↓
Confirm Booking
      ↓
Booking Saved in MongoDB
```

## Tech Stack

* React
* Node.js
* Express.js
* MongoDB
* Redis
* Socket.IO

## Live Demo

https://bookmyevent32323.onrender.com/

## AWS Deployment

https://54.86.236.14.sslip.io/
