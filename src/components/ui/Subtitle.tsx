export default function Subtitle({ text }: { text: string }) {
  return (
    <h2 className="max-[640px]:text-[24px] text-[38px] font-bold text-white">
      {text}
    </h2>
  );
}
