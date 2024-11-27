export default function AboutPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About AIGI Gift Finder</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Welcome to AIGI Gift Finder, your AI-powered companion in the
            journey of finding the perfect gift for your loved ones.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            We believe that every gift should be meaningful and personal. Our
            platform combines artificial intelligence with human curation to
            help you discover thoughtful gifts that will bring joy to your
            recipients.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <p className="mb-6">
            Our platform offers two ways to find the perfect gift:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>Curated Gift Profiles:</strong> Browse our handpicked
              collection of gift suggestions for specific occasions and
              interests.
            </li>
            <li className="mb-2">
              <strong>AI Gift Finder:</strong> Use our intelligent
              recommendation system to get personalized gift suggestions based
              on your specific requirements.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Affiliate Partnerships
          </h2>
          <p className="mb-6">
            We participate in affiliate programs, including the Amazon
            Associates Program. As an Amazon Associate, we earn from qualifying
            purchases at no additional cost to you. This helps us maintain and
            improve our platform while continuing to offer a range of free
            services, including personalized gift suggestions.
          </p>
          <p className="mb-6">
            Please note that while our basic gift suggestion service is free, we
            also offer premium features such as saving profiles, accessing
            exclusive recommendations, and additional customization options.
            Revenue from affiliate partnerships and paid features supports our
            mission to simplify gift-giving with personalized, high-quality
            recommendations tailored to your needs.
          </p>
          <p className="mb-6">
            Affiliate partnerships do not influence the integrity of our
            recommendations. All products are carefully curated to ensure
            relevance and quality.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>Quality:</strong> We carefully curate and verify all gift
              suggestions.
            </li>
            <li className="mb-2">
              <strong>Transparency:</strong> We're always clear about our
              affiliate relationships.
            </li>
            <li className="mb-2">
              <strong>Privacy:</strong> We respect and protect your personal
              information.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
