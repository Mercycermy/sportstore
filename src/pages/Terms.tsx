const Terms = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#F4F4F4]">
      <div className="bg-[#1A1A1A] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Terms & Conditions
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
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the Dink Sports Wear website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              2. Products and Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Dink Sports Wear manufactures and supplies professional sportswear, including custom team kits, training wear, and accessories. We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Modify or discontinue products without notice</li>
              <li>Limit quantities available for purchase</li>
              <li>Refuse service to anyone for any reason</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              3. Orders and Pricing
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For custom orders, a deposit may be required before production begins. The balance is due upon completion before shipping.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              4. Custom Orders
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Custom orders require approval of digital mockups and physical samples. Once production begins, changes cannot be made, and custom orders are non-refundable except in cases of manufacturing defects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The minimum order quantity (MOQ) for custom team kits is 10 units.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              5. Shipping and Delivery
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We ship internationally through our trusted partners. Delivery times are estimates and not guarantees. We are not responsible for delays caused by customs, weather, or other factors beyond our control.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              6. Returns and Refunds
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Due to the custom nature of our products, we generally do not accept returns or provide refunds. If you receive a defective product or an error was made in your order, please contact us within 7 days of delivery for resolution.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including logos, designs, text, and images, is the property of Dink Sports Wear and protected by copyright laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Dink Sports Wear shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              9. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of Ethiopia. Any disputes shall be resolved in the courts of Addis Ababa, Ethiopia.
            </p>
          </section>

          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              10. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms and Conditions, please contact us at{' '}
              <a href="mailto:legal@dinksportswear.com" className="text-[#D92128] hover:underline">
                legal@dinksportswear.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
