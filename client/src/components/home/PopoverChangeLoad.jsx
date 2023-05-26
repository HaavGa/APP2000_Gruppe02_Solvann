import { Popover } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const PopoverChangeLoad = ({ number, allowNumbers }) => {
  return (
    <Popover className="relative flex justify-end">
      {({ open }) => (
        <>
          <Popover.Button
            className={
              "flex -translate-y-1 items-center gap-x-2 rounded-md border-2 border-black py-1 px-2"
            }
          >
            <span>Endre</span>
            <BsChevronDown
              className={
                open ? "rotate-180 transform transition" : "transition"
              }
            />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 translate-y-12 -translate-x-7">
            <div className="overflow-hidden rounded-lg border-2 border-black shadow-lg">
              <form className="flex h-[11rem] w-[15rem] flex-col bg-white p-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="load" className="text-2xl">
                    Gi verdi [0-100]:
                  </label>
                  <input
                    id="load"
                    name="load"
                    className="h-20 w-20 rounded-md border-2 border-black text-center text-5xl focus:outline-none"
                    value={number}
                    maxLength={2}
                    onChange={allowNumbers}
                  />
                </div>
                <div>
                  <button className="mt-5 w-full rounded-lg border-2 border-gray-500 bg-gray-300 py-1 text-xl font-semibold  hover:bg-gray-400">
                    Lagre
                  </button>
                </div>
              </form>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default PopoverChangeLoad;
