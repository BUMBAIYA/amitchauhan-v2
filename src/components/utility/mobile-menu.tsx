import { Dispatch, Fragment, SetStateAction } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";

import ThemeSwitch from "@/components/utility/theme-switch";
import { type NavbarProps } from "@/layout/navbar";
import { classNames } from "@/utility/classNames";

export interface MobileMenuProps extends NavbarProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  openMenu,
  routes,
  setOpenMenu,
}: MobileMenuProps) {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setOpenMenu(false);
    router.push(href);
  };

  return (
    <Transition show={openMenu} as={Fragment}>
      <Dialog as="div" className="z-50" onClose={setOpenMenu}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 bottom-full"
            enterTo="opacity-100 bottom-[15%]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 bottom-[15%]"
            leaveTo="opacity-0 bottom-full"
          >
            <Dialog.Panel className="pointer-events-none absolute flex min-h-[85%] w-full flex-col items-center justify-center overflow-y-auto rounded-b-2xl border-2 border-accent/20 bg-background px-6 py-8 text-accent shadow-lg shadow-accent/10 md:px-10 md:py-16">
              <div className="pointer-events-auto flex flex-col items-center gap-6 text-center">
                {routes.map((link, i) => (
                  <button
                    key={i}
                    className="group relative py-2 text-3xl font-medium"
                    onClick={() => handleClick(link.href)}
                  >
                    <span
                      className={classNames(
                        pathName === link.href ? "w-full" : "w-0",
                        "absolute -bottom-1 left-0 h-1 rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full",
                      )}
                    ></span>
                    {link.title}
                  </button>
                ))}
                <ThemeSwitch setClose={setOpenMenu} />
              </div>
              <div className="absolute bottom-0 py-6">©2023 Amit Chauhan</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
