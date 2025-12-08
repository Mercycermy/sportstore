const Privacy = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#F4F4F4]">
      <div className="bg-[#1A1A1A] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">
            Last updated: December 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including when you create an account, place an order, request a quote, subscribe to our newsletter, or contact us for support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This may include your name, email address, phone number, shipping address, payment information, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and inquiries</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              3. Information Sharing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, such as payment processors and shipping companies, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              6. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              7. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@dinksportswear.com" className="text-[#D92128] hover:underline">
                privacy@dinksportswear.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
