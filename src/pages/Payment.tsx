
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Calendar, ShieldCheck, BadgeDollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import PaymentForm from "@/components/PaymentForm";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success("Payment successful", {
        description: "Your payment has been processed successfully.",
      });
      setIsProcessing(false);
      navigate("/user-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} className="text-black dark:text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-black dark:text-white">Payment</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Secure checkout</p>
          </div>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24 max-w-xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Mechanic Service Payment
            </h2>
            <BadgeDollarSign className="text-uber-blue" size={24} />
          </div>
          
          <Card className="mb-6 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
              <CardDescription>Service details and cost breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-gray-600 dark:text-gray-400">Emergency Roadside Assistance</span>
                <span className="font-medium">$85.00</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                <span className="font-medium">$15.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-black dark:text-white">Total</span>
                <span className="font-semibold text-black dark:text-white">$100.00</span>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Payment Method
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === "card" 
                    ? "border-uber-blue bg-blue-50 dark:bg-blue-950/30" 
                    : "border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className={`mb-2 ${paymentMethod === "card" ? "text-uber-blue" : "text-gray-500"}`} />
                <span className={paymentMethod === "card" ? "font-medium text-black dark:text-white" : "text-gray-500"}>
                  Credit Card
                </span>
              </div>
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === "paypal" 
                    ? "border-uber-blue bg-blue-50 dark:bg-blue-950/30" 
                    : "border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <svg 
                  className={`h-6 w-6 mb-2 ${paymentMethod === "paypal" ? "text-uber-blue" : "text-gray-500"}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M19.5 8.25H4.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M16.5 14.25h.75a1.5 1.5 0 001.5-1.5v-6.75a1.5 1.5 0 00-1.5-1.5h-13.5a1.5 1.5 0 00-1.5 1.5v6.75a1.5 1.5 0 001.5 1.5h.75" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={paymentMethod === "paypal" ? "font-medium text-black dark:text-white" : "text-gray-500"}>
                  PayPal
                </span>
              </div>
            </div>
          </div>

          {paymentMethod === "card" && <PaymentForm onSubmit={handlePaymentSuccess} isProcessing={isProcessing} />}
          
          {paymentMethod === "paypal" && (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg mb-6">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                You'll be redirected to PayPal to complete your payment
              </p>
              <Button
                variant="uber" 
                size="lg"
                className="w-full"
                onClick={handlePaymentSuccess}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Continue to PayPal"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-center mt-8">
            <ShieldCheck size={18} className="text-green-600 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              All transactions are secure and encrypted
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
