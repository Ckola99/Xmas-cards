import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import snowman from "../assets/pngwing.com.png";

const WelcomePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Save data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));

    // Redirect to the Home page
    navigate("/home");
  };

  return (
    <div className="bg-welcomepage min-h-screen bg-cover bg-center py-3 px-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src={snowman} alt="snowman" className="-mb-[100px]" />
        <h2 className="text-2xl font-bold mb-4 text-center w-full font-coming-soon">Xmas Cards!</h2>

        {/* Full Name Input */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-transparent border border-red rounded-full placeholder-[#000000] focus:none"
          />
          {errors.fullName && <p className="text-red text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Preferred Name Input */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="preferredName"
            {...register("preferredName", { required: "Preferred name is required" })}
            placeholder="Preferred Name"
            className="w-full px-4 py-2 bg-transparent border border-red rounded-full placeholder-[#000000] focus:none"
          />
          {errors.preferredName && <p className="text-red text-sm">{errors.preferredName.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red text-white font-bold px-4 py-2 rounded-full hover:bg-opacity-50 w-full"
        >
          Create Card!
        </button>
      </form>
    </div>
  );
};

export default WelcomePage;
