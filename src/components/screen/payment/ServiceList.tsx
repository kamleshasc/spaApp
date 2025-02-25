import React from 'react';
import ServiceItem from './ServiceItem';

type ServiceItem = {
  serviceName: string;
  category: string;
  price: number;
};

type ServiceListProps = {
  serviceData: ServiceItem[];
};

const ServiceList = ({serviceData}: ServiceListProps) => {
  return (
    <>
      {serviceData.map((item: ServiceItem, index: any) => (
        <ServiceItem
          key={index}
          service={item?.serviceName}
          category={item?.category}
          price={item?.price}
        />
      ))}
    </>
  );
};

export default ServiceList;
