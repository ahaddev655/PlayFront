import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

function User_Footer() {
  return (
    <footer className="section py-8 bg-gray-900 text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Brand / About */}
        <div className="space-y-3 col-span-2">
          <h2 className="text-3xl font-semibold text-white">PlayFront</h2>
          <p className="text-gray-400 leading-relaxed">
            PlayFront is a dynamic gaming store offering the latest games,
            accessories, and exclusive gamer deals.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {[
              {
                icon: <FaInstagram className="w-5 h-5" />,
                link: "https://instagram.com",
              },
              {
                icon: <FaLinkedin className="w-5 h-5" />,
                link: "https://linkedin.com",
              },
              {
                icon: <FaYoutube className="w-5 h-5" />,
                link: "https://youtube.com",
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-red-600/20 hover:text-red-600 transition-colors w-10 h-10 rounded-md grid place-items-center"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["About Us", "Shop", "Latest Deals", "Contact Us", "FAQ"].map(
              (item, idx) => (
                <li
                  key={idx}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Support</h3>
          <ul className="space-y-2">
            {[
              "Returns & Refunds",
              "Shipping Policy",
              "Privacy Policy",
              "Terms of Service",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter or Contact Form */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-white mb-3">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-400 mb-3">
            Get updates on new games, deals, and exclusive offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} PlayFront. All rights reserved.
      </div>
    </footer>
  );
}

export default User_Footer;
