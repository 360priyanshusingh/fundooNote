import { log } from 'winston';
import { client } from '../config/redisDb';
import HttpStatus from 'http-status-codes';

export const cacheDb = async (req, res, next) => {
  const data = await client.get('note_cache');

  if (data != null) {
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: JSON.parse(data),
      message: 'Notes fetched successfully from redis'
    });
  } else {
    next();
  }
};

export const cacheNoteById = async (req, res, next) => {
  const data = await client.get('note_cache');

  // console.log("This is the data ", data);

  if (data != null) {
    // Parse the stringified JSON data from Redis
    const parsedData = JSON.parse(data);

    console.log("Parsed data", parsedData);

    // Check if parsedData is an array before filtering
    if (Array.isArray(parsedData)) {
      const filteredData = parsedData.filter(value => value.id === req.params.id);

      if (filteredData.length > 0) {
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: filteredData,
          message: 'Notes fetched successfully from redis'
        });
      } else {
        // If no data found, call next middleware
        next();
      }
    } else {
      // If parsedData is not an array, call next middleware
      next();
    }
  } else {
    next();
  }
};



