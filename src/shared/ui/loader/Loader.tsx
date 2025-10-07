interface LoaderProps {
  type?: "regular" | "full_width" | "fit";
}
const Loader = ({ type = "regular" }: LoaderProps) => {
  let loaderClass = "";
  if (type === "regular") {
    loaderClass = "normal";
  } else if (type === "full_width") {
    loaderClass =
      "fixed h-screen w-full left-0 bottom-0 flex justify-center items-center";
  } else if (type === "fit") {
    loaderClass =
      "absolute h-[100%] w-[100%] left-0 top-0 flex justify-center items-center";
  } else {
    loaderClass = "normal";
  }
  return (
    <div className={`${loaderClass}`}>
      <div className="flex">
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full absolute
    border-8 border-solid border-gray-200"
          ></div>

          <div
            className="w-12 h-12 rounded-full animate-spin absolute
    border-8 border-solid border-purple-500 border-t-transparent"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
