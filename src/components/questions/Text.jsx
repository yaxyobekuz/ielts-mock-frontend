import { convertToHtml } from "../../lib/helpers";

const Text = ({ text, initialNumber }) => {
  return (
    <pre
      dangerouslySetInnerHTML={{ __html: convertToHtml(text, initialNumber) }}
      className="flex-1 font-[inherit] overflow-auto prose prose-sm max-w-none"
    />
  );
};

export default Text;
