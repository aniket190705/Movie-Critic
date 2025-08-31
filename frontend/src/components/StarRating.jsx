import { useState } from "react";

export default function StarRating({ value = 0, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange?.(n)}
        >
          <span className={n <= display ? "text-yellow-500" : "text-gray-400"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
