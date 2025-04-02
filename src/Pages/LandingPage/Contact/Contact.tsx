import { IoMdSend } from "react-icons/io";

const Contact = () => {
  const title = "Liên hệ";
  const des = "Chúng tôi sẽ liên lạc lại trong thời gian sớm nhất";
  return (
    <section className="bg-border flex gap-4 justify-around p-4">
      <div>
        <h3 className="font-bold">{title}</h3>
        <p>{des}</p>
      </div>
      <form
        className="w-1/3 flex items-center justify-between bg-white rounded-3xl "
        action="">
        <div className="flex-1 h-full px-6  overflow-hidden">
          <input
            className="h-full w-full outline-none"
            type="text"
            placeholder="SDT..."
          />
        </div>
        <button
          className="p-3 rounded-full border border-grey-secondaryLight hover:bg-slate-300 hover:translate-x-1 transition-all"
          type="submit">
          <IoMdSend color="#949494" />
        </button>
      </form>
    </section>
  );
};

export default Contact;
