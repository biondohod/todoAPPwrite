import { LoaderProps } from "@/types";
import { Loader2 } from "lucide-react";
import { FC } from "react";

/**
 * Renders a loader component with a spinning animation and a message.
 * @returns The loader component.
 */
const Loader: FC<LoaderProps> = ({message = "Loading... Please wait", loaderHeight = 80, loaderWidth = 80}) => {
  return (
    <div className="flex items-center justify-center m-auto text-5xl font-semibold gap-3">
      <Loader2 
        className="flex justify-center items-center animate-spin"
        style={{ height: `${loaderHeight}px`, width: `${loaderWidth}px` }}
      />
      {message}
    </div>
  );
};

export default Loader;
