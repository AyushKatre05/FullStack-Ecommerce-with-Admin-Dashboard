"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();
    if (res) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gray-50">
      <section className="w-full max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 py-12 lg:py-24 gap-5">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Discover Your Perfect Look
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl">
              Explore our wide range of fashion collections designed to make you
              stand out. From elegant dresses to casual wear, find the perfect
              outfit for every occasion.
            </p>
            <button
              onClick={() => router.push("/product/listing/all-products")}
              type="button"
              className="bg-black text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wider transition-transform transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <img
              src="/main.jpg"
              alt="Fashion Collection"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* About Us Section */}
        <div className="py-12 lg:py-24 bg-gray-200 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            At our fashion store, we are committed to bringing you the latest
            trends and styles. Our collections are carefully curated to offer a
            diverse range of fashion items that cater to different tastes and
            preferences. We believe in providing high-quality products at
            affordable prices, ensuring that everyone can enjoy the joy of
            fashion.
          </p>
        </div>

        {/* Shop by Category Section */}
        <div className="py-12 lg:py-24">
          <h2 className="text-3xl font-bold text-center mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/girls.jpg"
                alt="Women Category"
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Women
                </h3>
                <button
                  onClick={() => router.push("/product/listing/women")}
                  className="bg-white text-black px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/boys.jpg"
                alt="Men Category"
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Men</h3>
                <button
                  onClick={() => router.push("/product/listing/men")}
                  className="bg-white text-black px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg lg:col-span-2 lg:row-span-2">
              <img
                src="/kids.jpg"
                alt="Kids Category"
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Kids</h3>
                <button
                  onClick={() => router.push("/product/listing/kids")}
                  className="bg-white text-black px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner Section */}
        <div className="py-12 lg:py-24 bg-gray-200 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Exclusive Summer Collection
          </h2>
          <p className="text-gray-600 mb-6">
            Dont miss out on our exclusive summer collection. Fresh styles,
            amazing discounts, and unbeatable offers. Grab your favorites now!
          </p>
          <button
            onClick={() => router.push("/product/listing/all-products")}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105"
          >
            Shop Summer Collection
          </button>
        </div>

        {/* Customer Testimonials Section */}
        <div className="py-12 lg:py-24">
          <h2 className="text-3xl font-bold text-center mb-6">
            What Our Customers Are Saying
          </h2>
          <div className="flex lg:flex-row flex-col justify-around items-center">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-lg">
              <p className="text-gray-600 mb-4">
                "I absolutely love the fashion collections! The quality is
                top-notch, and the styles are always on trend. Highly
                recommend!"
              </p>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-gray-500">Fashion Enthusiast</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-lg">
              <p className="text-gray-600 mb-4">
                "A fantastic shopping experience! The customer service is
                excellent, and I always find something new and exciting."
              </p>
              <p className="font-semibold">John Smith</p>
              <p className="text-gray-500">Regular Customer</p>
            </div>
          </div>
        </div>

        {/* Our Blog Section */}
        <div className="py-12 lg:py-24 bg-gray-200 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">From Our Blog</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/blog1.jpg"
                  alt="Blog Post 1"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Summer Fashion Trends
              </h3>
              <p className="text-gray-600 mb-4">
                Stay ahead with the latest summer fashion trends. Discover
                what's hot this season and how to style your outfits.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105">
                Read More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/blog2.png"
                  alt="Blog Post 2"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">How to Accessorize</h3>
              <p className="text-gray-600 mb-4">
                Learn the art of accessorizing to elevate your outfits. Tips and
                tricks to make your accessories stand out.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105">
                Read More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/blog3.avif"
                  alt="Blog Post 3"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sustainable Fashion
              </h3>
              <p className="text-gray-600 mb-4">
                Explore sustainable fashion and how you can make eco-friendly
                choices without compromising on style.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="py-12 lg:py-24">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Have questions or need assistance? Our team is here to help! Reach
              out to us through any of the following methods:
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> support@fashionstore.com
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Address:</strong> 123 Fashion Street, New York, NY 10001
            </p>
            <form className="mt-8">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 mb-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-transform duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 mb-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-transform duration-300"
              />
              <textarea
                placeholder="Your Message"
                className="px-4 py-2 mb-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-transform duration-300"
                rows="4"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-full font-semibold transition-transform transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
