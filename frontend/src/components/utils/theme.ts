import { createTheme } from "flowbite-react";

export const theme = createTheme({
  datepicker: {
    popup: {
      root: {
        inner: "inline-block rounded-2xl bg-white p-4 shadow dark:bg-gray-700",
      },
      footer: {
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-yellow-300",
          today:
            "bg-yellow-700 text-white hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700",
        },
      },
    },
    views: {
      days: {
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-full border-0 text-center text-sm leading-9 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected:
              "rounded-full bg-yellow-700 text-white hover:bg-yellow-600",
          },
        },
      },
    },
  },
});
