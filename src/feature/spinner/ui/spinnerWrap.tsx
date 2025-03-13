import {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import hash from 'object-hash';

const WrapSpinner = ({
  value,
  children,
}: {
  value: any[];
  children: JSX.Element;
}) => {
  const prevValue = useRef(value);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (prevValue.current === value) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [hash(value)]);

  return <>{isLoading ? <PulseLoader /> : children}</>;
};

export default WrapSpinner;
