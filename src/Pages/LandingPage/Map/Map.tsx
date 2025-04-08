import { CalendarCheck2, MapPin, Phone } from 'lucide-react';

const Map = () => {
  const sdt = '0968127409';
  const address = '53 Lê Vĩnh Hòa, Phường Phú Thọ Hòa, Quận Tân Phú, TP HCM';

  return (
    <section className="bg-neutral-400 dark:bg-transparent text-white p-20 flex flex-col items-center md:flex-row gap-10">
      <div className="w-full md:w-1/2 h-[50vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.20375390252934!2d106.62303062142911!3d10.78625433325146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c04743dba91%3A0x214a409bc7700c20!2zS2jDoWNoIFPhuqFuIFBoxrDGoW5nIFRyYW5n!5e0!3m2!1svi!2s!4v1743683210062!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="w-full md:w-1/2 space-y-5 px-20">
        <h3 className="relative font-bold text-2xl text-center mb-10 after:contents-[''] after:w-full after:h-1 after:left-0 after:bg-black after:rounded-md after:bottom-3">
          Khách sạn Phương Trang
        </h3>
        <h3 className="flex gap-2">
          <span className="font-bold flex gap-2">
            <Phone />
            SĐT:{' '}
          </span>

          {sdt}
        </h3>
        <div>
          <div className="flex gap-2">
            <span className="font-bold">
              <MapPin />
            </span>
            <div>
              <p>{address}</p>
            </div>
          </div>
        </div>
        <p className="flex gap-2">
          <span>
            <CalendarCheck2 />
          </span>
          Mở cửa 24/24
        </p>
      </div>
    </section>
  );
};

export default Map;
