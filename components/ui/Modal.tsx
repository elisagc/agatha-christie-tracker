'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-x-4 w-full max-w-xl bg-white rounded-lg shadow-md mx-4 md:mx-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-300 rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            onClick={onDismiss}
          >
            <X />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
