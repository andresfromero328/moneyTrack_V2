import React, { useActionState, useEffect, useState } from "react";

import { CreateBudget } from "@/lib/types";
import { createBudget } from "@/lib/actions/createBudgetAction";
import { LuOctagonAlert } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { BUDGET_CATEGS } from "@/utils/categories";

const initialState: CreateBudget = {
  success: false,
  message: "",
  budget: null,
};

interface Props {
  userID: string;
  setOpen: (open: boolean) => void;
}

const CreateBudgetForm = ({ userID, setOpen }: Props) => {
  const [mCategory, setMCategory] = useState("");
  const [sCategory, setSCategory] = useState("");
  const [state, formAction] = useActionState<CreateBudget, FormData>(
    createBudget,
    initialState
  );
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const subcategories = mCategory
    ? BUDGET_CATEGS[mCategory as keyof typeof BUDGET_CATEGS]?.text ?? []
    : [];

  return (
    <form
      action={formAction}
      className="grid grid-cols-2 grid-rows-4 gap-2"
      autoComplete="off"
    >
      <input type="hidden" name="userID" value={userID} />
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="budgetName">Name:</label>
        <input
          type="text"
          id="budgetName"
          name="budgetName"
          placeholder="budget name"
          className="w-full"
          required
        />
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="budgetAmount">Amount:</label>
        <input
          type="text"
          id="budgetAmount"
          name="budgetAmount"
          placeholder="$500"
          className="w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mCategory">Main Category:</label>
        <select
          id="mCategory"
          name="mCategory"
          className="w-full"
          required
          onChange={(e) => {
            setMCategory(e.target.value);
            setSCategory("");
          }}
        >
          <option value="">main category</option>
          {Object.values(BUDGET_CATEGS).map((categ) => (
            <option key={categ.key} value={categ.key}>
              {categ.key.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {mCategory && (
        <div className="flex flex-col gap-1">
          <label htmlFor="sCategory">Sub Category:</label>
          <select
            id="sCategory"
            name="sCategory"
            className="w-full"
            required
            value={sCategory}
            onChange={(e) => {
              setSCategory(e.target.value);
            }}
          >
            <option value="">sub category</option>
            {subcategories.map((sub: string) => (
              <option key={sub} value={sub}>
                {sub.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="cCategory">Custom Category:</label>
        <input
          type="text"
          id="cCategory"
          name="cCategory"
          placeholder="custom category"
          className="w-full"
        />
      </div>
      {!state?.success && state.message && (
        <div className="col-span-2 flex items-center gap-2 mx-auto p-2 border-2 border-secondary rounded-md">
          <LuOctagonAlert className="icon text-secondary" />
          <small className="text-secondary">{state?.message}</small>
        </div>
      )}
      <button className="col-span-2 mx-auto button">
        <small>create </small>
      </button>
    </form>
  );
};

export default CreateBudgetForm;
