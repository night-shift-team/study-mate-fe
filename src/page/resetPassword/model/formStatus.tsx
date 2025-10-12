'use client';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import ButtonPixel from '@/shared/button/buttonPixel';
import { useFormStatus } from 'react-dom';

const FormButtonPixel = ({ buttonText }: { buttonText: string }) => {
  const status = useFormStatus();
  return (
    <ButtonPixel type="submit" status={status.pending ? 'inactive' : 'default'}>
      {status.pending ? <Spinner color="black" /> : buttonText}
    </ButtonPixel>
  );
};
export default FormButtonPixel;
