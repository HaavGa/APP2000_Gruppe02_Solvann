import { Switch } from "@headlessui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Toggle = ({ disableCard, enabled, setEnabled }) => {
  return (
    <div className=" flex items-center justify-between gap-3 py-3 text-lg">
      <h2>{enabled ? "Pumpe ut:" : "Slippe inn:"}</h2>
      {enabled ? (
        <BsArrowRight className={"text-3xl text-yellow-500"} />
      ) : (
        <BsArrowLeft className={"text-3xl text-purple-500"} />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-yellow-500" : "bg-purple-500"}
                        relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${
                          disableCard
                            ? " pointer-events-none bg-gray-700/70"
                            : null
                        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-[24px]" : "translate-x-0"}
              pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                disableCard ? "pointer-events-none bg-gray-700/70" : null
              }`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
