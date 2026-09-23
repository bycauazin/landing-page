export default function RevealText({ as: Tag = "h2", id, className, label, lines }) {
  return (
    <Tag id={id} className={className} aria-label={label} data-motion-heading="">
      {lines.map((line, index) => (
        <span className="motion-mask-line" key={index}>
          <span className="motion-mask-inner" data-motion-line="">{line}{index < lines.length - 1 ? " " : ""}</span>
        </span>
      ))}
    </Tag>
  );
}
