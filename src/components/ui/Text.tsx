export default function Text({ text }: { text: string }) {
  return (
    <p className="max-[640px]:text-[14px] text-[18px] text-[#999999] max-w-308">
      {text}
    </p>
  );
}
