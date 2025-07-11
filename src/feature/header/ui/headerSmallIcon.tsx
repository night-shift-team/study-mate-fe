export const HeaderSmallIcon = ({
  title,
  onClick,
  component,
}: {
  title: string;
  onClick: () => any;
  component: React.ReactNode;
}) => {
  return (
    <button
      title={title}
      className="rounded-2xl p-2 hover:bg-gray-100 hover:shadow-sm active:cursor-grabbing"
      onClick={onClick}
    >
      {component}
    </button>
  );
};
