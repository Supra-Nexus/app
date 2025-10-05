import { toast } from 'sonner';

export const submitRegistrationNoCodeNonPristineError = () => {
  return toast.error(
    <div>
      Your Supra Node is currently locked by existing keys, please restore
      your connection or reset your Supra Node Storage
    </div>,
    { position: 'bottom-center' },
  );
};

export const submitRegistrationNoCodeError = () => {
  return toast.error(<div>Error connecting to your Supra Node</div>, {
    position: 'bottom-center',
  });
};
