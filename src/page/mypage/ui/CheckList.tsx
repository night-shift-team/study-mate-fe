import React from 'react';

interface CheckListProps {
  title: string;
}

const CheckList: React.FC<CheckListProps> = ({ title }) => {
  return (
    <div className="h-[30vh] w-[100%] rounded-xl bg-white shadow-xl">
      {title}
    </div>
  );
};

export default CheckList;
