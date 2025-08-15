// app/layout.tsx
import './globals.css';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}