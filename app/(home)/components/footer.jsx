import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialInstagram } from 'react-icons/sl';
import { SlSocialLinkedin } from 'react-icons/sl';
import { SlSocialGithub } from 'react-icons/sl';
import { SlSocialTwitter } from 'react-icons/sl';

export function Footer() {
  return (
    <footer className="title text-white py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center sm:items-start w-full gap-5">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Logo.png"
                width={100}
                height={40}
                alt="logo"
                className="bg-blue"
              />
              <h3 className="text-xl font-semibold">Hotel Punta de Mita</h3>
            </div>

            <p className="text-gray-300 max-w-xs text-center sm:text-left">
              Transformando tu experiencia con servicios de alta calidad y
              habitaciones excepcionales.
            </p>
          </div>

          <div className="flex flex-col w-full sm:pl-9">
            <div className="flex flex-row justify-center sm:justify-start p-7 items-center gap-3">
              <div>
                <Link href="#">
                  <SlSocialFacebook
                    className="text-white transition hover:text-blue-400
                   size-5"
                  />
                </Link>
              </div>
              <div>
                <Link href="#">
                  <SlSocialInstagram className="text-white transition hover:text-pink-700 size-5" />
                </Link>
              </div>
              <div>
                <Link href="#">
                  <SlSocialLinkedin className="text-white transition hover:text-blue-400 size-5" />
                </Link>
              </div>
              <div>
                <Link href="#">
                  <SlSocialGithub className="text-white transition hover:text-purple-700 size-5" />
                </Link>
              </div>
              <div>
                <Link href="#">
                  <SlSocialTwitter className="text-white transition hover:text-cyan-500 size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-start">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold pb-2">Enlaces rápidos</h3>
            <div className="bg-gradient-to-l from-cyan-300 to-blue-600 w-full h-1 rounded" />
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Habitaciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex justify-center sm:justify-start">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold pb-2">Nuestros servicios</h3>

            <div className="bg-gradient-to-l from-cyan-300 to-blue-600 w-full h-1 rounded" />
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Atencion a habitacion
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Tratamientos faciales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/manicure"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Buffet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/cabello"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Estilismo de cabello
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/spa"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Servicios de spa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/cursos"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Gimnasio y asesoria
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex justify-center sm:justify-start">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold pb-2">Contáctanos</h3>

            <div className="bg-gradient-to-l from-cyan-300 to-blue-600 w-full h-1 rounded" />
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. HotelW 123, Zona Hotelera, Ciudad Playa, 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">info@hotelw.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
