import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import { fetchMeta } from "../action";

const RefundPolicyPage = () => {
  return (
    <>
      <HeaderComp />
      <div className="flex flex-col items-center justify-center w-full h-full lg:px-16 md:px-12 px-6 my-10 md:my-15">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-8">
          <h1 className="text-center text-3xl text-primary font-bold mb-6">Refund Policy</h1>
          <h3 className="text-center text-lg font-medium">In the following situations, an advertiser could receive a refund:</h3>
          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">30-Day Blog Replacement Guarantee</h2>
            <p>
              To ensure your satisfaction, VefoGix provides a 30-day blog replacement guarantee. If any blog post goes down or experiences issues within 60 days of its launch, we will replace it with a blog post of similar Domain Authority (DA) and pricing.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Eligibility:</span> The replacement guarantee is valid if the blog goes down within 60 days of publication.
              </li>
              <li>
                <span className="font-semibold">Replacement Options:</span> Clients can choose a replacement blog of similar rank and pricing.
              </li>
              <li>
                <span className="font-semibold">No Monetary Refunds:</span> Monetary returns are not offered after 24 hours of the post going live.
              </li>
            </ul>
          </section>

          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">No Refunds for Service Cancellations</h2>
            <p>
              We encourage clients to understand the service agreement before purchasing. Refunds are not available after an agreement is signed, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Transaction fees, gateway or processing charges</li>
              <li>Funds spent on content promotion or positioning</li>
              <li>Services already fully delivered</li>
              <li>Miscellaneous non-refundable charges related to the order</li>
            </ul>
          </section>

          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">Content Charges</h2>
            <p>
              Content creation charges are non-refundable once the content is written, even if the order is cancelled before publication. The refund policy only applies to blog placement, not content creation.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Non-refundable content creation fees</li>
              <li>Blog placement eligible for replacement but non-refundable after 24 hours</li>
            </ul>
          </section>

          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">Custom Refund Policy for Each Service</h2>
            <p>
              Different services have their own refund policies. Please review the service agreements for refund details for each service before placing your order.
            </p>
          </section>

          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">Modifications to the Refund Policy</h2>
            <p>
              We reserve the right to update this policy at any time. Clients are responsible for reviewing the latest revisions to stay informed of any changes.
            </p>
          </section>

          <section className="text-gray-700 space-y-6">
            <h2 className="text-xl text-primary font-semibold">Contact Us for Assistance</h2>
            <p>If you have any questions or need assistance, please reach out to us:</p>
            <ul className="list-none space-y-2">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:support@vefogix.com" className="text-primary underline">
                  support@vefogix.com
                </a>
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a href="tel:+918949272273" className="text-primary underline">
                  +91-8949272273
                </a>
              </li>
            </ul>
            <p>
              We are committed to providing outstanding support and ensuring a seamless experience for our clients.
            </p>
          </section>
        </div>
      </div>
      <FooterFour />
    </>
  );
};

export default RefundPolicyPage;

export async function generateMetadata() {
  let metaTitle = '';
  let metaDescription = '';
  let metaKeyword = '';
  let index = false;
  try {
    const metaData = await fetchMeta("refund-policy");

    // Set metadata based on the fetched data
    metaTitle = metaData.metaTitle || metaTitle;
    metaDescription = metaData.metaDescription || metaDescription;
    metaKeyword = metaData.metaKeywords || metaKeyword;
    index = metaData.index;
  } catch (error) {
    console.error('Error fetching meta data:', error);
  }
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeyword,
    robots: index ? 'index,follow' : 'noindex,nofollow',
  };
}
