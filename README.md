# Backend Developer Assignment

Welcome to FarePlace's backend developer assignment! 

The purpose of this assignment is to assess your coding and problem solving skills.

We present here a simplified variant of a real scenario developers in FarePlace may have to contend with.

## Overview

The Airline “Avaria Airways” has started to build their new portal!

As part of this project, you were tasked with building a web service that shall be used to provide pricing and availability.


## A few terms and definitions

In the aviation industry, a flight is uniquely identified by it’s departure date and flight number, meaning, they together form the key of the entity.

A combination of several flights  is defined as an itinerary. For example, a roundtrip between Tel Aviv and Berlin is an itinerary.

An itinerary can also contain a connecting flight, a short layover(for our purposes, 6 hours or less) in an intermediary airport.


## Input data

Avaria has provided us with two Comma Separated Files(CSV). 

The first one(flights.csv) describes metadata of the flight, for example, the route (using airport codes assigned by IATA), departure time etc.

The second file(prices.csv) describes availability and pricing for each flight. 

Following are the details about the columns in each of them.

### flights.csv


Contains the following fields:
* Departure date, formatted as YYYY-MM-DD
* Flight Number (up to 4 digits)
* Departure airport code (3 upper case letters)
* Arrival airport code (3 upper case letters)
* Departure time, formatted according to ISO-8601( equivalent to https://docs.oracle.com/javase/8/docs/api/java/time/OffsetTime.html) 
* Duration of the flight in minutes

### prices.csv 


Contains the following fields:
* Departure date, formatted as YYYY-MM-DD
* Flight number (up to 4 digits)
* Number of seats available for sale (unsigned integer)
* Price of the flight (numeric). If zero, that means the flight cannot be sold.


## The Service

You need to design & build a REST service that provides the following functionality:

* /itinerary/priceWithConnection
    Given a date and two airports, return all possible one-way itineraries between the origin airport and the destination airport, including connecting flights(up to 2 layovers)
* /itinerary/priceAllRoundTrip (Bonus)
    Build all possible roundtrip itineraries between origin airport to the destination, which should include all date combinations
    Results should be batched(up to 50 results per line)  and streamed using JSON Lines: https://jsonlines.org/


The API Interface, including the parameters and the response types are described using swagger:

https://app.swaggerhub.com/apis/FarePlace/Airline_Test/1.0.0


## Implementation considerations

* You may use **any** programming language for this task, and you are free to use any suitable library or framework 
* While not mandatory, you are welcome to use open source databases such as MySQL, MongoDB, Redis etc.
* You should put an emphasis on efficacy and scalability(in terms of performance)
* To save time, there is no need to overinvest in extendability. 


## Submitting the assignment

Once you have completed the assignment, please create a zip/tarball of the source code and send it to us by email, along with instructions for running the project


## Final note

If you have any questions, remarks, or would like further clarification on the topic, please don't hesistate to get in touch with us.


Good luck!
