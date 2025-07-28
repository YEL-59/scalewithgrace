import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: "radial-gradient(circle at top left, #d4edda, #f5f9f4 70%)",
      }}
    >
      <div className="max-w-xl w-full bg-white shadow-lg rounded-3xl p-12 text-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-green-100 shadow-inner animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="w-16 h-16 text-green-600 drop-shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-green-600">
          Subscription Successful!
        </h1>

        <p className="mb-10 max-w-md mx-auto text-lg text-gray-700 leading-relaxed">
          Thank you for subscribing. You can now explore our products or manage
          your account dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-black font-semibold transition focus:ring-4 focus:ring-green-300"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>

          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-semibold transition hover:bg-green-800 focus:ring-4 focus:ring-green-500"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
