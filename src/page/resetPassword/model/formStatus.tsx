'use client';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';
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
      {status.pending ? (
        <div className="mb-[0.5px]">
          <ComponentLoader />
        </div>
      ) : (
        buttonText
      )}
    </ButtonPixel>
  );
};
export default FormButtonPixel;
