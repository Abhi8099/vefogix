import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import { fetchMeta } from "../action";

const PrivacyPolicyPage = () => {
    return (
        <>
            <HeaderComp />
            <div className="flex flex-col items-center justify-center w-full h-full lg:px-16 md:px-12 px-6 my-10 md:my-15">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-8">
                    <h1 className="text-center text-3xl text-primary font-bold mb-6">Privacy Policy</h1>

                    <section className="text-gray-700 space-y-6">
                        <p>
                            This privacy policy outlines how we collect, use, store, and share your data while using our premium guest posting and backlink services. By using our website and services, you agree to the terms outlined below.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Data Collection</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Personal Information:</span> This includes your name, email, phone number, address, and other details you provide during registration or inquiries.</li>
                            <li><span className="font-semibold">Billing Information:</span> Invoice address and payment details necessary for completing transactions.</li>
                            <li><span className="font-semibold">Non-Personal Information:</span> Browser type, language, hardware specifications, and usage statistics to enhance user experience.</li>
                            <li><span className="font-semibold">Cookies and Tracking:</span> We use cookies to monitor your activity on our website. This data helps us improve website functionality and offer a personalized experience.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">How We Use the Collected Data</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Service Provision:</span> To register you, process transactions, deliver guest posting services, and ensure you receive relevant support.</li>
                            <li><span className="font-semibold">Personalisation:</span> Customising your experience and offering services suited to your preferences.</li>
                            <li><span className="font-semibold">Marketing:</span> With your consent, we may send you promotional emails or newsletters related to VefoGix services, updates, and blog posts.</li>
                            <li><span className="font-semibold">Analytics:</span> Non-personal data is used to analyse website usage patterns through tools like Google Analytics.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Data Storage</h2>
                        <p>
                            Your data is stored securely on our servers as long as you are an active user. We employ security measures to prevent unauthorized access and ensure compliance with relevant data protection laws.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Data Sharing</h2>
                        <p>
                            We do not sell or rent your data to third parties. However, we may share your data in certain cases, such as:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Legal Requirements:</span> We may disclose your information if required by law or to safeguard our legal rights.</li>
                            <li><span className="font-semibold">Service Providers:</span> We may share data with trusted third-party partners who assist us in delivering our services.</li>
                            <li><span className="font-semibold">Linked Websites:</span> Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external websites.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">User Rights</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Access Your Data:</span> Request a copy of the personal information we hold.</li>
                            <li><span className="font-semibold">Update Your Data:</span> Correct or update any incorrect personal details.</li>
                            <li><span className="font-semibold">Request Deletion:</span> Ask us to delete your personal details.</li>
                            <li><span className="font-semibold">Restrict Processing:</span> Limit how your data is processed.</li>
                            <li><span className="font-semibold">Withdraw Consent:</span> Revoke consent for marketing communications at any time by opting out via email.</li>
                        </ul>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Data Protection for Minors</h2>
                        <p>
                            Our services are intended for users aged 18 years and above. We do not purposely gather personal information from minors. If we discover that we have collected data from an individual under 16, we will promptly delete it from our records.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Data Security</h2>
                        <p>
                            We implement robust security measures, including encryption and access control, to protect your data from unauthorized access, alteration, or deletion. However, despite our best efforts, no system is entirely foolproof, and we cannot guarantee complete security.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Legal Compliance</h2>
                        <p>
                            We regularly review our privacy practices to ensure compliance with relevant data protection regulations. In the event of a dispute or data breach, we work closely with regulatory authorities to resolve any issues promptly.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Changes to Privacy Policy</h2>
                        <p>
                            We may modify this privacy policy occasionally. Any changes will be reflected on this page, and we encourage you to review the policy periodically. By continuing to use our website and services, you agree to any updates made to the privacy policy.
                        </p>
                    </section>

                    <section className="text-gray-700 space-y-6">
                        <h2 className="text-xl text-primary font-semibold">Contact Information</h2>
                        <p>If you have any questions, concerns, or feedback regarding this privacy policy, please contact us at:</p>
                        <ul className="list-none space-y-2">
                            <li><span className="font-semibold">Email:</span> <a href="mailto:support@vefogix.com" className="text-primary underline">support@vefogix.com</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <FooterFour />
        </>
    );
};

export default PrivacyPolicyPage;

export async function generateMetadata() {
    let metaTitle = "";
    let metaDescription = "";
    let metaKeyword = "";
    let index = true;

    try {
        const metaData = await fetchMeta("privacy-policy");
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
