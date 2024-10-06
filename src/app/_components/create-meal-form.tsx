function getCurrentDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - offset);
  console.log(now.toISOString());
  return now.toISOString().slice(0, 10);
}

export default function CreateMealForm({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return (
    <div className="form-container">
      <form action={updateItemAction} className="form">
        <label className="form-label">
          Description:
          <input type="text" name="mealName" className="form-input" />
        </label>
        <label className="form-label">
          Meal:
          <select
            name="mealType"
            className="form-input"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </label>
        <label className="form-label">
          When:
          <input
            type="date"
            name="mealTime"
            defaultValue={getCurrentDate()}
            className="form-input"
            required
          />
        </label>
        <button type="submit" className="form-button">
          Start adding ingredients
        </button>
      </form>
    </div>
  );
}
