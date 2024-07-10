import React, { HTMLAttributes, Ref, forwardRef } from 'react';
import JsonPathViewer from '../lib';

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

const CustomInput = forwardRef(
  (props: HTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => (
    <input {...props} ref={ref} />
  )
);

export default function App() {
  return (
    <div>
      <JsonPathViewer
        component={CustomInput}
        highlightColor="pink"
        json={json}
      />
      <JsonPathViewer highlightColor="pink" json={json} />
    </div>
  );
}
