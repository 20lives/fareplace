const csvParser = (csv, keys) => csv.split('\n')
  .slice(0, -1)
  .map(
    line => line.split(',')
      .reduce((acc, cur, i) => ({ ...acc, [keys[i]]: cur }), {}),
  );

export default csvParser;
