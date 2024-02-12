import { Loader2 } from "lucide-react";

/**
 * Renders a loader component with a spinning animation and a message.
 * @returns The loader component.
 */
const Loader = () => {
  return (
    <div className="flex items-center justify-center m-auto text-5xl font-semibold gap-3">
      <Loader2 className="flex justify-center items-center  h-20 w-20 animate-spin " />
      Please wait checking your authorization status
    </div>
  );
};

export default Loader;
