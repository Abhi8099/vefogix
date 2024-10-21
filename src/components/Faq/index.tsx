"use client"
import type { CSSProperties } from 'react';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: 'What is the significance of off-page SEO and how does it benefit my business?',
        children: <p style={{ fontSize: '16px',fontWeight:'400' }}>Off-page optimisation is an SEO Practice that includes techniques like Guest posting, and link building to help boost your business by increasing your website’s visibility, driving targeted traffic, enhancing brand authority, and reputation and improving SEO with consistency.</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'How long does it take to see SEO results from link building?',
        children: <p style={{ fontSize: '16px',fontWeight:'400' }}>SEO results from backlinks can be different as it depends on various factors like link velocity, backlink relevance, indexing and quality. Generally, you can see improvements in your search engine rankings and traffic within 3 to 12 months. </p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: 'What types of websites do you target for guest posts?',
        children: <p style={{ fontSize: '16px',fontWeight:'400' }}>We target various types of reputable websites and blogs that align with your industry and audience. Our focus is on high-authority sites with strong domain authority and engaged readers. All we want is to get your guest posts to reach the right audience and contribute positively to your SEO efforts.</p>,
        style: panelStyle,
    },
    {
        key: '4',
        label: 'What should I expect in terms of communication and updates during the whole process?',
        children: <p style={{ fontSize: '16px',fontWeight:'400' }}>We are clear and timely in our communication of both link-building and guest posting. You will be regularly updated on the progress, where they have been placed, and how they are doing. Further, we do provide comprehensive reports related to key metrics like referral traffic and the impact of SEO so that you can stay updated about results and effectiveness.</p>,
        style: panelStyle,
    },
    {
        key: '5',
        label: 'Why should I choose Vefogix?',
        children: <p style={{ fontSize: '16px',fontWeight:'400' }}>Vefogix has great experience in converting off-page SEO needs into success statistics. We understand the importance of search engine optimization and how guest posting and link building are leading the list of proven strategies. 
        We ensure that nothing is left on the plate from our offering. Regardless of the package you choose, we offer you white-hat SEO practices, comprehensive reports and much more, which makes us a perfect backlink-building agency for you.</p>,
        style: panelStyle,
    },

];

const Faq: React.FC = () => {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 16,
        background: 'rgba(0, 0, 0, 0)',
        borderRadius: token.borderRadiusLG,
        border: 'none',

    };

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: 'rgba(0, 0, 0, 0)', fontSize: '20px', fontWeight:'600', }}
            accordion
            items={getItems(panelStyle)}
        />
    );
};

export default Faq;