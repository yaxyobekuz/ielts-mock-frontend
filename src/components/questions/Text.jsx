import RichTextPreviewer from "../RichTextPreviewer";

const Text = ({
  text,
  rawKey,
  initialNumber,
  className = "",
  allowImage = false,
}) => {
  return (
    <RichTextPreviewer
      allowInput
      text={text}
      rawKey={rawKey}
      className={className}
      allowImage={allowImage}
      initialNumber={initialNumber}
    />
  );
};

export default Text;
