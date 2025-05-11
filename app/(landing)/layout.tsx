import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
