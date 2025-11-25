// src/app/(auth)/layout.tsx
import React from 'react';
import LoginHeader from '@/app/components/layout/LoginHeader';
import SimpleFooter from '@/app/components/layout/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            {/* Header luôn ở trên */}
            <LoginHeader />

            {/* Phần nội dung (Form) sẽ nằm ở giữa, flex-grow đẩy footer xuống đáy */}
            <main className="flex-grow flex items-center justify-center py-12 bg-white">
                {children}
            </main>

            {/* Footer luôn ở dưới */}
            <SimpleFooter />
        </div>
    );
}