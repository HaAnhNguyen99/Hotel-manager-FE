import MapForm from "./MapForm";

const Map = () => {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.20375390252934!2d106.62303062142911!3d10.78625433325146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c04743dba91%3A0x214a409bc7700c20!2zS2jDoWNoIFPhuqFuIFBoxrDGoW5nIFRyYW5n!5e0!3m2!1svi!2s!4v1743683210062!5m2!1svi!2s";

  return (
    <div className="flex flex-col lg:flex-row dark:bg-transparent text-white lg:w-1/2 h-[50vh] max-h-[70vh] md:max-h-[50vh]lg:gap-10 relative lg:p-8">
      {/* Map Container */}
      <div className="relative z-20 w-full lg:w-2/5 h-full lg:aspect-[3/4] shadow-md lg:after:contents-[''] lg:after:w-full lg:after:h-full lg:after:absolute lg:after:opacity-50 lg:after:left-5 lg:after:top-5 lg:after:bg-landing-bgBlack lg:after:z-10">
        <iframe
          className="absolute inset-0 w-full h-full z-20 overflow-hidden shadow-md"
          src={mapEmbedUrl}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Phuong Trang Hotel Location"
        />
        {/* Decorative Overlay (Visible on large screens) */}
        <div className="hidden lg:block absolute inset-8 bg-red-500 opacity-50 rounded-md pointer-events-none" />
      </div>

      {/* Contact Form */}
      <MapForm />
    </div>
  );
};

export default Map;
