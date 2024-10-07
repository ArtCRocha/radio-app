import { ReactNode } from "react";

export default function Button({
  children,
  isLoading,
  type,
}: {
  children: ReactNode;
  isLoading: boolean;
  type: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type || "button"}
      className="w-full py-3 rounded-md outline-none border-none bg-[#1267fc] flex items-center justify-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent border-t-2 rounded-full animate-spin"></div>
      ) : (
        <p className="text-white">{children}</p>
      )}
    </button>
  );
}
