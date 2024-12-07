'use client';

import React from 'react';

const Search = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for skills..."
        className="w-full p-4 rounded-lg border"
      />
    </div>
  );
};

export default Search;
