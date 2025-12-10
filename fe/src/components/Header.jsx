import { FaSearch, FaUser, FaMapMarkerAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function Header() {
    return (
        <>
            <div className="w-full bg-[#7a0000] text-white text-sm">
                <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="hidden sm:inline">About Us</span>
                        <span className="hidden md:inline">Customer Support</span>
                    </div>
                    <div className="text-center">Shop on the go, download our app. <u>Details</u></div>
                    <div className="w-24" />
                </div>
            </div>

            <header className="w-full bg-[#e11414]">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-3xl font-extrabold text-white">Clovers.</div>


                    {/* Icons row */}
                    <div className="flex items-center gap-6 text-white text-xl">
                        <FaSearch className="cursor-pointer" />
                        <FaMapMarkerAlt className="cursor-pointer" />
                        <FaHeart className="cursor-pointer" />
                        <FaShoppingCart className="cursor-pointer" />
                        <FaUser className="cursor-pointer" />
                    </div>
                </div>
            </header>

        </>
    );
}