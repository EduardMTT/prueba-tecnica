import { NavBar } from './components/navbar';

export default function HomeLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
