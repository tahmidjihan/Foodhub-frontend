import Form from '../form';

export default function app() {
  return (
    <div className='dark flex min-h-screen items-center justify-center bg-background text-foreground'>
      <div className='relative flex flex-1 flex-col justify-center px-4 py-10 lg:px-6'>
        <Form />
      </div>
    </div>
  );
}
