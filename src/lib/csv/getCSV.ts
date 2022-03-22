import {parse} from 'papaparse';
import CSV from './CSV';

const getCSV = async <T>(file: File): Promise<CSV<T>> => {
  return new Promise<CSV<T>>((resolve, reject) => {
    parse<T>(file, {
	  header: true,
	  preview: 1,
	  complete: (results) => {
	    resolve(results);
	  },
	  error: (error) => {
	    reject(error);
	  }
    });
  })
};

export default getCSV;
