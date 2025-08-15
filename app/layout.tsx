// app/layout.tsx
import './globals.css';
import 'swiper/css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}