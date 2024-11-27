export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">Last updated: February 14, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              When you use our AI Gift Recommendation Form, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Gift recipient information</li>
              <li>Occasion details</li>
              <li>Interest preferences</li>
              <li>Budget ranges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Generate personalized gift recommendations</li>
              <li>Improve our recommendation algorithm</li>
              <li>Enhance user experience</li>
              <li>Analyze usage patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <p className="mb-4">
              All data is stored securely and encrypted. We retain information
              only as long as necessary to provide our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Affiliate Links</h2>
            <p className="mb-4">
              Our platform participates in affiliate programs, including the
              Amazon Associates Program. As an Amazon Associate, we earn from
              qualifying purchases made through affiliate links at no additional
              cost to you. This revenue helps support our platform and ensures
              we can continue to provide both free services and optional paid
              features.
            </p>
            <p className="mb-4">
              Free features include a limited number of personalized gift
              suggestions powered by AI. For additional suggestions, users can
              purchase tokens to unlock more recommendations. Paid features,
              such as saving profiles and accessing exclusive recommendations,
              are also available for users seeking further customization and
              benefits. Please note that affiliate partnerships do not influence
              the integrity of our recommendations, as we strive to suggest the
              most relevant and high-quality products for your needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Opt-out of data collection</li>
              <li>Request data correction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              For any privacy-related questions or concerns, please contact us
              at:
              <br />
              Email: contact.visdak@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
