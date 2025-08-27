import RichTextPreviewer from "../RichTextPreviewer";

const Text = ({ text, initialNumber, allowImage = false, className = "" }) => {
  return (
    <RichTextPreviewer
      allowInput
      text={text}
      className={className}
      allowImage={allowImage}
      initialNumber={initialNumber}
    />
  );
};

export default Text;
