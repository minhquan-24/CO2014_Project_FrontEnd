import SmartNavbar from "@/app/components/layout/SmartNavbar";
import Footer from "@/app/components/layout/Footer";          

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <SmartNavbar />

            <main className="flex-1 bg-white">
                {children}
            </main>

            <Footer />
        </div>
    );
}