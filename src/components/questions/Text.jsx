import RichTextPreviewer from "../RichTextPreviewer";

const Text = ({
  text,
  coords,
  rawKey,
  initialNumber,
  className = "",
  allowImage = false,
}) => {
  return (
    <RichTextPreviewer
      allowInput
      text={text}
      coords={coords}
      rawKey={rawKey}
      className={className}
      allowImage={allowImage}
      initialNumber={initialNumber}
    />
  );
};

export default Text;
