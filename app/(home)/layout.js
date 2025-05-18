import { NavBar } from './components/navbar';
import { Footer } from './components/footer';

export default function HomeLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
