import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/about" className="text-gray-400 hover:text-white">About</a>
                    <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                    <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
