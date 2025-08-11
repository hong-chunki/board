import { redirect } from 'next/navigation';
import RegisterForm from '@/app/_components/RegisterForm';

import { post } from '@/app/_lib/fetch';

export default function RegisterFormPage() {

  return (
    <RegisterForm></RegisterForm>
  );
}