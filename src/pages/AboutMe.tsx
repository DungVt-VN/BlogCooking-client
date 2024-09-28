import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">About Me</h1>
                <p className="mt-4 text-lg text-gray-600">Welcome to [Your Website Name]!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src="/path-to-your-image.jpg"
                        alt="Profile"
                        className="rounded-full w-64 h-64 mx-auto md:mx-0 md:w-80 md:h-80 object-cover"
                    />
                </div>

                <div className="text-left space-y-6">
                    <p className="text-xl text-gray-700 leading-relaxed">
                        Hello! My name is <span className="font-bold">[Your Name]</span>, and I'm the creator behind this social platform
                        dedicated to sharing delicious recipes, culinary tips, and everything food-related. I’ve always been fascinated by
                        the world of cooking. Growing up, food was more than just sustenance—it was a way to connect with family and friends,
                        celebrate traditions, and explore new cultures.
                    </p>

                    <p className="text-xl text-gray-700 leading-relaxed">
                        After years of learning and experimenting in the kitchen, I wanted to create a space where others could share their
                        recipes, exchange ideas, and inspire each other. Whether you're a seasoned chef or a home cook just starting out, your
                        creations deserve to be shared!
                    </p>

                    <p className="text-xl text-gray-700 leading-relaxed">
                        I believe that cooking is more than just following a recipe—it’s about experimentation, joy, and sharing with others.
                        My mission is to build a supportive and inspiring space where everyone can share their love for food and grow their culinary skills.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What You’ll Find Here</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Recipes</h3>
                        <p className="text-gray-600">
                            Explore our growing database of recipes contributed by users like you. From quick meals to gourmet dishes, there's
                            something for everyone.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips & Tricks</h3>
                        <p className="text-gray-600">
                            Get advice from experienced cooks and learn new techniques to improve your culinary skills, no matter your level.
                        </p>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
                        <p className="text-gray-600">
                            Join our culinary community, connect with fellow food lovers, participate in discussions, and make friends who share your passion.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Let’s Connect!</h2>
                <p className="text-lg text-gray-600">
                    I’d love to hear from you! Whether you have a recipe to share, a question, or just want to say hi, feel free to reach out.
                    Join our growing community of food lovers and let's create something delicious together.
                </p>
                <a
                    href="/contact"
                    className="inline-block mt-8 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                >
                    Contact Me
                </a>
            </div>
        </div>
    );
};

export default AboutMe;
