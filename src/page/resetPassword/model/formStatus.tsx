'use client';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import ButtonPixel from '@/shared/button/buttonPixel';
import { useFormStatus } from 'react-dom';

const FormButtonPixel = ({
  buttonText,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { buttonText: string }) => {
  const status = useFormStatus();
  return (
    <ButtonPixel
      type="submit"
      status={status.pending ? 'inactive' : 'default'}
      {...props}
    >
      {status.pending ? <Spinner color="black" /> : buttonText}
    </ButtonPixel>
  );
};
export default FormButtonPixel;
