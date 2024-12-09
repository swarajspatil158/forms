import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import PlusIcon from './Icons/PlusIcon';
import { Button } from './ui/button';
import CircleIcon from './Icons/CircleIcon';

const DynamicInputs = () => {
  const [inputs, setInputs] = useState(['']);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="flex flex-col space-y-2 w-full mt-2.5">
      {inputs.map((value, index) => (
        <div key={index} className="flex items-center space-x-2 ">
            <CircleIcon className='text-muted-foreground ' strokeWidth={3}/>
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="flex-grow"
            placeholder="Option"
          />
          {index === inputs.length - 1 && (
            <Button 
              onClick={addInput}
            variant='ghost'
            size='icon'
            className='flex-1'
            >
              <PlusIcon/>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;