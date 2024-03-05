import React, {useState, useEffect} from 'react';
import TotalCountItem from '../UI/TotalCountItems/TotalCountItems';
import {locale} from '../../config';

const TotalCount = ({visits}) => {
    function calculateAggregatedStats(visits) {
        const intermediateResult = {
            totalPayments: 0,
            totalDeliveries: 0,
            totalVisits: 0,
            averageBill: 0,
            totalDebt: 0,
        };
        let totalAmount = 0;
        if (!visits?.length) {
            return intermediateResult;
        }
        visits.map((visit) => {
            intermediateResult.totalPayments += visit.paid;
            intermediateResult.totalDebt += visit.debt;
            if (visit.type === 'visit') {
                intermediateResult.totalVisits += 1;
            } else if (visit.type === 'delivery') {
                intermediateResult.totalDeliveries += 1;
            }
            totalAmount += visit.amount;
        });
        intermediateResult.averageBill = totalAmount / visits.length;
        return intermediateResult;
    }
    const [aggregatedStats, setAggregatedStats] = useState(calculateAggregatedStats(visits));

    useEffect(() => {
        const res = calculateAggregatedStats(visits);
        setAggregatedStats(res);
    }, [visits]);

    const formatMoney = (amount) => Intl.NumberFormat(locale).format(amount);
    return (
        <div className="box p-4 box-width-one-third">
            <div className="container">
                <div className="flex ">
                    <TotalCountItem
                        label="Все оплаты"
                        value={`${formatMoney(aggregatedStats.totalPayments)} сум`}
                        subVariant="display-2"
                    />
                </div>
                <div className="flex justify-between">
                    <TotalCountItem
                        label="Доставка"
                        value={formatMoney(aggregatedStats.totalDeliveries)}
                        subVariant="subheader-2"
                        className="w-2/5"
                    />
                    <TotalCountItem
                        label="Посещений"
                        value={formatMoney(aggregatedStats.totalVisits)}
                        subVariant="subheader-2"
                        className="w-2/5"
                    />
                </div>
                <div className="flex justify-between">
                    <TotalCountItem
                        label="Средний счет"
                        value={`${formatMoney(aggregatedStats.averageBill)} сум`}
                        subVariant="subheader-2"
                        className="w-2/5"
                    />
                    <TotalCountItem
                        label="Долг"
                        value={`${formatMoney(aggregatedStats.totalDebt)} сум`}
                        color="danger"
                        subVariant="subheader-2"
                        className="w-2/5"
                    />
                </div>
            </div>
        </div>
    );
};

export default TotalCount;
