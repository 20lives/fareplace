# FarePlace - flights api

basic functionality to search a flight from a data source by given params.

## getting started

Make sure you have a recent node version installed (17+), also install a package manager (npm / yarn / pnpm)

1. clone this repository.
2. install dependencies: `npm install`
3. run the development server: `npm run dev` 
  * the script above  will trigger a development server on port 4040 that will automatically reload when detecting changes. 
4. to run linting use `npm run lint # yarn lint` or `npm run lint --fix` to automatically fix linting issue.

## API Endpoints

* GET /itinerary/priceWithConnection - Given a date and two airports, return all possible one-way itineraries between the origin airport and the destination airport, including connecting flights(up to 2 layovers)

```
curl -X 'GET' \
  'http://localhost:4040/priceWithConnection?from=JFK&to=MEX&date=2022-01-18' \ -H 'accept: application/json'
```

## What's missing / can be added & other notes
* type system and type validation: no input validations implemented. in addition using types might also help.
* csv is parsed each run, could be saved in any database.
* caching wasn't added.
* results are sent in json and not jsonl.
* `/itinerary/priceAllRoundTrip` was not added.
* no tests
* Unlimited layovers count is supported by configuration.
