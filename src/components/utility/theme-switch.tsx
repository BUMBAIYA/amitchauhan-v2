import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export interface ThemeSwitchProps {
  setClose?: Dispatch<SetStateAction<boolean>>;
}

export default function ThemeSwitch(props: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleThemeChange = () => {
    if (props.setClose) {
      props.setClose(false);
    }
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="toggle theme"
      className="mt-8 h-10 w-10 rounded-full text-accent transition-[scale] duration-200 hover:scale-[1.1] md:mr-4 md:mt-0 md:h-6 md:w-6"
      onClick={handleThemeChange}
    >
      {mounted &&
        (theme === "dark" || resolvedTheme === "dark" ? (
          <>
            <svg
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="100%"
              width="100%"
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93M19.07 19.07l-1.414-1.414M12 17a5 5 0 100-10 5 5 0 000 10z"
              ></path>
            </svg>
            <span className="sr-only">toggle theme</span>
          </>
        ) : (
          <svg
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            height="100%"
            width="100%"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            ></path>
          </svg>
        ))}
    </button>
  );
}
