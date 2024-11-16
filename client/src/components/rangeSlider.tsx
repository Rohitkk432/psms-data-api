import React from 'react';
import cn from 'classnames';

interface RangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, onChange, min, max, step, className }) => {
  const [minVal, maxVal] = value;

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(event.target.value);
    // Ensure min thumb stays at least one step below max thumb
    if (newMin <= maxVal - step) {
      onChange([newMin, maxVal]);
    } else {
      onChange([maxVal - step, maxVal]);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(event.target.value);
    // Ensure max thumb stays at least one step above min thumb
    if (newMax >= minVal + step) {
      onChange([minVal, newMax]);
    } else {
      onChange([minVal, minVal + step]);
    }
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(event.target.value);
    // Ensure the value is within bounds and at least one step below max
    if (!isNaN(newMin) && newMin >= min && newMin <= maxVal - step) {
      onChange([newMin, maxVal]);
    }
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(event.target.value);
    // Ensure the value is within bounds and at least one step above min
    if (!isNaN(newMax) && newMax <= max && newMax >= minVal + step) {
      onChange([minVal, newMax]);
    }
  };

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-[20rem] flex flex-col gap-4', className)}>
      <div className="relative h-8">
        {/* Base Track */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full pointer-events-none"
          onClick={(e) => e.preventDefault()}
        />
        
        {/* Colored Range */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full pointer-events-none"
          style={{
            left: `${getPercentage(minVal)}%`,
            width: `${getPercentage(maxVal) - getPercentage(minVal)}%`,
          }}
          onClick={(e) => e.preventDefault()}
        />

        {/* Min Range Input */}
        <input
            placeholder='Min'
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-blue-500
            [&::-moz-range-thumb]:cursor-pointer"
          style={{ zIndex: 1 }}
        />

        {/* Max Range Input */}
        <input
            placeholder='Max'
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-blue-500
            [&::-moz-range-thumb]:cursor-pointer"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Value Display with Inputs */}
      <div className='flex justify-between gap-4'>
        <input
            placeholder='Min'
          type="number"
          value={minVal}
          onChange={handleMinInputChange}
          min={min}
          max={maxVal - step}
          step={step}
          className="w-20 px-2 py-1 border rounded text-center text-black"
        />
        <input
            placeholder='Max'
          type="number"
          value={maxVal}
          onChange={handleMaxInputChange}
          min={minVal + step}
          max={max}
          step={step}
          className="w-20 px-2 py-1 border rounded text-center text-black"
        />
      </div>
    </div>
  );
};

export default RangeSlider;