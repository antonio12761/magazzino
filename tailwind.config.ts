import { withUt } from "uploadthing/tw";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssForms from "@tailwindcss/forms";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate, tailwindcssForms],
  safelist: [
    "text-blue-500",
    "text-red-500",
    "text-green-500",
    "text-orange-500",
    "border-blue-500",
    "border-red-500",
    "border-green-500",
    "border-orange-500",
    "hover:border-blue-500",
    "hover:border-red-500",
    "hover:border-green-500",
    "hover:border-orange-500",
  ],
});
