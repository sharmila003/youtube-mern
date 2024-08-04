
const Sidebar = () => {
  return (
    <div className="flex flex-col w-12.1 bg-white text-black">
      <div className="p-4">
        <ul>
          <li className="mb-10">
            <img   className="w-5 h-5 mr-2"  src="https://cdn-icons-png.flaticon.com/128/3405/3405771.png "  alt="homeicon" />
            <a href="#" className=" text-xs hover:text-black ">
              Home
            </a>
          </li>
          <li className="mb-10">
          <img  className="w-5 h-5  mr-2" src="data:image/png;base64,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 "  alt="shortsicon" />
            <a href="#" className="text-xs hover:text-black">
              shorts
            </a>
          </li>
          <li className="mb-10">
          <img  className="w-5 h-5 mr-2" src="https://cdn.icon-icons.com/icons2/2248/PNG/512/youtube_subscription_icon_136007.png "  alt="subscriptionsicon" />
            <a href="#" className="text-xs hover:text-black">
              Subscriptions
            </a>
          </li>
          <li className="mb-10">
          <img  className="w-5 h-5 mr-2" src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17JDd8N7zKzSX8y6BCy27JYS40ZquKfLGQw&s "  alt="libraryicon" />
            <a href="#" className="text-xs hover:text-black">
              Library
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
