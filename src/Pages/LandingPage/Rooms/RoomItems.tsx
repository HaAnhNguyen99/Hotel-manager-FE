const RoomItems = () => {
  const data = [
    { src: '#', title: '' },
    { src: '#', title: '' },
    { src: '#', title: '' },
  ];
  return (
    <div className="flex gap-20 bg-white dark:bg-transparent mt-20">
      {data.map((item, index) => (
        <div key={index} className="h-[60vh] w-full rounded-2xl overflow-hidden">
          <div className="h-full w-full bg-slate-300">
            <img src={item.src} alt={item.title} />
          </div>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomItems;
