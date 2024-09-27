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

