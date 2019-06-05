import React from 'react';
import loading from './loading.gif';

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} />
    </div>
  );
}
