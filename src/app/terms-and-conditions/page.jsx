import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import { fetchMeta } from "../action";

const TermsConditionsPage = () => {
    return (
        <>
            <HeaderComp />
            <div className="flex flex-col items-center justify-center w-full h-full lg:px-16 md:px-12 px-6 my-10 md:my-15">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-8">
                    <h1 className="text-center text-3xl text-primary font-bold mb-6">Terms and Conditions</h1>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Agreement and Eligibility</h2>
                        <p>
                            Welcome to VefoGix! These Terms and Conditions outline the rules and regulations for using our website and services. By accessing and using our website, you agree to comply with these terms. If you do not agree with any part of these Terms and Conditions, please refrain from using our services.
                        </p>
                        <p>
                            We reserve the right to update these Terms and Conditions at any time without prior notice. It is your responsibility to review them regularly.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Account Restrictions:</span> Accounts are non-transferable. We reserve the right to suspend or terminate access if any suspicious or unlawful activity is detected.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Account Registration</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Accurate Information:</span> Ensure that the details you provide during registration are correct and up-to-date.</li>
                            <li><span className="font-semibold">Account Security:</span> You are responsible for maintaining the confidentiality of your account credentials. If there is any unauthorized use, please notify us immediately.</li>
                            <li><span className="font-semibold">Username Restrictions:</span> Usernames must not impersonate others or include offensive terms.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Purchasing Content</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Information Accuracy:</span> Provide accurate details to avoid delays or incorrect submissions.</li>
                            <li><span className="font-semibold">Feedback:</span> You have three days to review and request changes to the content. Only one revision request per article is allowed.</li>
                            <li><span className="font-semibold">Final Approval:</span> If no feedback is provided within three days, the content will be considered accepted, and payment will be released.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Refund Policy</h2>
                        <p>
                            Once payments are made for VefoGix services, they are final. However, if a mistake occurs, you may contact us within 30 days of payment to request a refund. <br /> <a href="/refund-policy" className="text-primary font-semibold">Refunds</a> will not be processed for any transactions older than 30 days.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Limitation of Liability</h2>
                        <p>
                            VefoGix is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">No Warranty</h2>
                        <p>
                            We make no guarantees regarding the accuracy or reliability of the information on our website. All content and services are provided as is, with no warranties, express or implied.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Indemnification</h2>
                        <p>
                            By agreeing to our terms, you agree to indemnify and hold VefoGix harmless from any claims or damages arising from your use of our services, including disputes with third parties.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. These are provided for convenience, but we do not endorse or take responsibility for the content of those websites.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Intellectual Property</h2>
                        <p>
                            All content on our website, including text, graphics, and software, is the property of VefoGix and is protected by copyright laws.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Usage Restrictions:</span> You may not copy or distribute any content without our consent.</li>
                            <li><span className="font-semibold">Limited License:</span> You are granted a limited license to use the content for personal purposes.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Site Access and Usage</h2>
                        <p>
                            VefoGix services are available only to users who are 18 years or older. Access to our site is for personal, non-commercial use. Any unauthorized use of the site will result in termination.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Contact Us for Assistance</h2>
                        <p>If you have any questions, please reach out to us:</p>
                        <ul className="list-none space-y-2">
                            <li><span className="font-semibold">Email:</span> <a href="mailto:support@vefogix.com" className="text-primary underline">support@vefogix.com</a></li>
                            <li><span className="font-semibold">WhatsApp:</span> <a href="tel:+918949272273" className="text-primary underline">+91-8949272273</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <FooterFour />
        </>
    );
};

export default TermsConditionsPage;

export async function generateMetadata() {
    let metaTitle = "";
    let metaDescription = "";
    let metaKeyword = "";
    let index = true;

    try {
        const metaData = await fetchMeta("terms-and-conditions");
        metaTitle = metaData.metaTitle || metaTitle;
        metaDescription = metaData.metaDescription || metaDescription;
        metaKeyword = metaData.metaKeywords || metaKeyword;
        index = metaData.index !== undefined ? metaData.index : index;
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
