import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '../globals.css';
import ReactQueryProvider from '@/helpers/providers';
import { Toaster } from 'react-hot-toast';
<Toaster position="bottom-center" />;
const inter = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agatha Christie Book Tracker',
  description: 'Track your Agatha Christie book collection',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'text-sm',
            }}
          />
          {children}
          {modal}
          <div id="modal-root" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
