import React from 'react';
import useDarkMode from '@fisch0920/use-dark-mode';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={darkMode.disable}
        className={`p-2 rounded-full transition-colors duration-200 ${
          !darkMode.value ? 'bg-yellow-400 text-white' : 'text-gray-400 hover:bg-gray-200'
        }`}
        aria-label="Light mode"
      >
        <SunIcon className="h-5 w-5" />
      </button>
      <button
        onClick={darkMode.toggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${
          darkMode.value ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={darkMode.value}
      >
        <span
          className={`inline-block w-4 h-4 transform transition-transform duration-200 ease-in-out bg-white rounded-full ${
            darkMode.value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <button
        onClick={darkMode.enable}
        className={`p-2 rounded-full transition-colors duration-200 ${
          darkMode.value ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-200'
        }`}
        aria-label="Dark mode"
      >
        <MoonIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default DarkModeToggle;