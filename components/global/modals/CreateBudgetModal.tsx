import React from "react";

import { FaTimes } from "react-icons/fa";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";
import CreateBudgetForm from "@/components/forms/CreateBudgetForm";

interface Props {
  setOpen: (open: boolean) => void;
  userID: string;
}

const CreateBudgetModal = ({ setOpen, userID }: Props) => {
  return (
    <StaggerAnimWrapper
      tag="div"
      style="fixed top-0 left-0 grid place-items-center min-h-screen w-full p-5 z-30 bg-primary/85 backdrop-blur-[2px]"
    >
      <div className="flex flex-col max-w-[450px] gap-2 shadow-sm p-5 bg-primary">
        <button
          aria-label="close-create-budget-modal"
          className="button ml-auto"
          onClick={() => setOpen(false)}
        >
          <FaTimes className="icon" />
        </button>

        <h1>Create Budget</h1>

        <CreateBudgetForm userID={userID} setOpen={setOpen} />
      </div>
    </StaggerAnimWrapper>
  );
};

export default CreateBudgetModal;
