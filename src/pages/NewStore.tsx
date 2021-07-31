import { StoreCreator } from '../components/store/StoreCreator';

export const NewStore = () => {
  return (
    <div>
      <h3 className="w-100 text-center m-3">New Store</h3>
      <StoreCreator />
    </div>
  );
};
