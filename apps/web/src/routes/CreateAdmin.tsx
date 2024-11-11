import { CreateAdminForm } from '@/components/form/create-admin-form';

export const CreateAdmin: React.FC = () => {
  return (
    <section className="bg-card rounded-xl p-5 h-full overflow-auto">
      <CreateAdminForm />
    </section>
  );
};
