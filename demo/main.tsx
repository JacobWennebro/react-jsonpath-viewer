import React from 'react';
import ReactDOM from 'react-dom/client';
import JsonPathViewer from '../dist/jpv';

const json = {
  name: 'Chris',
  age: 23,
  address: {
    city: 'New York',
    country: 'America',
  },
  friends: [
    {
      name: 'Emily',
      hobbies: ['biking', 'music', 'gaming'],
    },
    {
      name: 'John',
      hobbies: ['soccer', 'gaming'],
    },
  ],
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JsonPathViewer highlightColor="pink" json={json} />
  </React.StrictMode>
);