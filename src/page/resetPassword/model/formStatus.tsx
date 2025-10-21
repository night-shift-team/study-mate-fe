'use client';
import { PageLoader } from '@/feature/spinner/ui/pageLoader';
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
      {status.pending ? <PageLoader color="black" /> : buttonText}
    </ButtonPixel>
  );
};
export default FormButtonPixel;
