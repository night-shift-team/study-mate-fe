const PageAnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full animate-fade-in flex-col justify-center duration-100">
      {children}
    </div>
  );
};
export default PageAnimationWrapper;
