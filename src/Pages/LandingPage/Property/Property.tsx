import { Bath, BedSingle, Car, PawPrint } from "lucide-react";
import React from "react";

const Property = () => {
  const title = "Apartment Description";
  const des = "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.";
  const data = [
    {
      icon: Car,
      text: "Lorem Ipsum",
    },
    {
      icon: BedSingle,
      text: "Lorem Ipsum",
    },
    {
      icon: PawPrint,
      text: "Lorem Ipsum",
    },
    {
      icon: Bath,
      text: "Lorem Ipsum",
    },
  ];
  return (
    <section className="px-4 py-4">
      <div className="p-5">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="text-grey-secondaryLight">{des}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-10 flex-wrap p-5 items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex rounded-lg w-2/5 bg-slate-400 flex-col justify-center items-center py-8">
              <item.icon className="w-9 h-9 mb-2" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="h-50vw rounded-2xl bg-slate-700 w-1/2"></div>
      </div>
    </section>
  );
};

export default Property;
