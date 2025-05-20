"use client";

type TimeSlotButtonProps = {
  time: string;
  selected?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
};

export default function TimeSlotButton({
  time,
  selected,
  onClick,
}: TimeSlotButtonProps) {
  return (
    <div className="flex items-center mb-2 space-x-2">
      <button
        onClick={onClick}
        className={`w-32 py-2 rounded border transition
          ${
            selected
              ? "bg-blue-900 text-white border-blue-900"
              : "border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white"
          }`}
      >
        {time}
      </button>
    </div>
  );
}
