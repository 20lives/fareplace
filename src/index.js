import { readFileSync } from 'fs';
import Koa from 'koa';
import bodyParser  from 'koa-bodyparser';
import { addMinutes } from 'date-fns';

import csvParser from './csvParser.js';
const flightsRaw = readFileSync('./flights.csv').toString();
const pricesRaw = readFileSync('./prices.csv').toString();

const MAX_LAYOVERS = 2;
const LAYOVERS_DIFF_IN_MIN = 24 * 60;

const flightsKeys = [
  'departureDate',
  'flightNumber',
  'from',
  'to',
  'departureTime',
  'duration',
];

const pricesKeys = [
  'departureDate',
  'flightNumber',
  'seatsAvailable',
  'price',
];

const prices = Object.fromEntries(
  csvParser(pricesRaw, pricesKeys).map(p => ([ `${p.departureDate}${p.flightNumber}`, p ])),
);

const getPrice = (date, flightNumber) => prices[`${date}${flightNumber}`];

const flights = csvParser(flightsRaw, flightsKeys)
  .map(f => {
    const departure = new Date(`${f.departureDate}:${f.departureTime}`);
    const arrival = addMinutes(departure, f.duration);

    const { departureTime, ...flight } = f;
    const { price, seatsAvailable } = getPrice(f.departureDate, f.flightNumber);
    return { ...flight, departure, arrival, price, seatsAvailable };
  });


const app = new Koa();
app.use(bodyParser());

function findDirectFlights(from, to, after, before) {
  return flights.filter(flight => {
    if (flight.departure <= after || flight.departure > before) {
      return false;
    }
    if (flight.from !== from) {
      return false;
    }
    if (flight.to !== to) {
      return false;
    }
    return true;
  })
}

const uniq = a => [ ...new Set(a) ];

function findFlights(from, to, after, before, maxLayover, prevList = []) {
  const direct = findDirectFlights(from, to, after, before).map(x => ([x]));

  let results = [ ...direct ];

  if (maxLayover == 0) {
    return results;
  }

  const fromAirport = flights.filter(flight => from == flight.from && to !== flight.to
    && (flight.departure < before && flight.departure > after)
  );

  const airports = uniq(fromAirport.map(x => x.to));

  airports.forEach(airport => {
    const fromAirportFlights = fromAirport.filter(f => f.to == airport && !prevList.includes(f.to))
    fromAirportFlights.forEach(f1 => {
      const layoverTime = addMinutes(f1.arrival, LAYOVERS_DIFF_IN_MIN)
      const nList = [ ...prevList, f1.from ];
      const c = findFlights(f1.to, to, f1.arrival, layoverTime, maxLayover - 1, nList);
      results = [ ...results, ...c.map(f2 => ([f1, ...f2]))];
    });
  });

  return results;
}

app.use(async ctx => {
  const { method, url, query } = ctx.request;
  if (url.startsWith('/itinerary/priceWithConnection?') && method == 'GET') {
    let { from, to, date } = query;
    from = from.toUpperCase();
    to = to.toUpperCase();
    const after = new Date(date);
    const before = addMinutes(after, 60 * 24);
    const results = findFlights(from, to, after, before, MAX_LAYOVERS).map(x => ({
      flights: x,
      totalPrice: x.reduce((acc, cur) => acc + Number(cur.price), 0),
    }));
    ctx.body = { results };
  }
  else {
    ctx.body = { message: 'unknown request', url };
  }
});

app.listen(4040);
