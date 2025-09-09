import { toast } from 'sonner';

export const submitRegistrationNoCodeNonPristineError = () => {
  return toast.error(
    <div>
      Your Zoo Node is currently locked by existing keys, please restore
      your connection or reset your Zoo Node Storage
    </div>,
    { position: 'bottom-center' },
  );
};

export const submitRegistrationNoCodeError = () => {
  return toast.error(<div>Error connecting to your Zoo Node</div>, {
    position: 'bottom-center',
  });
};
