

import {months} from '../AppConfig';

// Helper methods
export const getPrettyDate = (date) => {
  date = date.split(' ')[0];
  const newDate = date.split('-');
  const month = months[parseInt(newDate[1])];
  return `${month} ${newDate[2]}, ${newDate[0]}`;
}

// Remove the seconds from the time
export const getPrettyTime = (date) => {
  const time = date.split(' ')[1].split(':');
  return `${time[0]}:${time[1]}`;
}

export const setInSessionStorage = (item, value) => {
	if(typeof value === 'object') {
		sessionStorage.setItem(item, JSON.stringify(value))
	} else {
		sessionStorage.setItem(item, value)
	}
}

export const getFromSessionStorage = (item) => {
	return JSON.parse(sessionStorage.getItem(item));
}

export const setInLocalStorage = (item, value) => {
	if(typeof value === 'object') {
		localStorage.setItem(item, JSON.stringify(value));
	} else {
		localStorage.setItem(item, value);
	}
}

export const getFromLocalStorage = (item) => {
	return JSON.parse(localStorage.getItem(item));
}
