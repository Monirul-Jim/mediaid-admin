import React from 'react';
import SalesActivity from '../../components/overview/SalesActivity';
import ProductsSummary from '../../components/overview/ProductsSummary';
import CustomerActivity from '../../components/overview/CustomerActivity';
import CompareActivity from '../../components/overview/CompareActivity';

const Overview = () => {
    return (
        <div className="py-4 px-2">
                <div className="grid lg:grid-cols-2 gap-3">
                    <SalesActivity></SalesActivity>
                    <ProductsSummary></ProductsSummary>
                    <CustomerActivity></CustomerActivity>
                    <CompareActivity></CompareActivity>
                </div>
        </div>
    );
};

export default Overview;