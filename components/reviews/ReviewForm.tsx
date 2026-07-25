"use client";

import { useEffect, useState } from "react";

interface ReviewData {
  review: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  theme: string;
  rating: number;
}

interface ReviewFormProps {
  initialData?: ReviewData;
  onSubmit: (data: ReviewData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}
const THEMES = [
  "Nature",
  "Service",
  "Food",
  "Staff",
  "Cleanliness",
  "Location",
  "Amenities",
  "Value",
  "Experience",
  "Environment",
  "Other",
];

export default function ReviewForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewData>({
    review: "",
    sentiment: "Positive",
    theme: "",
    rating: 5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.review.trim().length < 10) {
      newErrors.review =
        "Review should contain at least 10 characters.";
    }

    if (!formData.theme.trim()) {
      newErrors.theme = "Theme is required.";
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold mb-2">
          Guest Review
        </label>

        <textarea
          rows={5}
          value={formData.review}
          onChange={(e) =>
            setFormData({
              ...formData,
              review: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 dark:bg-gray-900"
        />

        {errors.review && (
          <p className="text-red-500 text-sm mt-1">
            {errors.review}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Sentiment
          </label>

          <select
            value={formData.sentiment}
            onChange={(e) =>
              setFormData({
                ...formData,
                sentiment: e.target.value as
                  | "Positive"
                  | "Neutral"
                  | "Negative",
              })
            }
            className="w-full rounded-lg border p-3 dark:bg-gray-900"
          >
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Theme
          </label>

          <select
  value={formData.theme}
  onChange={(e) =>
    setFormData({
      ...formData,
      theme: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3 dark:bg-gray-900"
>
  <option value="">Select Theme</option>

  {THEMES.map((theme) => (
    <option key={theme} value={theme}>
      {theme}
    </option>
  ))}
</select>

          {errors.theme && (
            <p className="text-red-500 text-sm mt-1">
              {errors.theme}
            </p>
          )}
        </div>

       <div>
  <label className="block text-sm font-semibold mb-2">
    Rating
  </label>

  <div className="flex gap-2 text-3xl">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            rating: star,
          })
        }
        className={`transition ${
          star <= formData.rating
            ? "text-yellow-400"
            : "text-gray-300"
        } hover:scale-110`}
      >
        ★
      </button>
    ))}
  </div>

  <p className="text-sm text-gray-500 mt-2">
    {formData.rating} / 5
  </p>

  {errors.rating && (
    <p className="text-red-500 text-sm mt-1">
      {errors.rating}
    </p>
  )}
</div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Review"}
        </button>
      </div>
    </form>
  );
}