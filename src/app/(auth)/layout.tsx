// src/app/auth/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Render nội dung của page.tsx vào đây */}
      {children} 
    </section>
  );
}