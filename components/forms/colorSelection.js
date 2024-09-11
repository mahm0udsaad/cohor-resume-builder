import React from "react";

const ColorSelector = ({ colors, currentColor, onColorSelect }) => {
  return (
    <div className="flex space-x-2 my-4">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            currentColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
