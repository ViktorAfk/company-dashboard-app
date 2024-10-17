import { Link } from 'react-router-dom';

export function App() {
  return (
    <section className="flex justify-center items-center h-dvh bg-secondary">
      <div className="flex flex-col gap-16 md:flex-row">
        <Link
          to="/sign-in"
          className="flex justify-center items-center w-80 h-56 text-primary bg-white rounded-sm text-5xl transition-all hover:scale-110 hover:bg-muted-foreground hover:text-white active:translate-y-1"
        >
          Sign in
        </Link>
        <Link
          to="/sign-up"
          className="flex justify-center items-center w-80 h-56 text-white bg-primary rounded-sm text-5xl transition-transform hover:scale-110  hover:bg-muted-foreground active:translate-y-1"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}
